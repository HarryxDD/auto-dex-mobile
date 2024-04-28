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
import Ionicons from "react-native-vector-icons/Ionicons";
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
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={`grid${!focused ? "-outline" : ""}`}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_STRATEGY}
        component={Strategy}
        options={{
          ...bottomTabsScreenOptions,
          title: "Strategy",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={`bar-chart${!focused ? "-outline" : ""}`}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_HISTORY}
        component={History}
        options={{
          ...bottomTabsScreenOptions,
          title: "History",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={`time${!focused ? "-outline" : ""}`}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_PROFILE}
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={`person${!focused ? "-outline" : ""}`}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
