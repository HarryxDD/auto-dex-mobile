export enum EStrategyType {
  SINGLE_TOKEN = "Single token",
  LIMIT_ORDER = "Limit order",
  TWAP = "TWAP",
  BASKET_DCA = "Basket dca",
}

export enum EStrategyFrequency {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  BIWEEKLY = "Bi-weekly",
  MONTHLY = "Monthly",
  ONE_HOUR = "1 Hour",
  FOUR_HOUR = "4 Hour",
  EIGHT_HOUR = "8 Hour",
  TWELVE_HOUR = "12 Hour",
}

export enum EConditionOperator {
  BETWEEN = "Between",
  LESSTHAN = "Less than",
  GREATERTHAN = "Greater than",
}

export const STRATEGY_FREQUENCIES = [
  { name: EStrategyFrequency.DAILY, value: null },
  { name: EStrategyFrequency.WEEKLY, value: null },
  { name: EStrategyFrequency.BIWEEKLY, value: null },
  { name: EStrategyFrequency.MONTHLY, value: null },
  { name: EStrategyFrequency.ONE_HOUR, value: null },
  { name: EStrategyFrequency.FOUR_HOUR, value: null },
  { name: EStrategyFrequency.EIGHT_HOUR, value: null },
  { name: EStrategyFrequency.TWELVE_HOUR, value: null },
];

export const STRATEGY_CONDITIONS = [
  EConditionOperator.BETWEEN,
  EConditionOperator.LESSTHAN,
  EConditionOperator.GREATERTHAN,
];

export const STRATEGY_CONDITION_VALUES: Record<
  EConditionOperator,
  { value: string }
> = {
  [EConditionOperator.BETWEEN]: { value: "=" },
  [EConditionOperator.LESSTHAN]: { value: "<" },
  [EConditionOperator.GREATERTHAN]: { value: ">" },
};
