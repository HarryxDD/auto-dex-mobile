/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
import { DurationObjectUnits } from "luxon";
import { BigNumberish, JsonRpcSigner } from "ethers";
import { Params } from "@/libs/providers/evm-program/contracts/MachineChef";
import "reflect-metadata";
import { EBuyCondition, SingleTokenParams } from "@/types/strategy";
import { UtilsProvider } from "@/utils/utils.provider";
import { convertDurationsTimeToHours } from "@/utils";
import { Token, platformConfig } from "@/libs/entities/platform-config.entity";
import { EConditionOperator } from "@/constants/strategy";

import bigDecimal from "js-big-decimal";

import { toBigInt } from "ethers";


export const convertBigNumber = (value: string, decimals: number) => {
  return toBigInt(
    // eslint-disable-next-line radix
    `0x${parseInt(
      bigDecimal.multiply(parseFloat(value), decimals)
    ).toString(16)}`
  );
};

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

export const parseOpeningCondition = (targetToken: Token, buyCondition: EBuyCondition): {
  value0: BigNumberish;
  value1: BigNumberish;
  operator: BigNumberish;
} => {
  if (!buyCondition) {
    return {
      value0: "0",
      value1: "0",
      operator: "0",
    };
  }

  let operator = "0";

  switch (buyCondition.type) {
    case EConditionOperator.GREATERTHAN:
      operator = "1";
      break;
    case EConditionOperator.GREATERTHANOREQUAL:
      operator = "2";
      break;
    case EConditionOperator.LESSTHAN:
      operator = "3";
      break;
    case EConditionOperator.LESSTHANOREQUAL:
      operator = "4";
      break;
    case EConditionOperator.BETWEEN:
      operator = "5";
      break;
    case EConditionOperator.NOTBETWEEN:
      operator = "6";
      break;
    default:
      operator = "0";
      break;
  }

  // Convert to decimal number
  const value0 = convertBigNumber(buyCondition.values[0], targetToken.decimals);
  const value1 = buyCondition.values[1] !== null ? convertBigNumber(buyCondition.values[1], targetToken.decimals) : "0";

  return {
    value0,
    value1,
    operator,
  };
};

export const parseToCreateMachineDtoOnChain = (
    baseToken: Token,
    targetToken: Token,
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

    const openingCondition = parseOpeningCondition(targetToken, params.byAtMarketCondition);

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
        openingPositionCondition: openingCondition
    } as Params.CreateMachineParamsStruct;
}