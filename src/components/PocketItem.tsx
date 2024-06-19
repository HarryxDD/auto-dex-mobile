import { UiCol } from "@/components/elements/ui-grid/UiCol";
import { UiRow } from "@/components/elements/ui-grid/UiRow";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_POCKET_DETAIL, STACK_MAIN } from "@/navigators/route-names";
import { PocketItemSection } from "@/components/PocketItemSection";
import { PoolEntity } from "@/libs/entities/pool.entity";
import { convertDecimal } from "@/libs/entities/machine.entity";

interface Props {
  pool: PoolEntity;
}

export const PocketItem = (props: Props) => {
  const { pool } = props;
  const { fonts, colors } = useTheme();
  const { navigate } = useNavigation();

  const handlePressPocket = () => {
    // @ts-ignore
    navigate(STACK_MAIN, {
      screen: SCREEN_POCKET_DETAIL,
      params: { pocketId: pool._id },
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
            <Text style={[fonts.bold, { color: colors.white }]}>
              AVAXC
            </Text>
            <Text style={[{ color: colors.grayText }, fonts.size_12]}>
              Avalanche
            </Text>
          </UiCol>
          <Text style={[{ color: colors.white }]}>
            {pool._id}
          </Text>
        </UiRow.LR>
        <PocketItemSection title="Strategy">
          <UiCol.R>
            <Text style={[fonts.semiBold, { color: colors.white }]}>
              {/* {pocket.strategy} */}
            </Text>
            <Text style={[{ color: colors.grayText }, fonts.size_10]}>
              {/* {pocket.strategyDesc} */}
            </Text>
          </UiCol.R>
        </PocketItemSection>
        <PocketItemSection
          title="Total invested"
          value={convertDecimal(pool.currentSpentBaseToken.toString())}
        />
        <PocketItemSection title="APL (ROI)">
          <Text style={[{ color: (pool?.currentROI || 0) < 0 ? colors.red400 : colors.ufoGreen }, fonts.semiBold]}>
            {`${pool?.currentROI?.toFixed(2) || 0}`}%
          </Text>
        </PocketItemSection>
        <PocketItemSection title="Average price" value={convertDecimal(pool?.avgPrice?.toString())} />
        <PocketItemSection title="Status">
          <Text style={[{ color: colors.white }]}>{pool?.status}</Text>
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
