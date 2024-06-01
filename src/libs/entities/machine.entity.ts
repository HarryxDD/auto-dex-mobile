/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
import { DurationObjectUnits } from "luxon";
import { JsonRpcSigner } from "ethers";
import { Params } from "@/libs/providers/evm-program/contracts/MachineChef";
import "reflect-metadata";
import { SingleTokenParams } from "@/types/strategy";
import { UtilsProvider } from "@/utils/utils.provider";
import { convertDurationsTimeToHours } from "@/utils";
import { platformConfig } from "./platform-config.entity";

export enum MachineStatus {
  CREATED = "POOL_STATUS::CREATED",
  ACTIVE = "POOL_STATUS::ACTIVE",
  PAUSED = "POOL_STATUS::PAUSED",
  CLOSED = "POOL_STATUS::CLOSED",
  ENDED = "POOL_STATUS::ENDED",
}

export enum PriceConditionType {
  GT = "gt",
  GTE = "gte",
  LT = "lt",
  LTE = "lte",
  /** Equal */
  EQ = "eq",
  /** Not Equal */
  NEQ = "neq",
  /** Between */
  BW = "bw",
  /** Not Between */
  NBW = "nbw",
}

export enum FrequencyConditionType {
  /** Daily */
  HOURLY = "Hourly",
  /** Daily */
  DAILY = "Daily",
  /** Weekly */
  WEEKLY = "Weekly",
  /** Every 2 Weeks */
  E2W = "Every 2 Weeks",
  /** Monthly */
  MONTHLY = "Monthly",
  /** Every 3 Months */
  E3M = "Every 3 Months",
  /** Every 6 Months */
  E6M = "Every 6 Months",
  /** Yearly */
  YEARLY = "Yearly",
}

export enum MainProgressBy {
  END_TIME = "MAIN_PROGRESS_BY::END_TIME",
  SPENT_BASE_TOKEN = "MAIN_PROGRESS_BY::SPENT_BASE_TOKEN",
  RECEIVED_TARGET_TOKEN = "MAIN_PROGRESS_BY::RECEIVED_TARGET_TOKEN",
  BATCH_AMOUNT = "MAIN_PROGRESS_BY::BATCH_AMOUNT",
}

export class BuyCondition {
  tokenAddress: string;
  type: PriceConditionType;
  value: string;
  fromValue?: string;
  toValue?: string;
}

export class BuyConditionOnChain {
  [key: string]: {
    value?: string;
    fromValue?: string;
    toValue?: string;
  };
}

export interface StopConditions {
  endTimeReach?: { primary: boolean; value: Date };
  baseTokenAmountReach?: { primary: boolean; value: number };
  quoteTokenAmountReach?: { primary: boolean; value: number };
  spentBaseTokenAmountReach?: { primary: boolean; value: number };
  spentQuoteTokenAmountReach?: { primary: boolean; value: number };
  batchAmountReach?: { primary: boolean; value: number };
}
export interface OffChainStopConditions {
  endTimeReach?: Date;
  targetTokenAmountReach?: number;
  baseTokenAmountReach?: number;
  batchAmountReach?: number;
}
export interface StopConditionsOnChain {
  endTime?: {
    value: string;
    isPrimary: boolean;
  };
  baseTokenAmountReach?: {
    value: string;
    isPrimary: boolean;
  };
  quoteTokenAmountReach?: {
    value: string;
    isPrimary: boolean;
  };
  spentBaseTokenAmountReach?: {
    value: string;
    isPrimary: boolean;
  };
  spentQuoteTokenAmountReach?: {
    value: string;
    isPrimary: boolean;
  };
  batchAmountReach?: {
    value: string;
    isPrimary: boolean;
  };
}

export class MachineEntity {
    id?: string;

    _id?: string;

    address: string;
    ownerAddress: string;
    name: string;

    status: MachineStatus;

    baseTokenAddress: string;
    targetTokenAddress: string;
    startTime: Date;
    endedAt: Date;
    updatedAt: Date;
    nextExecutionAt: Date;
    closedAt: Date;
}

export const parseToCreateMachineDtoOnChain = (
    signer: JsonRpcSigner,
    params: SingleTokenParams
): Params.CreateMachineParamsStruct => {
    const {
        firstPairItem,
        secondPairItem,
        amountEachBatch,
        frequency,
        firstBatchDate,
        firstBatchTime,
        byAtMarketCondition,
        endDate,
        endTime,
        targetTokenAmount,
        targetSOLAmount,
        targetBatchesPurchased,
        takeProfit,
        stopLoss,
        depositAmount,
    } = params;
    
    return {
        id: "",
        owner: signer.address,
        ammRouterAddress: platformConfig.whiteListedRouters.address,
        ammRouterVersion: platformConfig.whiteListedRouters.routerVersion,
        baseTokenAddress: platformConfig.whitelistTokenEntities?.[firstPairItem].address,
        targetTokenAddress: platformConfig.whitelistTokenEntities?.[secondPairItem].address,
        startAt: (new UtilsProvider().mergeDateAndTime(firstBatchDate, firstBatchTime).getTime() / 1000).toString(),
        batchVolume: amountEachBatch.toString(),
        frequency: convertDurationsTimeToHours(frequency).toString(),
    } as Params.CreateMachineParamsStruct;
};