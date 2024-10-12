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

    const runnerService = new RunnerService(
      cache,
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
