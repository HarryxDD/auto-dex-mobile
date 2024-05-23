import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "@/theme";

import type { ApplicationStackParamList } from "@/types/navigation";
import { STACK_AUTH, STACK_MAIN } from "@/navigators/route-names";
import { MainNavigator } from "@/navigators/main-navigator";
import { SelectChainModal } from "@/components/SelectChainModal";
import { useApp } from "@/contexts/app.context";
import { FilterTokenModal } from "@/components/FilterTokenModal";
import NavigationRef from "@/utils/navigation-ref";
import { AuthNavigator } from "./auth-navigator";

const Stack = createStackNavigator<ApplicationStackParamList>();

export const RootStack = () => {
  const { variant } = useTheme();
  const isConnect = true;

  const renderScreens = () => {
    const screens = [];

    // if (isNotLoggedIn) {
    //   screens.push(
    //     <Stack.Screen
    //       key={STACK_MAIN}
    //       name={STACK_MAIN}
    //       component={MainNavigator}
    //       options={{ headerShown: false }}
    //     />
    //   );
    //   screens.push(
    //     <Stack.Screen
    //       key={STACK_AUTH}
    //       name={STACK_AUTH}
    //       component={AuthNavigator}
    //       options={{ headerShown: false }}
    //     />
    //   );
    // }
    // if (!isNotLoggedIn) {
    // screens.push(
    //   <Stack.Screen
    //     key={STACK_MAIN}
    //     name={STACK_MAIN}
    //     component={MainNavigator}
    //     options={{ headerShown: false }}
    //   />
    // );
    // }

    if (!isConnect) {
      screens.push(
        <Stack.Screen
          key={STACK_AUTH}
          name={STACK_AUTH}
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      );
    } else {
      screens.push(
        <Stack.Screen
          key={STACK_MAIN}
          name={STACK_MAIN}
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      );
    }

    return screens;
  };

  return (
    <Stack.Navigator
      key={variant}
      screenOptions={{
        headerShown: false,
      }}
    >
      {renderScreens()}
    </Stack.Navigator>
  );
};

function ApplicationNavigator() {
  const { navigationTheme } = useTheme();
  const { navigationRef } = NavigationRef;
  const { selectChainModalRef, filterTokenModalRef } = useApp();

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <RootStack />
      <SelectChainModal ref={selectChainModalRef} />
      <FilterTokenModal ref={filterTokenModalRef} />
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
