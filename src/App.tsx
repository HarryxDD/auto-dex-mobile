import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MMKV } from "react-native-mmkv";

import { ThemeProvider } from "@/theme";

import ApplicationNavigator from "./navigators/Application";
import "./translations";
import { AppProvider } from "./contexts/app.context";

const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>
          <AppProvider>
            <ApplicationNavigator />
          </AppProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
