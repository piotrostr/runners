import { Connection } from "@solana/web3.js";
import { RunnerService } from "./runner";
import Redis from "ioredis";
import { Command } from "commander";
import { serveService } from "./server";

const program = new Command();

program
  .version("1.0.0")
  .description("runner-service")
  .option("-m, --mint <address>", "Mint address")
  .action(async (options) => {
    if (!process.env.RPC_URL) {
      throw new Error("RPC_URL env variable is required");
    }

    const runnerService = new RunnerService(
      new Redis(),
      new Connection(process.env.RPC_URL!),
    );

    if (options.mint) {
      console.info("checking runner stats for mint:", options.mint);
      await runnerService.checkRunner(options.mint);
      return;
    } else {
      console.info("running server");
      serveService(runnerService);
    }
  });

await program.parseAsync(process.argv);
