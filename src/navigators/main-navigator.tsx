import { createStackNavigator } from "@react-navigation/stack";
import { BOTTOM_TABS, SCREEN_POCKET_DETAIL } from "@/navigators/route-names";
import { MainParamList } from "@/types/navigation";
import BottomTabsNavigator from "@/navigators/bottom-tabs-navigator";
import PocketDetail from "@/screens/PocketDetail/PocketDetail";
import { AppHeaderBackButton } from "./config";

const MainStack = createStackNavigator<MainParamList>();

export const MainNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen
        name={BOTTOM_TABS}
        component={BottomTabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={SCREEN_POCKET_DETAIL}
        component={PocketDetail}
        options={{
          headerShown: true,
          headerLeft: () => <AppHeaderBackButton />,
          headerTitle: "Pocket details",
        }}
      />
    </MainStack.Navigator>
  );
};
