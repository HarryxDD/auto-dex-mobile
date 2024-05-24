import { BottomTabsParamList } from "@/types/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SCREEN_HISTORY,
  SCREEN_MY_POCKETS,
  SCREEN_PROFILE,
  SCREEN_STRATEGY,
} from "@/navigators/route-names";
import { History, MyPockets, Profile, Strategy } from "@/screens";
import BottomTabsContent from "@/components/BottomTabsContent";
import {
  IconHistoryFill,
  IconHistoryOutline,
  IconMyPocketFill,
  IconMyPocketOutline,
  IconProfileFill,
  IconProfileOutline,
  IconStrategyFill,
  IconStrategyOutline,
} from "@/theme/assets/icons/svg";
import { bottomTabsScreenOptions } from "./config";

const Tab = createBottomTabNavigator<BottomTabsParamList>();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabsContent {...props} />}>
      <Tab.Screen
        name={SCREEN_MY_POCKETS}
        component={MyPockets}
        options={{
          ...bottomTabsScreenOptions,
          title: "My Pockets",
          tabBarIcon: ({ focused, size }) =>
            !focused ? (
              <IconMyPocketOutline width={size} />
            ) : (
              <IconMyPocketFill width={size} />
            ),
        }}
      />
      <Tab.Screen
        name={SCREEN_STRATEGY}
        component={Strategy}
        options={{
          ...bottomTabsScreenOptions,
          title: "Strategy",
          tabBarIcon: ({ focused, size }) =>
            !focused ? (
              <IconStrategyOutline width={size} />
            ) : (
              <IconStrategyFill width={size} />
            ),
        }}
      />
      <Tab.Screen
        name={SCREEN_HISTORY}
        component={History}
        options={{
          ...bottomTabsScreenOptions,
          title: "History",
          tabBarIcon: ({ focused, size }) =>
            !focused ? (
              <IconHistoryOutline width={size} />
            ) : (
              <IconHistoryFill width={size} />
            ),
        }}
      />
      <Tab.Screen
        name={SCREEN_PROFILE}
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, size }) =>
            !focused ? (
              <IconProfileOutline width={size} />
            ) : (
              <IconProfileFill width={size} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
