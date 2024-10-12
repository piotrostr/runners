import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import {
  Connection,
  PublicKey,
  type ConfirmedSignatureInfo,
} from "@solana/web3.js";
import type { EnrichedTransaction } from "helius-sdk";
import Redis from "ioredis";
import TelegramBot from "node-telegram-bot-api";

export interface CheckRunnerResponse {
  mint: string;
  timestamp?: string;
  tradeCount: number;
  validTradeCount: number;
  timeToGraduate: number | null;
}

export class RunnerService {
  constructor(
    private readonly cache: Redis,
    private readonly connection: Connection,
    private readonly tg: TelegramBot,
  ) {}

  private formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (remainingSeconds > 0 || parts.length === 0)
      parts.push(`${remainingSeconds}s`);

    return parts.join(" ");
  }

  async addChatId(chatId: number) {
    await this.cache.sadd("telegram:chat_ids", chatId.toString());
  }

  async removeChatId(chatId: number) {
    await this.cache.srem("telegram:chat_ids", chatId.toString());
  }

  async initBot() {
    this.tg.on("message", async (msg) => {
      const chatId = msg.chat.id;

      if (msg.text) {
        const command = msg.text.toLowerCase();

        if (command === "/start" || command === "/subscribe") {
          await this.addChatId(chatId);
          this.tg.sendMessage(chatId, "thanks for sub, gonna send here:3");
        } else if (command === "/stop" || command === "/unsubscribe") {
          await this.removeChatId(chatId);
          this.tg.sendMessage(chatId, "bye .. :c");
        } else {
          this.tg.sendMessage(
            chatId,
            "/subscribe (/start) or /unsubscribe only",
          );
        }
      }
    });

    this.tg.on("polling_error", (error) => {
      console.error("Telegram polling error:", error);
    });

    this.tg.startPolling();
  }

  PUMP_FUN_PROGRAM = "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P";

  async saveWebhook(data: Array<EnrichedTransaction>) {
    await this.cache.rpush(`webhook:${new Date()}`, JSON.stringify(data));
  }

  getBcAndAbc(mint: PublicKey): [PublicKey, PublicKey] {
    const [bondingCurve] = PublicKey.findProgramAddressSync(
      [Buffer.from("bonding-curve"), mint.toBuffer()],
      new PublicKey(this.PUMP_FUN_PROGRAM),
    );

    // Derive the associated bonding curve address
    const associatedBondingCurve = getAssociatedTokenAddressSync(
      bondingCurve,
      mint,
    );

    return [bondingCurve, associatedBondingCurve];
  }

  // NOTE: this will require a cursor and limit later
  async showAll(): Promise<Array<CheckRunnerResponse>> {
    const showAllResponse: Array<CheckRunnerResponse> = [];
    try {
      // Get all keys matching the pattern
      const keys = await this.cache.keys("runner:result:*");

      // Fetch values for all keys
      const values = await this.cache.mget(...keys);

      // Process the results
      for (let i = 0; i < keys.length; i++) {
        const checkRes = values[i];
        if (!checkRes) {
          console.error(`Null result for key: ${keys[i]}`);
          continue;
        }
        try {
          const parsed: CheckRunnerResponse = JSON.parse(checkRes);
          if (parsed.timeToGraduate === null) {
            continue;
          }
          showAllResponse.push(parsed);
        } catch (error) {
          console.error(`Error parsing result for key ${keys[i]}:`, error);
        }
      }
    } catch (error) {
      console.error("Error fetching runner results:", error);
    }
    return showAllResponse.sort(
      (a, b) => a.timeToGraduate! - b.timeToGraduate!,
    );
  }

  async fetchPumpTrades(mint: PublicKey) {
    const [bc, _] = this.getBcAndAbc(mint);
    const key = `runner:pump_sigs:${bc}`;
    const cached =
      await this.tryGetFromCache<Array<ConfirmedSignatureInfo>>(key);
    if (cached && cached.length) {
      return cached;
    }
    const fresh = await this.fetchPumpTradesFromRPC(bc);
    if (fresh) {
      await this.cache.set(key, JSON.stringify(fresh));
      return fresh;
    }
    return [];
  }

  private async fetchPumpTradesFromRPC(address: PublicKey) {
    console.debug("fetching trades from RPC for ", address.toString());
    const sigs = await this.connection.getSignaturesForAddress(address);
    return sigs;
  }

  private async tryGetFromCache<T>(key: string) {
    if (!(await this.cache.exists(key))) {
      console.debug("cache miss", key);
      return null;
    }
    console.debug("cache hit", key);
    return JSON.parse((await this.cache.get(key))!) as T;
  }

  async saveResult(mint: PublicKey, result: CheckRunnerResponse) {
    const key = `runner:result:${mint}`;
    if (await this.cache.exists(key)) {
      console.debug("result already saved", mint.toString());
      return;
    }
    console.debug("saving result:", result);
    await this.cache.set(key, JSON.stringify(result));
  }

  async checkRunner(mintAddress: string): Promise<CheckRunnerResponse> {
    const mint = new PublicKey(mintAddress);
    const trades = await this.fetchPumpTrades(mint);

    const validTrades = trades.filter(
      (trade) => trade.err === null && trade.blockTime,
    );

    const timestamps = validTrades.map((trade) => trade.blockTime!);
    let timeToGraduate;
    if (timestamps.length === 0) {
      timeToGraduate = null;
    } else {
      timeToGraduate = Math.max(...timestamps) - Math.min(...timestamps);
    }

    const result = {
      mint: mintAddress,
      timestamp: new Date().toISOString(),
      tradeCount: validTrades.length,
      validTradeCount: validTrades.length,
      timeToGraduate,
    };

    await this.saveResult(mint, result);

    if (timeToGraduate !== null) {
      await this.sendToTG(mintAddress, result);
    }

    return result;
  }

  async sendToTG(mintAddress: string, result: CheckRunnerResponse) {
    // Add separator and heading
    const message = `
🏃‍♂️ <b>RUNNER ALERT</b> 🏃‍♂️
━━━━━━━━━━━━━━━━━━━━━━

🪙 <b>Token</b>: ${result.mint}
🕒 <b>Timestamp</b>: ${result.timestamp}
📊 <b>Trade Count</b>: ${result.tradeCount}
✅ <b>Valid Trade Count</b>: ${result.validTradeCount}
🎓 <b>Time to Graduate</b>: ${result.timeToGraduate !== null ? this.formatDuration(result.timeToGraduate) : "N/A"}

<code>${mintAddress}</code>

🔗 <b>Links</b>:
• <a href="https://solscan.io/address/${mintAddress}">Solana Explorer</a>
• <a href="https://gmgn.ai/sol/token/${mintAddress}">GMGN</a>
• <a href="https://bullx.io/terminal?chainId=1399811149&address=${mintAddress}">BULLX</a>

━━━━━━━━━━━━━━━━━━━━━━
  `;

    try {
      const chatIds = await this.cache.smembers("telegram:chat_ids");
      for (const chatId of chatIds) {
        await this.tg.sendMessage(chatId, message, { parse_mode: "HTML" });
      }
      console.debug(
        `Sent Telegram message for mint ${mintAddress} to ${chatIds.length} chats`,
      );
    } catch (error) {
      console.error(
        `Error sending Telegram message for mint ${mintAddress}:`,
        error,
      );
    }
  }
}

export const makeDefaultRunnerService = async () => {
  if (!process.env.RPC_URL) {
    throw new Error("RPC_URL env variable is required");
  }
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN env variable is required");
  }
  const cache = new Redis({
    port: 6379,
    host: process.env.REDIS_HOST || "localhost",
    lazyConnect: true,
  });

  await cache.connect((err) => {
    if (err) {
      console.error("Failed to connect to Redis:", err);
      process.exit(1);
    }
  });

  const connection = new Connection(process.env.RPC_URL!);
  const tg = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
    polling: false,
  });
  const runnerService = new RunnerService(cache, connection, tg);
  await runnerService.initBot();
  return runnerService;
};
