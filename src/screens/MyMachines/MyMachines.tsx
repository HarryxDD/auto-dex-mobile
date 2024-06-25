import { UiCol, UiMultiSwitch, UiRow } from "@/components";
import CubeGridLoader from "@/components/CubeGridLoader";
import { MachineItem } from "@/components/MachineItem";
import { SafeScreen } from "@/components/template";
import { EMachineTab } from "@/constants/mymachine";
import { useApp } from "@/contexts/app.context";
import { useEvmWallet } from "@/hooks/evm-context/useEvmWallet";
import { useInput } from "@/hooks/useInput";
import { PoolEntity, PoolStatus } from "@/libs/entities/pool.entity";
import { MachineService } from "@/libs/services/machine.service";
import { useTheme } from "@/theme";
import { SHARED_STYLES } from "@/theme/shared";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
  topSection: {
    marginVertical: 20,
  },
  tabContainer: {
    height: 36,
  },
  searchSection: {
    marginVertical: 18,
    gap: 14,
  },
  searchbarInput: {
    flex: 1,
    paddingVertical: 1,
  },
  filterSectionText: {
    marginRight: 10,
    fontWeight: "600",
  },
});

function MyMachines() {
  const { fonts, colors, components, gutters } = useTheme();
  const screenTabs = [EMachineTab.RUNNING, EMachineTab.HISTORY];
  const [currentTab, setCurrentTab] = useState(EMachineTab.RUNNING);
  const [inputs, setInputs] = useInput({ searchValue: "" });
  const { filterTokenModalRef } = useApp();
  const evmWallet = useEvmWallet();
  const [activePools, setActivePools] = useState<PoolEntity[]>([]);
  const [historyPools, setHistoryPools] = useState<PoolEntity[]>([]);
  const [loadingSyncWalletPools, setLoadingSyncWalletPools] = useState(false);
  const navigation = useNavigation();

  const handleSelectToken = () => {
    filterTokenModalRef.current?.present();
  };

  const fetchPools = useCallback(() => {
    if (!evmWallet.signer) return;
    new MachineService()
      .getMachineList(evmWallet.signer.address, [PoolStatus.ACTIVE])
      .then((data) => {
        setActivePools(data);
      })
      .catch((error) => {
        console.log(error);
      });

    new MachineService()
      .getMachineList(evmWallet.signer.address, [
        PoolStatus.PAUSED,
        PoolStatus.CLOSED,
        PoolStatus.ENDED,
      ])
      .then((data) => {
        setHistoryPools(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [evmWallet, navigation]);

  const syncWalletPools = useCallback(() => {
    if (!evmWallet.signer) return;
    setLoadingSyncWalletPools(true);
    new MachineService()
      .syncWalletMachines(evmWallet.signer.address)
      .then(() => {
        fetchPools();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingSyncWalletPools(false);
      });
  }, [evmWallet]);

  useEffect(() => {
    fetchPools();
  }, [evmWallet, navigation]);

  const renderScreenHeader = () => (
    <UiRow.LR style={styles.topSection}>
      <Text style={[fonts.size_20, fonts.bold, { color: colors.white }]}>
        My Machines
      </Text>
      <TouchableWithoutFeedback onPress={syncWalletPools}>
        <UiRow.C style={[components.secondaryBtn]}>
          <Text
            style={[{ color: colors.main }, gutters.marginRight_8, fonts.bold]}
          >
            Sync
          </Text>
          <Ionicons name="sync-outline" color={colors.main} size={18} />
        </UiRow.C>
      </TouchableWithoutFeedback>
    </UiRow.LR>
  );

  const renderSearchSection = () => (
    <UiRow style={styles.searchSection}>
      <UiRow.C.X style={components.inputContainer}>
        <Ionicons name="search-outline" color={colors.grayText} size={18} />
        <TextInput
          placeholder="Search"
          value={inputs.searchValue}
          onChangeText={(text) => {
            setInputs({ searchValue: text });
          }}
          style={styles.searchbarInput}
          placeholderTextColor={colors.grayText}
        />
      </UiRow.C.X>
      <TouchableWithoutFeedback onPress={handleSelectToken}>
        <UiRow.C style={components.inputContainer}>
          <Text style={[styles.filterSectionText, { color: colors.grayText }]}>
            AVAXC
          </Text>
          <Ionicons
            name="chevron-down-outline"
            color={colors.grayText}
            size={18}
            style={gutters.marginTop_2}
          />
        </UiRow.C>
      </TouchableWithoutFeedback>
    </UiRow>
  );

  return (
    <SafeScreen>
      <CubeGridLoader visible={loadingSyncWalletPools} />
      <UiCol.X style={[SHARED_STYLES.screenPadding]}>
        {renderScreenHeader()}
        <UiMultiSwitch
          items={screenTabs}
          value={currentTab}
          onChange={setCurrentTab}
          containerStyle={[
            {
              backgroundColor: colors.secondaryBlack,
            },
            styles.tabContainer,
          ]}
          textStyle={[{ color: colors.grayText }, fonts.bold]}
          activeTextStyle={{ color: colors.white }}
          sliderStyle={{ backgroundColor: colors.main }}
        />
        {renderSearchSection()}
        <FlatList
          data={currentTab === EMachineTab.RUNNING ? activePools : historyPools}
          renderItem={({ item }) => <MachineItem key={item._id} pool={item} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item._id}`}
          contentContainerStyle={SHARED_STYLES.growX}
        />
      </UiCol.X>
    </SafeScreen>
  );
}

export default MyMachines;
