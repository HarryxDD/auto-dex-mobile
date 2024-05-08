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

export const PROFILE_PIE_CHART = [
  {
    value: 47,
    color: "#009FFF",
    gradientCenterColor: "#006DFF",
    focused: true,
  },
  { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
  { value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
  { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
];

export const PROFILE_LINE_CHART = [
  { value: 15 },
  { value: 30 },
  { value: 26 },
  { value: 40 },
];
