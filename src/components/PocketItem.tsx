import { UiCol } from "@/components/elements/ui-grid/UiCol";
import { UiRow } from "@/components/elements/ui-grid/UiRow";
import { MYPOCKETS } from "@/dummy-data";
import { EPocketTab } from "@/constants/mypocket";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { truncateString } from "@/utils/helpers/string";
import { useTheme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_POCKET_DETAIL, STACK_MAIN } from "@/navigators/route-names";
import { PocketItemSection } from "@/components/PocketItemSection";

interface Props {
  pocket: (typeof MYPOCKETS)[EPocketTab.HISTORY][0];
}

export const PocketItem = (props: Props) => {
  const { pocket } = props;
  const { fonts, colors } = useTheme();
  const { navigate } = useNavigation();

  const handlePressPocket = () => {
    // @ts-ignore
    navigate(STACK_MAIN, {
      screen: SCREEN_POCKET_DETAIL,
      params: { pocketId: pocket.id },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressPocket}>
      <UiCol
        style={[{ backgroundColor: colors.secondaryBlack }, styles.container]}
      >
        <UiRow.LR
          style={[
            { backgroundColor: colors.charlestonGreen },
            styles.chainInfo,
          ]}
        >
          <UiCol>
            <Text style={fonts.bold}>{pocket.chain.name}</Text>
            <Text style={[{ color: colors.grayText }, fonts.size_12]}>
              {pocket.chain.subname}
            </Text>
          </UiCol>
          <Text>{truncateString(pocket.chain.address, 4)}</Text>
        </UiRow.LR>
        <PocketItemSection title="Strategy">
          <UiCol.R>
            <Text style={fonts.semiBold}>{pocket.strategy}</Text>
            <Text style={[{ color: colors.grayText }, fonts.size_10]}>
              {pocket.strategyDesc}
            </Text>
          </UiCol.R>
        </PocketItemSection>
        <PocketItemSection
          title="Total invested"
          value={pocket.totalInvested}
        />
        <PocketItemSection title="APL (ROI)">
          <Text style={[{ color: colors.ufoGreen }, fonts.semiBold]}>
            {pocket.APL}
          </Text>
        </PocketItemSection>
        <PocketItemSection title="Average price" value={pocket.avgPrice} />
        <PocketItemSection title="Status">
          <Text>{pocket.status}</Text>
        </PocketItemSection>
      </UiCol>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  chainInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
});
