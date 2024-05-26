import { EStrategyFrequency } from "@/constants/strategy";

export interface SingleTokenParams {
  firstPairItem: string;
  secondPairItem: string;
  amountEachBatch: number;
  frequency: EStrategyFrequency;
  firstBatchDate: Date;
  firstBatchTime: Date;
  byAtMarketCondition: string | null;
  endDate: Date | null;
  endTime: Date | null;
  targetTokenAmount: number | null;
  targetSOLAmount: number | null;
  targetBatchesPurchased: number | null;
  takeProfit: number | null;
  stopLoss: number | null;
  depositAmount: number;
}
