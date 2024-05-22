import { ScrollView, StyleSheet, Text } from "react-native";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { UiCol, UiRow } from "@/components";
import { RouteProp, useRoute } from "@react-navigation/native";
import { MainParamList } from "@/types/navigation";
import { PocketItemSection } from "@/components/PocketItemSection";
import { SHARED_STYLES } from "@/theme/shared";

function PocketDetail() {
  const { colors, fonts, gutters } = useTheme();
  const { params } =
    useRoute<RouteProp<MainParamList, "SCREEN_POCKET_DETAIL">>();
  const { pocketId } = params || {};

  const renderProgressSection = () => (
    <UiCol>
      <Text style={[fonts.bold, fonts.size_16, gutters.marginBottom_10]}>
        Progress
      </Text>
      <UiCol
        style={[{ backgroundColor: colors.secondaryBlack }, styles.container]}
      >
        <PocketItemSection title="Total invested" value="78 SOL" />
        <PocketItemSection title="Batch bought" value="10 BATCHES" />
        <PocketItemSection title="Token hold">
          <UiCol.R>
            <Text style={fonts.semiBold}>0.001 SOL = 0.000062 BTC</Text>
            <Text style={fonts.semiBold}>0.001 SOL = 0.0675 BNB</Text>
            <Text style={fonts.semiBold}>0.001 SOL = 0.74 USDC</Text>
          </UiCol.R>
        </PocketItemSection>
        <PocketItemSection title="APL (ROI)">
          <Text style={[fonts.semiBold, { color: colors.ufoGreen }]}>
            + 0.00 SOL (0.00%)
          </Text>
        </PocketItemSection>
      </UiCol>
    </UiCol>
  );

  const renderNextBatchSection = () => (
    <UiCol>
      <Text style={[fonts.bold, fonts.size_16, gutters.marginBottom_10]}>
        Next batch
      </Text>
      <UiCol
        style={[{ backgroundColor: colors.secondaryBlack }, styles.container]}
      >
        <PocketItemSection title="Next batch time" value="16/02/2023 16:00" />
        <PocketItemSection title="Outstanding deposit" value="3.4 USDC" />
      </UiCol>
    </UiCol>
  );

  const renderPoolInfoSection = () => (
    <UiCol>
      <Text style={[fonts.bold, fonts.size_16, gutters.marginBottom_10]}>
        Pool info
      </Text>
      <UiCol
        style={[{ backgroundColor: colors.secondaryBlack }, styles.container]}
      >
        <PocketItemSection title="Total deposited" value="78 SOL" />
        <PocketItemSection title="Start date" value="16/02/2023 16:00" />
      </UiCol>
    </UiCol>
  );

  const renderEndConditionSection = () => (
    <UiCol>
      <Text style={[fonts.bold, fonts.size_16, gutters.marginBottom_10]}>
        End Conditions
      </Text>
      <UiCol
        style={[{ backgroundColor: colors.secondaryBlack }, styles.container]}
      >
        <PocketItemSection title="Time" value="16/08/2023 16:00" />
        <PocketItemSection title="or" value="300 SOL" />
      </UiCol>
    </UiCol>
  );

  const renderTPSLSection = () => (
    <UiCol>
      <Text style={[fonts.bold, fonts.size_16, gutters.marginBottom_10]}>
        TP/SL
      </Text>
      <UiCol
        style={[{ backgroundColor: colors.secondaryBlack }, styles.container]}
      >
        <PocketItemSection title="Take profit" value="50 SOL" />
        <PocketItemSection title="Stop loss" value="10% of total invested" />
      </UiCol>
    </UiCol>
  );

  const renderTransactionsSection = () => (
    <UiCol>
      <Text style={[fonts.bold, fonts.size_16, gutters.marginBottom_10]}>
        Bought transaction
      </Text>
      <UiCol
        style={[{ backgroundColor: colors.secondaryBlack }, styles.container]}
      >
        <PocketItemSection
          title="dd/mm/yyyy hh:ss"
          value="4 SOL <> X,XXX.00 TOKEN"
        />
        <PocketItemSection
          title="dd/mm/yyyy hh:ss"
          value="4 SOL <> X,XXX.00 TOKEN"
        />
        <PocketItemSection
          title="dd/mm/yyyy hh:ss"
          value="4 SOL <> X,XXX.00 TOKEN"
        />
        <PocketItemSection
          title="dd/mm/yyyy hh:ss"
          value="4 SOL <> X,XXX.00 TOKEN"
        />
      </UiCol>
    </UiCol>
  );

  return (
    <SafeScreen>
      <ScrollView>
        <UiCol style={SHARED_STYLES.screenPadding}>
          <Text style={{ color: colors.white }}>Pocket Detail {pocketId}</Text>
          <UiRow.LR
            style={[
              { backgroundColor: colors.charlestonGreen },
              styles.chainInfo,
            ]}
          >
            <UiCol>
              <Text style={fonts.bold}>SOL/BTC</Text>
              <Text style={[{ color: colors.grayText }, fonts.size_12]}>
                Blockasset
              </Text>
            </UiCol>
            <Text>#146...423</Text>
          </UiRow.LR>
          <PocketItemSection
            title="Strategy"
            value="10 SOL monthly"
            containerStyle={gutters.marginBottom_16}
          />
          {renderProgressSection()}
          {renderNextBatchSection()}
          {renderPoolInfoSection()}
          {renderEndConditionSection()}
          {renderTPSLSection()}
          {renderTransactionsSection()}
        </UiCol>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  chainInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default PocketDetail;
