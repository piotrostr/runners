import { Parser } from "./parser";
import { describe, expect, it } from "bun:test";
import type { EnrichedTransaction } from "helius-sdk";

describe("Parser", () => {
  it("should parse the mint", () => {
    for (const webhook of sampleWebhookData) {
      const mint = new Parser(webhook).mint();
      expect(mint).toEqual("743govJSH46MHTHdqbeKXVjEorooxBZAfnpaZLuVpump");
    }
  });
});

const sampleWebhookData: Array<EnrichedTransaction> = [
  {
    accountData: [
      {
        account: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        nativeBalanceChange: -79470687055,
        tokenBalanceChanges: [],
      },
      {
        account: "B2W3zzkTVeAtC3CnrrRwYJQoYQnryAJChaRqquL1uA6b",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: "wkCS5iJiU3LbyuAkGB52k121uijh8WwpTZNRvXUEBuZ",
        nativeBalanceChange: 6124800,
        tokenBalanceChanges: [],
      },
      {
        account: "3iMezjnHJWYJ6idgvZbTiS4JnPpciVZC1i4hD731e7sf",
        nativeBalanceChange: 23357760,
        tokenBalanceChanges: [],
      },
      {
        account: "GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd",
        nativeBalanceChange: 1461600,
        tokenBalanceChanges: [],
      },
      {
        account: "6j2rxb2d6gfEoHavf6AawDbRktX8Zbiz6iNabxGYuFw3",
        nativeBalanceChange: 79007400775,
        tokenBalanceChanges: [
          {
            mint: "So11111111111111111111111111111111111111112",
            rawTokenAmount: {
              decimals: 9,
              tokenAmount: "79005361495",
            },
            tokenAccount: "6j2rxb2d6gfEoHavf6AawDbRktX8Zbiz6iNabxGYuFw3",
            userAccount: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
          },
        ],
      },
      {
        account: "4oHNCoE9XmCQTFJ2Sre1xxnGoXHRyTQhH5eHgK7BC66L",
        nativeBalanceChange: 2039280,
        tokenBalanceChanges: [
          {
            mint: "743govJSH46MHTHdqbeKXVjEorooxBZAfnpaZLuVpump",
            rawTokenAmount: {
              decimals: 6,
              tokenAmount: "206900000000000",
            },
            tokenAccount: "4oHNCoE9XmCQTFJ2Sre1xxnGoXHRyTQhH5eHgK7BC66L",
            userAccount: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
          },
        ],
      },
      {
        account: "9mQizADDhYVqbmGwTFFwx7s4UZcyupG74tHgWijYY2kN",
        nativeBalanceChange: 16258560,
        tokenBalanceChanges: [],
      },
      {
        account: "7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5",
        nativeBalanceChange: 400000000,
        tokenBalanceChanges: [
          {
            mint: "So11111111111111111111111111111111111111112",
            rawTokenAmount: {
              decimals: 9,
              tokenAmount: "400000000",
            },
            tokenAccount: "7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5",
            userAccount: "GThUX1Atko4tqhN2NaiTazWSeFWMuiUvfFnyJyUghFMJ",
          },
        ],
      },
      {
        account: "9kCDeeKSYeYYMYMtKX4YUV7i3Vzq65s3ZgdZQcryvDk2",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [
          {
            mint: "743govJSH46MHTHdqbeKXVjEorooxBZAfnpaZLuVpump",
            rawTokenAmount: {
              decimals: 6,
              tokenAmount: "-206900000000000",
            },
            tokenAccount: "9kCDeeKSYeYYMYMtKX4YUV7i3Vzq65s3ZgdZQcryvDk2",
            userAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
          },
        ],
      },
      {
        account: "6rmXB7qTRuzoRvvR8T7SN2QHyvXwAy9Yy23w4M6nvVC",
        nativeBalanceChange: 2039280,
        tokenBalanceChanges: [
          {
            mint: "GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd",
            rawTokenAmount: {
              decimals: 9,
              tokenAmount: "4042044557423",
            },
            tokenAccount: "6rmXB7qTRuzoRvvR8T7SN2QHyvXwAy9Yy23w4M6nvVC",
            userAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
          },
        ],
      },
      {
        account: "ComputeBudget111111111111111111111111111111",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: "11111111111111111111111111111111",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: "So11111111111111111111111111111111111111112",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: "SysvarRent111111111111111111111111111111111",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: "743govJSH46MHTHdqbeKXVjEorooxBZAfnpaZLuVpump",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: "9DCxsMizn3H1hprZ7xWe6LDzeUeZBksYFpBWBtSf1PQX",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
      {
        account: "CqAppquNnwVhgL85Hgd15issKrq5YuALRHWcj7fNT9NY",
        nativeBalanceChange: 0,
        tokenBalanceChanges: [],
      },
    ],
    description: "",
    events: {},
    fee: 12005000,
    feePayer: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
    instructions: [
      {
        accounts: [],
        data: "3mimF1vf45io",
        innerInstructions: [],
        programId: "ComputeBudget111111111111111111111111111111",
      },
      {
        accounts: [
          "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
          "B2W3zzkTVeAtC3CnrrRwYJQoYQnryAJChaRqquL1uA6b",
        ],
        data: "3ipZWcvdfi4ZMA2h6UPodC5qTfD9CpLKxRF23SBNGvo9LygWEGQyStb2TpFfoZa3LXzMgpUtL2VbTBfYjMidmpWefQYT8GW3tmZdXhVJEGygyp8X8kZ1hNzFW8x6M3vFHypSYC5MumX4i9pEib3TMpunF5c7i19n3yuwQw99S",
        innerInstructions: [],
        programId: "11111111111111111111111111111111",
      },
      {
        accounts: [
          "B2W3zzkTVeAtC3CnrrRwYJQoYQnryAJChaRqquL1uA6b",
          "So11111111111111111111111111111111111111112",
          "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
          "SysvarRent111111111111111111111111111111111",
        ],
        data: "2",
        innerInstructions: [],
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      },
      {
        accounts: [
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          "11111111111111111111111111111111",
          "SysvarRent111111111111111111111111111111111",
          "wkCS5iJiU3LbyuAkGB52k121uijh8WwpTZNRvXUEBuZ",
          "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
          "3iMezjnHJWYJ6idgvZbTiS4JnPpciVZC1i4hD731e7sf",
          "GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd",
          "So11111111111111111111111111111111111111112",
          "743govJSH46MHTHdqbeKXVjEorooxBZAfnpaZLuVpump",
          "6j2rxb2d6gfEoHavf6AawDbRktX8Zbiz6iNabxGYuFw3",
          "4oHNCoE9XmCQTFJ2Sre1xxnGoXHRyTQhH5eHgK7BC66L",
          "9mQizADDhYVqbmGwTFFwx7s4UZcyupG74tHgWijYY2kN",
          "9DCxsMizn3H1hprZ7xWe6LDzeUeZBksYFpBWBtSf1PQX",
          "7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5",
          "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX",
          "CqAppquNnwVhgL85Hgd15issKrq5YuALRHWcj7fNT9NY",
          "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
          "B2W3zzkTVeAtC3CnrrRwYJQoYQnryAJChaRqquL1uA6b",
          "9kCDeeKSYeYYMYMtKX4YUV7i3Vzq65s3ZgdZQcryvDk2",
          "6rmXB7qTRuzoRvvR8T7SN2QHyvXwAy9Yy23w4M6nvVC",
        ],
        data: "4YDNdAP1w71Kr64LB1QzGwm6xaNG9S2m52f",
        innerInstructions: [
          {
            accounts: [
              "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
              "7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5",
            ],
            data: "3Bxs3zwhE1jnACsh",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5"],
            data: "J",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
              "9mQizADDhYVqbmGwTFFwx7s4UZcyupG74tHgWijYY2kN",
            ],
            data: "3Bxs3zsXjYXEcY9D",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["9mQizADDhYVqbmGwTFFwx7s4UZcyupG74tHgWijYY2kN"],
            data: "9krTDTC9CyNDTCP9",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["9mQizADDhYVqbmGwTFFwx7s4UZcyupG74tHgWijYY2kN"],
            data: "SYXsG5gxn13RGVJBuJ66WMvnpkuC3ZXmxCAkmzi1nLhi459e",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: [
              "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
              "GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd",
            ],
            data: "3Bxs4GxuFmUxu9wu",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd"],
            data: "9krTDE99A3SWNSHd",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd"],
            data: "SYXsBSQy3GeifSEQSGvTbrPNposbSAiSoh1YA85wcvGKSnYg",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: [
              "GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd",
              "SysvarRent111111111111111111111111111111111",
            ],
            data: "1D8qpeSmcAZXbhY6jAPqguwXxxrrFAnmcbUaH5dxdLLS3Ub",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
              "6j2rxb2d6gfEoHavf6AawDbRktX8Zbiz6iNabxGYuFw3",
            ],
            data: "3Bxs4h24hBtQy9rw",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["6j2rxb2d6gfEoHavf6AawDbRktX8Zbiz6iNabxGYuFw3"],
            data: "9krTDU2LzCSUJuVZ",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["6j2rxb2d6gfEoHavf6AawDbRktX8Zbiz6iNabxGYuFw3"],
            data: "SYXsBSQy3GeifSEQSGvTbrPNposbSAiSoh1YA85wcvGKSnYg",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: [
              "6j2rxb2d6gfEoHavf6AawDbRktX8Zbiz6iNabxGYuFw3",
              "So11111111111111111111111111111111111111112",
              "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
              "SysvarRent111111111111111111111111111111111",
            ],
            data: "2",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
              "4oHNCoE9XmCQTFJ2Sre1xxnGoXHRyTQhH5eHgK7BC66L",
            ],
            data: "3Bxs4h24hBtQy9rw",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["4oHNCoE9XmCQTFJ2Sre1xxnGoXHRyTQhH5eHgK7BC66L"],
            data: "9krTDU2LzCSUJuVZ",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["4oHNCoE9XmCQTFJ2Sre1xxnGoXHRyTQhH5eHgK7BC66L"],
            data: "SYXsBSQy3GeifSEQSGvTbrPNposbSAiSoh1YA85wcvGKSnYg",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: [
              "4oHNCoE9XmCQTFJ2Sre1xxnGoXHRyTQhH5eHgK7BC66L",
              "743govJSH46MHTHdqbeKXVjEorooxBZAfnpaZLuVpump",
              "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
              "SysvarRent111111111111111111111111111111111",
            ],
            data: "2",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
              "wkCS5iJiU3LbyuAkGB52k121uijh8WwpTZNRvXUEBuZ",
            ],
            data: "3Bxs3zw7D1St6MtB",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["wkCS5iJiU3LbyuAkGB52k121uijh8WwpTZNRvXUEBuZ"],
            data: "9krTDga1qCiqxLs9",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["wkCS5iJiU3LbyuAkGB52k121uijh8WwpTZNRvXUEBuZ"],
            data: "SYXsG5gxn13RGVJBuJ66WMvnpkuC3ZXmxCAkmzi1nLhi459e",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: [
              "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
              "3iMezjnHJWYJ6idgvZbTiS4JnPpciVZC1i4hD731e7sf",
            ],
            data: "3Bxs4BdXwcxHpZ19",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["3iMezjnHJWYJ6idgvZbTiS4JnPpciVZC1i4hD731e7sf"],
            data: "9krTDSXVJqcrnRvf",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["3iMezjnHJWYJ6idgvZbTiS4JnPpciVZC1i4hD731e7sf"],
            data: "SYXsBrTzDsq3kLD1BhH4w6jQTUs6sbwfa7yN5CyH8syhMbj3",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: [
              "3iMezjnHJWYJ6idgvZbTiS4JnPpciVZC1i4hD731e7sf",
              "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
              "CqAppquNnwVhgL85Hgd15issKrq5YuALRHWcj7fNT9NY",
              "SysvarRent111111111111111111111111111111111",
            ],
            data: "1PEpEB",
            programId: "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX",
          },
          {
            accounts: [
              "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
              "6rmXB7qTRuzoRvvR8T7SN2QHyvXwAy9Yy23w4M6nvVC",
              "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
              "GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd",
              "11111111111111111111111111111111",
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            ],
            data: "1",
            programId: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          },
          {
            accounts: ["GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd"],
            data: "84eT",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
              "6rmXB7qTRuzoRvvR8T7SN2QHyvXwAy9Yy23w4M6nvVC",
            ],
            data: "11119os1e9qSs2u7TsThXqkBSRVFxhmYaFKFZ1waB2X7armDmvK3p5GmLdUxYdg3h7QSrL",
            programId: "11111111111111111111111111111111",
          },
          {
            accounts: ["6rmXB7qTRuzoRvvR8T7SN2QHyvXwAy9Yy23w4M6nvVC"],
            data: "P",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "6rmXB7qTRuzoRvvR8T7SN2QHyvXwAy9Yy23w4M6nvVC",
              "GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd",
            ],
            data: "6PHHfQjnJgqKKZAQikCgYBTNzKN1Sc2hfSRffSEmYmTAe",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "B2W3zzkTVeAtC3CnrrRwYJQoYQnryAJChaRqquL1uA6b",
              "6j2rxb2d6gfEoHavf6AawDbRktX8Zbiz6iNabxGYuFw3",
              "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
            ],
            data: "3U2ydqC4NEX9",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "9kCDeeKSYeYYMYMtKX4YUV7i3Vzq65s3ZgdZQcryvDk2",
              "4oHNCoE9XmCQTFJ2Sre1xxnGoXHRyTQhH5eHgK7BC66L",
              "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
            ],
            data: "3DTsCMsuehGs",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            accounts: [
              "GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd",
              "6rmXB7qTRuzoRvvR8T7SN2QHyvXwAy9Yy23w4M6nvVC",
              "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
            ],
            data: "6VMEhK6RyRMy",
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
        ],
        programId: "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8",
      },
      {
        accounts: [
          "B2W3zzkTVeAtC3CnrrRwYJQoYQnryAJChaRqquL1uA6b",
          "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
          "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        ],
        data: "A",
        innerInstructions: [],
        programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      },
    ],
    nativeTransfers: [
      {
        amount: 400000000,
        fromUserAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        toUserAccount: "7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5",
      },
      {
        amount: 16258560,
        fromUserAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        toUserAccount: "9mQizADDhYVqbmGwTFFwx7s4UZcyupG74tHgWijYY2kN",
      },
      {
        amount: 1461600,
        fromUserAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        toUserAccount: "GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd",
      },
      {
        amount: 2039280,
        fromUserAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        toUserAccount: "6j2rxb2d6gfEoHavf6AawDbRktX8Zbiz6iNabxGYuFw3",
      },
      {
        amount: 2039280,
        fromUserAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        toUserAccount: "4oHNCoE9XmCQTFJ2Sre1xxnGoXHRyTQhH5eHgK7BC66L",
      },
      {
        amount: 6124800,
        fromUserAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        toUserAccount: "wkCS5iJiU3LbyuAkGB52k121uijh8WwpTZNRvXUEBuZ",
      },
      {
        amount: 23357760,
        fromUserAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        toUserAccount: "3iMezjnHJWYJ6idgvZbTiS4JnPpciVZC1i4hD731e7sf",
      },
      {
        amount: 2039280,
        fromUserAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        toUserAccount: "6rmXB7qTRuzoRvvR8T7SN2QHyvXwAy9Yy23w4M6nvVC",
      },
    ],
    signature:
      "QfQF5DrMyeGFF6Tso77YLFjbYPrXq1BnsRbHMfuMaAtcBD2pwkNGXrHiVXUgACy7a3NCk2aV9KjMZxw6QVZjgAs",
    slot: 295204557,
    source: "RAYDIUM",
    timestamp: 1728742003,
    tokenTransfers: [
      {
        fromTokenAccount: "B2W3zzkTVeAtC3CnrrRwYJQoYQnryAJChaRqquL1uA6b",
        fromUserAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        mint: "So11111111111111111111111111111111111111112",
        toTokenAccount: "6j2rxb2d6gfEoHavf6AawDbRktX8Zbiz6iNabxGYuFw3",
        toUserAccount: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
        tokenAmount: 79.005361495,
        tokenStandard: "Fungible",
      },
      {
        fromTokenAccount: "9kCDeeKSYeYYMYMtKX4YUV7i3Vzq65s3ZgdZQcryvDk2",
        fromUserAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        mint: "743govJSH46MHTHdqbeKXVjEorooxBZAfnpaZLuVpump",
        toTokenAccount: "4oHNCoE9XmCQTFJ2Sre1xxnGoXHRyTQhH5eHgK7BC66L",
        toUserAccount: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
        tokenAmount: 206900000,
        tokenStandard: "Fungible",
      },
      {
        fromTokenAccount: "",
        fromUserAccount: "",
        mint: "GsvSBmhLvi7MTDjwQwZWBSTjev9C56oLJHKT32ThkLGd",
        toTokenAccount: "6rmXB7qTRuzoRvvR8T7SN2QHyvXwAy9Yy23w4M6nvVC",
        toUserAccount: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",
        tokenAmount: 4042.044557423,
        tokenStandard: "UnknownStandard",
      },
    ],
    transactionError: null,
    type: "CREATE_POOL",
  },
];
