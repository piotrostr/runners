import { describe, it, beforeAll, expect } from "bun:test";
import { makeDefaultRunnerService, RunnerService } from "./runner";
import { PublicKey } from "@solana/web3.js";

describe("RunnerService", () => {
  let runnerService: RunnerService;

  beforeAll(async () => {
    runnerService = await makeDefaultRunnerService();
  });

  it.skip("can send to tg", async () => {
    await runnerService.sendToTG("test", {
      mint: "test",
      timestamp: "test",
      tradeCount: 1,
      validTradeCount: 1,
      timeToGraduate: 1,
    });
  });

  it.skip("gets account info", async () => {
    const rawMint = await runnerService.getSplData(
      new PublicKey("3S8qX1MsMqRbiwKg2cQyx7nis1oHMgaCuc9c4VfvVdPN"),
    );
    expect(rawMint).not.toBeNull();
    expect(rawMint!.decimals).toEqual(6);
    expect(rawMint!.isInitialized).toEqual(true);
  });

  it("gets top holders", async () => {
    const topHolders = await runnerService.getTopHolders(
      new PublicKey("3S8qX1MsMqRbiwKg2cQyx7nis1oHMgaCuc9c4VfvVdPN"),
      10,
    );
    expect(topHolders).not.toBeNull();
    expect(topHolders.topHolders.length).toEqual(10);
  });
});
