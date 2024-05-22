import { SafeScreen } from "@/components/template";
import { NavigationProp } from "@react-navigation/native";
import { BottomTabsHeaderRight } from "@/navigators/config";
import { useEffect, useState } from "react";
import ProgressStepBar from "@/components/ProgressStepBar";
import { SHARED_STYLES } from "@/theme/shared";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import SelectPair from "./components/SelectPair";
import SetStrategy from "./components/SetStrategy";
import Confirm from "./components/Confirm";

const SINGLE_TOKEN_SCREENS = [
  { title: "Select Pair", cpn: SelectPair },
  { title: "Strategy", cpn: SetStrategy },
  { title: "Deposit & Confirm", cpn: Confirm },
];

const SingleTokenScreen = ({
  navigation,
}: {
  navigation: NavigationProp<any, any>;
}) => {
  const [singleTokenProgress, setSingleTokenProgress] = useState(0);
  const StrategyContent = SINGLE_TOKEN_SCREENS[singleTokenProgress].cpn || null;

  useEffect(() => {
    if (singleTokenProgress === 0) {
      navigation.setOptions({
        title: "Select a token",
        headerRight: () => <BottomTabsHeaderRight />,
      });
    } else {
      navigation.setOptions({
        title: "Create single token DCA",
        headerRight: false,
      });
    }
  }, [singleTokenProgress]);

  return (
    <BottomSheetModalProvider>
      <SafeScreen>
        <ProgressStepBar
          steps={SINGLE_TOKEN_SCREENS}
          activeStep={singleTokenProgress}
          containerStyle={SHARED_STYLES.screenPadding}
        />
        <StrategyContent
          singleTokenProgress={singleTokenProgress}
          setSingleTokenProgress={setSingleTokenProgress}
        />
      </SafeScreen>
    </BottomSheetModalProvider>
  );
};

export default SingleTokenScreen;
