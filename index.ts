import { makeDefaultRunnerService, RunnerService } from "./runner";
import { Command } from "commander";
import { serveService } from "./server";

const program = new Command();

program
  .version("1.0.0")
  .description("runner-service")
  .option("-m, --mint <address>", "Mint address")
  .action(async (options) => {
    // this spawns all services and requires like all env vars
    const runnerService = await makeDefaultRunnerService();
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
