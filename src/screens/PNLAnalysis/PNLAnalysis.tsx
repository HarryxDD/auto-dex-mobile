import { ScrollView, StyleSheet, Text } from "react-native";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { UiCol, UiRow } from "@/components";
import { SHARED_STYLES } from "@/theme/shared";
import { CircularDot, IconBNB, ProfileCard } from "@/theme/assets/icons/svg";
import { LineChart } from "react-native-gifted-charts";
import { PROFILE_LINE_CHART } from "@/dummy-data";

function PNLAnalysis() {
  const { colors, fonts, gutters } = useTheme();

  const renderTotalBalanceSection = () => (
    <UiCol style={styles.cardWrapper}>
      <UiCol style={styles.cardBackground}>
        <ProfileCard height="100%" width="100%" />
      </UiCol>
      <Text
        style={[
          fonts.semiBold,
          gutters.marginBottom_10,
          { color: colors.gray200 },
        ]}
      >
        Total Pockets Balance
      </Text>
      <UiRow style={styles.pocketBalanceWrapper}>
        <IconBNB width={35} height={35} />
        <UiCol style={gutters.marginLeft_10}>
          <Text
            style={[
              fonts.size_18,
              fonts.bold,
              gutters.marginBottom_4,
              { color: colors.white },
            ]}
          >
            ~ 45.19 SOL
          </Text>
          <Text style={[fonts.size_10, { color: colors.white }]}>
            (~ $8,803.24)
          </Text>
        </UiCol>
      </UiRow>
      <UiRow.LR>
        <UiCol.L>
          <Text style={{ color: colors.gray200 }}>Today&apos;s PNL</Text>
          <UiRow.C style={gutters.marginTop_8}>
            <Text style={[fonts.bold, { color: colors.ufoGreen }]}>
              10.76$/6.23%
            </Text>
          </UiRow.C>
        </UiCol.L>
        <UiCol.R>
          <Text style={{ color: colors.gray200 }}>Today&apos;s PNL</Text>
          <UiRow.C style={gutters.marginTop_8}>
            <Text style={[fonts.bold, { color: colors.ufoGreen }]}>
              10.76$/6.23%
            </Text>
          </UiRow.C>
        </UiCol.R>
      </UiRow.LR>
    </UiCol>
  );

  const renderCumulativePNL = () => (
    <UiCol style={gutters.marginVertical_24}>
      <UiRow.LR>
        <Text style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}>
          Cumulative PNL (%)
        </Text>
        <Text style={[fonts.size_12, { color: colors.grayText }]}>
          2023-04-05
        </Text>
      </UiRow.LR>
      <UiCol
        style={[
          { backgroundColor: colors.secondaryBlack },
          styles.contentWrapper,
        ]}
      >
        <UiCol>
          <Text
            style={[fonts.semiBold, fonts.size_16, { color: colors.ufoGreen }]}
          >
            +12,3%
          </Text>
          <UiRow.L style={gutters.marginBottom_20}>
            <CircularDot color={colors.main} />
            <Text
              style={[
                gutters.marginLeft_4,
                fonts.size_12,
                fonts.bold,
                { color: colors.white },
              ]}
            >
              Cumlative PNL
            </Text>
          </UiRow.L>
          <LineChart
            data={PROFILE_LINE_CHART}
            color={colors.main}
            thickness={3}
            hideDataPoints
            spacing={80}
            curved
            hideRules
          />
        </UiCol>
      </UiCol>
    </UiCol>
  );

  return (
    <SafeScreen>
      <ScrollView>
        <UiCol style={SHARED_STYLES.screenPadding}>
          {renderTotalBalanceSection()}
          {renderCumulativePNL()}
        </UiCol>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 16,
  },
  cardWrapper: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 20,
    position: "relative",
  },
  cardBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pocketBalanceWrapper: {
    borderBottomWidth: 1,
    borderColor: "#969696",
    paddingBottom: 16,
    marginBottom: 12,
  },
});

export default PNLAnalysis;
