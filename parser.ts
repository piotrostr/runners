import type { EnrichedTransaction, TokenTransfer } from "helius-sdk";

export const WRAPPED_SOL_ID = "So11111111111111111111111111111111111111112";

export class Parser {
  constructor(private readonly webhook: EnrichedTransaction) {}

  parseTokenTransfers(): [TokenTransfer, TokenTransfer] {
    if (!this.webhook.tokenTransfers) {
      console.error(
        "invalid tokenTransfers array",
        this.webhook.tokenTransfers,
      );
    }
    // filter just the tx's that add liquidity
    const filtered = this.webhook.tokenTransfers!.filter(
      (transfer) =>
        transfer.fromTokenAccount &&
        transfer.toTokenAccount &&
        transfer.fromUserAccount &&
        transfer.toUserAccount,
    );

    if (filtered.length !== 2) {
      console.error("invalid tokenTransfers array", filtered);
    }

    if (filtered[0].mint == WRAPPED_SOL_ID) {
      return [filtered[1], filtered[0]];
    }
    return [filtered[0], filtered[1]];
  }

  mint() {
    return this.parseTokenTransfers()[0].mint;
  }
}
