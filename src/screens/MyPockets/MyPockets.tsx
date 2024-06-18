/* eslint-disable no-useless-return */
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { UiCol, UiMultiSwitch, UiRow } from "@/components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SHARED_STYLES } from "@/theme/shared";
import { useCallback, useEffect, useState } from "react";
import { useInput } from "@/hooks/useInput";
import {} from "@gorhom/bottom-sheet";
import { useApp } from "@/contexts/app.context";
import { EPocketTab } from "@/constants/mypocket";
import { useEvmWallet } from "@/hooks/evm-context/useEvmWallet";
import {
  convertBigNumber,
  parseToCreateMachineDtoOnChain,
} from "@/libs/entities/machine.entity";
import { useToken } from "@/hooks/useToken";
import { EStrategyFrequency } from "@/constants/strategy";
import { UtilsProvider } from "@/utils/utils.provider";
import { MachineService } from "@/libs/services/machine.service";
import { PoolEntity, PoolStatus } from "@/libs/entities/pool.entity";
import { PocketItem } from "@/components/PocketItem";
import { useNavigation } from "@react-navigation/native";

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

function MyPockets() {
  const { fonts, colors, components, gutters } = useTheme();
  const screenTabs = [EPocketTab.RUNNING, EPocketTab.HISTORY];
  const [currentTab, setCurrentTab] = useState(EPocketTab.RUNNING);
  const [inputs, setInputs] = useInput({ searchValue: "" });
  const { filterTokenModalRef } = useApp();
  const evmWallet = useEvmWallet();
  const tokens = useToken();
  const [pools, setPools] = useState<PoolEntity[]>([]);
  const navigation = useNavigation();

  const handleSelectToken = () => {
    filterTokenModalRef.current?.present();
  };

  const fetchPools = useCallback(() => {
    if (!evmWallet.signer) return;
    new MachineService()
      .getMachineList(evmWallet.signer.address, [PoolStatus.ACTIVE])
      .then((data) => {
        setPools(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [evmWallet, navigation]);

  const syncWalletPools = useCallback(() => {
    if (!evmWallet.signer) return;
    new MachineService()
      .syncWalletMachines(evmWallet.signer.address)
      .then(() => {
        fetchPools();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [evmWallet]);

  useEffect(() => {
    fetchPools();
  }, [evmWallet, navigation]);

  const handlePressCreatePocket = useCallback(() => {
    if (!evmWallet.signer) return;
    if (!tokens.whiteListedTokens.length) return;

    const baseToken = tokens.whiteListedTokens?.[0];
    const targetToken = tokens.whiteListedTokens?.[1];

    const params = parseToCreateMachineDtoOnChain(
      baseToken,
      targetToken,
      evmWallet.signer,
      {
        depositAmount: "0.001",
        amountEachBatch: "0.0001",
        firstBatchDate: new Date(Date.now()),
        firstBatchTime: new Date(new Date(Date.now()).getTime() + 2000 * 60),
        frequency: EStrategyFrequency.ONE_HOUR,
        firstPairItem: baseToken.address,
        secondPairItem: targetToken.address,
      }
    );

    console.log(
      new UtilsProvider()
        .mergeDateAndTime(
          new Date(Date.now()),
          new Date(new Date(Date.now()).getTime() + 2000 * 60)
        )
        .getTime() / 1000
    );
    evmWallet.createMachine(convertBigNumber("0.001", 18), params);
  }, [evmWallet]);

  const renderScreenHeader = () => (
    <UiRow.LR style={styles.topSection}>
      <Text style={[fonts.size_20, fonts.bold, { color: colors.white }]}>
        My Pockets
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
            SOL
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
      <UiCol.X style={[SHARED_STYLES.screenPadding]}>
        {renderScreenHeader()}
        <TouchableWithoutFeedback
          disabled={false}
          onPress={handlePressCreatePocket}
        >
          <Text
            style={[
              { color: colors.white, marginBottom: 20 },
              fonts.bold,
              components.primaryBtn,
            ]}
          >
            Create pocket
          </Text>
        </TouchableWithoutFeedback>
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
          data={pools}
          renderItem={({ item }) => <PocketItem key={item._id} pool={item} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item._id}`}
          contentContainerStyle={SHARED_STYLES.growX}
        />
      </UiCol.X>
    </SafeScreen>
  );
}

export default MyPockets;
