import type { EnrichedTransaction } from "helius-sdk";
import type { RunnerService, CheckRunnerResponse } from "./runner";
import { Parser } from "./parser";

export const serveService = (runnerService: RunnerService) => {
  Bun.serve({
    port: 3420,
    async fetch(req) {
      console.debug("got request", req.url);
      const url = new URL(req.url);

      if (url.pathname === "/webhook") {
        const webhookData: Array<EnrichedTransaction> = await req.json();
        await runnerService.saveWebhook(webhookData);
        for (const data of webhookData) {
          const mint = new Parser(data).mint();
          await runnerService.checkRunner(mint);
        }
        return new Response("OK");
      }

      if (url.pathname === "/check-runner" && req.method === "GET") {
        try {
          const mintAddress = url.searchParams.get("mint");

          if (!mintAddress) {
            return new Response("Missing mint parameter", { status: 400 });
          }

          const response: CheckRunnerResponse =
            await runnerService.checkRunner(mintAddress);

          return new Response(JSON.stringify(response), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Error processing request:", error);
          return new Response("Internal Server Error", { status: 500 });
        }
      }

      if (url.pathname === "/" && req.method === "GET") {
        return new Response(JSON.stringify(await runnerService.showAll()), {
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  console.log("Server running on http://localhost:3420");
};
