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
import { useState } from "react";
import { useInput } from "@/hooks/useInput";
import {} from "@gorhom/bottom-sheet";
import { useApp } from "@/contexts/app.context";
import { EPocketTab } from "@/constants/mypocket";
import { PocketItem } from "@/components/PocketItem";
import { MYPOCKETS } from "@/dummy-data";

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
  const pockets = MYPOCKETS[currentTab] || [];

  const handleSync = () => {};

  const handleSelectToken = () => {
    filterTokenModalRef.current?.present();
  };

  const renderScreenHeader = () => (
    <UiRow.LR style={styles.topSection}>
      <Text style={[fonts.size_20, fonts.bold, { color: colors.white }]}>
        My Pockets
      </Text>
      <TouchableWithoutFeedback onPress={handleSync}>
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

  const renderPocket = ({
    item,
  }: {
    item: (typeof MYPOCKETS)[EPocketTab.HISTORY][0];
  }) => <PocketItem pocket={item} />;

  return (
    <SafeScreen>
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
          data={pockets}
          renderItem={renderPocket}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={SHARED_STYLES.growX}
          // onEndReached={handleLoadMore}
          // ListEmptyComponent={renderListEmpty}
          // onEndReachedThreshold={isIos ? 0 : 1}
          // ListFooterComponent={renderListFooter}
          // refreshControl={<RefreshControl refreshing={!!loading} onRefresh={handleRefresh} colors={[theme.colors.primary]} />}
        />
      </UiCol.X>
    </SafeScreen>
  );
}

export default MyPockets;
