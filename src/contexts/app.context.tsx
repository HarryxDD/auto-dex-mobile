import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import {
  createContext,
  ReactElement,
  ReactNode,
  RefObject,
  useContext,
  useMemo,
  useRef,
} from "react";

type AppContextType = {
  selectChainModalRef: RefObject<BottomSheetModalMethods>;
  filterTokenModalRef: RefObject<BottomSheetModalMethods>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Must be used within AppProvider");
  }
  return context;
}

const AppProvider = (props: { children: ReactNode }): ReactElement => {
  const selectChainModalRef = useRef<BottomSheetModal>(null);
  const filterTokenModalRef = useRef<BottomSheetModal>(null);

  return (
    <AppContext.Provider
      {...props}
      value={useMemo(
        () => ({ selectChainModalRef, filterTokenModalRef }),
        [selectChainModalRef, filterTokenModalRef]
      )}
    />
  );
};

export { AppProvider, useApp };
