import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import {
  Connection,
  PublicKey,
  type ConfirmedSignatureInfo,
} from "@solana/web3.js";
import Redis from "ioredis";

class Runner {
  constructor(
    private readonly cache: Redis,
    private readonly connection: Connection,
    private readonly mint: PublicKey,
    private readonly fromCache: boolean = true,
  ) {}

  PUMP_FUN_PROGRAM = "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P";

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

  async fetchPumpTrades() {
    const [bc, _] = this.getBcAndAbc(this.mint);
    const key = `pump_trades:${bc}`;
    if (this.fromCache) {
      const cached =
        await this.tryGetFromCache<Array<ConfirmedSignatureInfo>>(key);
      if (cached && cached.length) {
        return cached.filter((item) => item.err === null);
      }
    }
    const fresh = await this.fetchPumpTradesFromRPC(bc);
    if (fresh) {
      await this.cache.set(key, JSON.stringify(fresh));
      return fresh.filter((item) => item.err === null);
    }
    return [];
  }

  private async fetchPumpTradesFromRPC(address: PublicKey) {
    console.info("fetching trades from RPC");
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
}

const main = async () => {
  if (!process.env.RPC_URL) {
    throw new Error("RPC_URL env variable is required");
  }
  const mint = "8iWsK2WH3AGviQwAnt43zvc8yLy6QMUSuv8PK2A7pump";
  const runner = new Runner(
    new Redis(),
    new Connection(process.env.RPC_URL),
    new PublicKey(mint),
  );
  const trades = await runner.fetchPumpTrades();

  console.info(`fetched ${trades.length} trades for ${mint}`);

  // find the time range it took for the token to graduate
  const timestamps = trades
    .filter((trade) => trade.err === null)
    .filter((trade) => trade.blockTime)
    .map((trade) => trade.blockTime!);

  console.info(`of these, ${timestamps.length} have block time and no errors`);

  const max = Math.max(...timestamps);
  const min = Math.min(...timestamps);

  console.info(`token graduated in ${max - min} seconds`);

  // console.info(trades);

  process.exit(0);
};

await main();
