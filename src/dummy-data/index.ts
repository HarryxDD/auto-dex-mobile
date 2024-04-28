import { EPocketTab, EPocketType } from "@/constants/mypocket";

export const MYPOCKETS = {
  [EPocketTab.HISTORY]: [
    {
      id: 1,
      chain: {
        name: "BLOCK/USDC",
        subname: "Blockasset",
        url: "",
        address: "#123413214213",
      },
      strategy: "10 USDC monthly",
      strategyDesc: "10 USDC <= 100,517,06 BLOCK",
      totalInvested: "120 USDC",
      APL: "+ 0.00 USDC (0.00%)",
      avgPrice: "1 USDC = 1000.491 BLOCK",
      status: EPocketType.CLOSED,
    },
    {
      id: 2,
      chain: {
        name: "BLOCK/SOL",
        subname: "Blockasset",
        url: "",
        address: "#123413214213",
      },
      strategy: "10 SOL monthly",
      strategyDesc: "10 USDC <= 100,517,06 BLOCK",
      totalInvested: "120 SOL",
      APL: "+ 0.00 SOL (0.00%)",
      avgPrice: "1 SOL = 1000.491 BLOCK",
      status: EPocketType.ENDED,
    },
  ],
  [EPocketTab.RUNNING]: [
    {
      id: 3,
      chain: {
        name: "BLOCK/USDC",
        subname: "Blockasset",
        url: "",
        address: "#123413214213",
      },
      strategy: "10 USDC monthly",
      strategyDesc: "10 USDC <= 100,517,06 BLOCK",
      totalInvested: "120 USDC",
      APL: "+ 0.00 USDC (0.00%)",
      avgPrice: "1 USDC = 1000.491 BLOCK",
      status: EPocketType.ON_GOING,
    },
  ],
};

export const HISTORY_DATA = [
  {
    id: 1,
    date: "2022-09-02 10:00 (UTC +7)",
    hash: "#199499",
    pair: "BNB/BLOCK",
    type: "Create",
  },
  {
    id: 2,
    date: "2022-09-02 10:00 (UTC +7)",
    hash: "#199499",
    pair: "BNB/BLOCK",
    type: "Create",
    amount: "100.32 BNB",
  },
  {
    id: 3,
    date: "2022-09-02 10:00 (UTC +7)",
    hash: "#199499",
    pair: "BNB/BLOCK",
    type: "Create",
    amount: "100.32 BNB",
    tokenAmount: "3,293,482.00 BLOCK",
  },
  {
    id: 4,
    date: "2022-09-02 10:00 (UTC +7)",
    hash: "#199499",
    pair: "BNB/BLOCK",
    type: "Create",
    amount: "100.32 BNB",
    tokenAmount: "3,293,482.00 BLOCK",
  },
];
