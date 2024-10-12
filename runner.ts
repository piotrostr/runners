import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import {
  Connection,
  PublicKey,
  type ConfirmedSignatureInfo,
} from "@solana/web3.js";
import Redis from "ioredis";

export interface CheckRunnerResponse {
  mint: string;
  tradeCount: number;
  validTradeCount: number;
  timeToGraduate: number;
}

export class RunnerService {
  constructor(
    private readonly cache: Redis,
    private readonly connection: Connection,
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
    console.debug("fetching trades from RPC");
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
    }
    console.debug("saving result", mint.toString());
    await this.cache.set(key, JSON.stringify(result));
  }

  async checkRunner(mintAddress: string): Promise<CheckRunnerResponse> {
    const mint = new PublicKey(mintAddress);
    const trades = await this.fetchPumpTrades(mint);

    const validTrades = trades.filter(
      (trade) => trade.err === null && trade.blockTime,
    );

    const timestamps = validTrades.map((trade) => trade.blockTime!);

    const timeToGraduate = Math.max(...timestamps) - Math.min(...timestamps);
    const result = {
      mint: mintAddress,
      tradeCount: validTrades.length,
      validTradeCount: validTrades.length,
      timeToGraduate,
    };

    this.saveResult(mint, result);

    return result;
  }
}
