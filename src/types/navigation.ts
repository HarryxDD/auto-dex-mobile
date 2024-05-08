import {
  BOTTOM_TABS,
  SCREEN_HISTORY,
  SCREEN_MY_POCKETS,
  SCREEN_PROFILE,
  SCREEN_STRATEGY,
  STACK_MAIN,
  SCREEN_POCKET_DETAIL,
  SCREEN_PNL_ANALYSIS,
} from "@/navigators/route-names";
import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  [STACK_MAIN]: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;

export type MainParamList = {
  [BOTTOM_TABS]: undefined;
  [SCREEN_POCKET_DETAIL]: {pocketId: string | number};
  [SCREEN_PNL_ANALYSIS]: undefined;
};

export type BottomTabsParamList = {
  [SCREEN_MY_POCKETS]: undefined;
  [SCREEN_STRATEGY]: undefined;
  [SCREEN_HISTORY]: undefined;
  [SCREEN_PROFILE]: undefined;
};
