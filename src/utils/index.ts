import { EStrategyFrequency } from "@/constants/strategy";

export const convertDurationsTimeToHours = (
    duration: EStrategyFrequency
): number => {
    const swapDuration = (val: number) => {
      return val * 3600;
    };
  
    if (duration === EStrategyFrequency.ONE_HOUR) {
      return swapDuration(1);
    } if (duration === EStrategyFrequency.FOUR_HOUR) {
      return swapDuration(4);
    } if (duration === EStrategyFrequency.EIGHT_HOUR) {
        return swapDuration(8);
    } if (duration === EStrategyFrequency.TWELVE_HOUR) {
        return swapDuration(12);
    } if (duration === EStrategyFrequency.DAILY) {
        return swapDuration(24);
    } if (duration === EStrategyFrequency.WEEKLY) {
        return swapDuration(24 * 7);
    } if (duration === EStrategyFrequency.MONTHLY) {
        return swapDuration(24 * 30);
    } 

    return swapDuration(0)
  };
  