import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MMKV } from "react-native-mmkv";
import { avalanche } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";

import { ThemeProvider } from "@/theme";

import ApplicationNavigator from "./navigators/Application";
import "./translations";
import { AppProvider } from "./contexts/app.context";
import { TokenProvider } from "./hooks/useToken";

const queryClient = new QueryClient();

export const storage = new MMKV();

// Setup wallet
const projectId = process.env.WALLET_CONNECT_PROJECT_ID || "";

const metadata = {
  name: "AutoDex",
  description: "AutoDex Description",
  url: "",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [avalanche];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
});

function App() {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>
          <AppProvider>
            <WagmiConfig config={wagmiConfig as any}>
              <TokenProvider>
                <ApplicationNavigator />
                <Web3Modal />
              </TokenProvider>
            </WagmiConfig>
          </AppProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
