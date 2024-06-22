import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { UiCol, UiRow } from "@/components";
import { SHARED_STYLES } from "@/theme/shared";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useInput } from "@/hooks/useInput";
import { MachineItemSection } from "@/components/MachineItemSection";
import { HISTORY_DATA } from "@/dummy-data";

function History() {
  const { fonts, colors, components, gutters } = useTheme();
  const [inputs, setInputs] = useInput({ searchValue: "" });
  const historyData = HISTORY_DATA;

  const renderSearchAndFilter = () => (
    <>
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
      <UiRow.LR style={gutters.marginVertical_20}>
        <Text style={[fonts.semiBold, fonts.size_12, { color: colors.white }]}>
          Filter by
        </Text>
        <TouchableWithoutFeedback onPress={() => {}}>
          <UiRow.C style={[components.secondaryBtn]}>
            <Text
              style={[
                gutters.marginRight_8,
                fonts.bold,
                { color: colors.white },
              ]}
            >
              Last 3 months
            </Text>
            <Ionicons name="calendar-outline" color={colors.main} size={18} />
          </UiRow.C>
        </TouchableWithoutFeedback>
      </UiRow.LR>
    </>
  );

  return (
    <SafeScreen>
      <ScrollView>
        <UiCol style={SHARED_STYLES.screenPadding}>
          {renderSearchAndFilter()}
          {historyData.map((item) => (
            <UiCol key={item.id}>
              <UiRow.LR style={gutters.marginBottom_10}>
                <Text
                  style={[fonts.bold, fonts.size_12, { color: colors.white }]}
                >
                  {item.date}
                </Text>
                <Text style={[fonts.semiBold, { color: colors.grayText }]}>
                  {item.hash}
                </Text>
              </UiRow.LR>
              <UiCol
                style={[
                  { backgroundColor: colors.secondaryBlack },
                  styles.itemContainer,
                ]}
              >
                {item.pair && (
                  <MachineItemSection title="Pair" value={item.pair} />
                )}
                {item.type && (
                  <MachineItemSection title="Type" value={item.type} />
                )}
                {item.amount && (
                  <MachineItemSection title="Amount" value={item.amount} />
                )}
                {item.tokenAmount && (
                  <MachineItemSection
                    title="Token amount"
                    value={item.tokenAmount}
                  />
                )}
              </UiCol>
            </UiCol>
          ))}
        </UiCol>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  searchbarInput: {
    flex: 1,
    paddingVertical: 1,
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default History;
