import { describe, it, beforeAll } from "bun:test";
import { makeDefaultRunnerService, RunnerService } from "./runner";

describe("RunnerService", () => {
  let runnerService: RunnerService;

  beforeAll(async () => {
    runnerService = await makeDefaultRunnerService();
  });

  it("can send to tg", async () => {
    runnerService.sendToTG("test", {
      mint: "test",
      timestamp: "test",
      tradeCount: 1,
      validTradeCount: 1,
      timeToGraduate: 1,
    });
  });
});
