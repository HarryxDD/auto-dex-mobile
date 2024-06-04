import { UiCol, UiRow } from "@/components";
import { useApp } from "@/contexts/app.context";
import { SELECT_TOKEN_DATA } from "@/dummy-data";
import { useTheme } from "@/theme";
import { useInput } from "@/hooks/useInput";
import { SHARED_STYLES } from "@/theme/shared";
import { SetStateAction } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { platformConfig } from "@/libs/entities/platform-config.entity";
import { useToken } from "@/hooks/useToken";

const SelectPair = ({
  singleTokenProgress,
  setSingleTokenProgress,
}: {
  singleTokenProgress: number;
  setSingleTokenProgress: React.Dispatch<SetStateAction<number>>;
}) => {
  const { whiteListedTokens } = useToken();

  const { fonts, colors, components, gutters } = useTheme();
  const [inputs, setInputs] = useInput({ searchValue: "" });
  const { filterTokenModalRef } = useApp();

  const handleSelectToken = () => {
    filterTokenModalRef.current?.present();
  };

  const handleMoveToNextStep = () => {
    setSingleTokenProgress(singleTokenProgress + 1);
  };

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
    <UiCol.LRT style={SHARED_STYLES.screenPadding}>
      {renderSearchSection()}
      <ScrollView>
        {whiteListedTokens.map((token) => (
          <TouchableWithoutFeedback
            key={token.symbol}
            onPress={handleMoveToNextStep}
          >
            <UiRow.LR style={gutters.marginBottom_24}>
              <UiCol>
                <Text
                  style={[
                    fonts.bold,
                    gutters.marginBottom_2,
                    { color: colors.white },
                  ]}
                >
                  {token.name}
                </Text>
                <Text style={[fonts.size_12, { color: colors.grayText }]}>
                  {token.symbol}
                </Text>
              </UiCol>
              <Text style={[fonts.semiBold, { color: colors.white }]}>
                {token.estimatedValue}
              </Text>
            </UiRow.LR>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </UiCol.LRT>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    marginTop: 14,
    marginBottom: 24,
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

export default SelectPair;
