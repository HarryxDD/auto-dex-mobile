import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { UiCol, UiMultiSwitch, UiRow } from "@/components";
import { SHARED_STYLES } from "@/theme/shared";
import PlaceholderAvatar from "@/theme/assets/images/avatar.png";
import { ImageVariant } from "@/components/atoms";
import { truncateAddress } from "@/utils/helpers/string";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IconAvaxc, ProfileCard } from "@/theme/assets/icons/svg";
import Tooltip from "react-native-walkthrough-tooltip";
import { useState } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import { EProfileTab } from "@/constants/profile";
import { PieChart } from "react-native-gifted-charts";
import { PROFILE_PIE_CHART } from "@/dummy-data";
import { SCREEN_PNL_ANALYSIS, STACK_MAIN } from "@/navigators/route-names";
import { useNavigation } from "@react-navigation/native";
import { useAccount } from "wagmi";

function Profile() {
  const { colors, fonts, gutters } = useTheme();
  const [showTip, setTip] = useState(false);
  const screenTabs = [EProfileTab.DETAILS, EProfileTab.STATISTICS];
  const [currentTab, setCurrentTab] = useState(EProfileTab.DETAILS);
  const { navigate } = useNavigation();
  const { address: walletAddress } = useAccount();

  const handleCopyAddress = () => {
    Clipboard?.setString(walletAddress || "");
  };

  const handleNavigateToAnalysis = () => {
    // @ts-ignore
    navigate(STACK_MAIN, {
      screen: SCREEN_PNL_ANALYSIS,
    });
  };

  const renderInfoSection = () => (
    <>
      <ImageVariant source={PlaceholderAvatar} style={styles.avatar} />
      <UiRow.C style={gutters.marginTop_10}>
        <Text
          style={[
            fonts.semiBold,
            fonts.size_16,
            gutters.marginRight_8,
            { color: colors.main },
          ]}
        >
          {truncateAddress(walletAddress || "")}
        </Text>
        <TouchableWithoutFeedback onPress={handleCopyAddress}>
          <Ionicons name="copy" color={colors.grayText} />
        </TouchableWithoutFeedback>
      </UiRow.C>
    </>
  );

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
        Total Machines Balance
      </Text>
      <UiRow style={styles.machineBalanceWrapper}>
        <IconAvaxc width={35} height={35} />
        <UiCol style={gutters.marginLeft_10}>
          <Text
            style={[
              fonts.size_18,
              fonts.bold,
              gutters.marginBottom_4,
              { color: colors.white },
            ]}
          >
            ~ 45.19 AVACX
          </Text>
          <Text style={[fonts.size_10, { color: colors.white }]}>
            (~ $8,803.24)
          </Text>
        </UiCol>
      </UiRow>
      <UiCol.R>
        <Tooltip
          isVisible={showTip}
          content={
            <UiCol>
              <Text style={[{ color: colors.white }]}>
                The profit or loss from financial trades on a specific day. PNL
                stands for &quot;profit and lost&quot;
              </Text>
            </UiCol>
          }
          onClose={() => setTip(false)}
          contentStyle={{
            backgroundColor: colors.charlestonGreen,
          }}
          placement="top"
        >
          <TouchableWithoutFeedback onPress={() => setTip(true)}>
            <Text style={{ color: colors.gray200 }}>Today&apos;s PNL ⓘ</Text>
          </TouchableWithoutFeedback>
        </Tooltip>
        <TouchableWithoutFeedback onPress={handleNavigateToAnalysis}>
          <UiRow.C style={gutters.marginTop_8}>
            <Text
              style={[
                fonts.bold,
                gutters.marginRight_4,
                { color: colors.ufoGreen },
              ]}
            >
              10.76$/6.23%
            </Text>
            <Ionicons
              name="chevron-forward"
              color={colors.ufoGreen}
              size={14}
            />
          </UiRow.C>
        </TouchableWithoutFeedback>
      </UiCol.R>
    </UiCol>
  );

  const renderDetailContent = () => (
    <UiCol>
      <Text style={[fonts.size_16, fonts.semiBold, { color: colors.white }]}>
        Assets (0)
      </Text>
    </UiCol>
  );

  const renderStatisticContent = () => (
    <UiRow>
      <PieChart
        data={PROFILE_PIE_CHART}
        donut
        showGradient
        sectionAutoFocus
        radius={90}
        innerRadius={60}
        innerCircleColor={colors.richBlack}
        centerLabelComponent={() => {
          return (
            <UiCol.C>
              <Text style={[fonts.size_10, { color: colors.grayText }]}>
                Est Balance
              </Text>
              <Text
                style={[fonts.bold, fonts.size_18, { color: colors.ufoGreen }]}
              >
                $16.4K
              </Text>
            </UiCol.C>
          );
        }}
      />
    </UiRow>
  );

  const renderTabContent = () => {
    if (currentTab === EProfileTab.DETAILS) {
      return <>{renderDetailContent()}</>;
    }

    return <>{renderStatisticContent()}</>;
  };

  return (
    <SafeScreen>
      <UiCol.LRT style={SHARED_STYLES.screenPadding}>
        {renderInfoSection()}
        {renderTotalBalanceSection()}
        <UiMultiSwitch
          items={screenTabs}
          value={currentTab}
          onChange={setCurrentTab}
          containerStyle={[
            {
              backgroundColor: colors.richBlack,
            },
            styles.tabContainer,
          ]}
          textStyle={[{ color: colors.grayText }, fonts.bold]}
          activeTextStyle={{
            color: colors.white,
          }}
          sliderStyle={[
            {
              backgroundColor: colors.richBlack,
              borderBottomColor: colors.main,
            },
            styles.tabSlider,
          ]}
          sliderDisabled={[
            { borderBottomColor: colors.charlestonGreen },
            styles.tabSlider,
          ]}
        />
        {renderTabContent()}
      </UiCol.LRT>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    alignSelf: "center",
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
  machineBalanceWrapper: {
    borderBottomWidth: 1,
    borderColor: "#969696",
    paddingBottom: 16,
    marginBottom: 12,
  },
  tabContainer: {
    height: 36,
    marginTop: 14,
    marginBottom: 20,
  },
  tabSlider: {
    borderRadius: 0,
    borderBottomWidth: 2,
  },
  searchbarInput: {
    flex: 1,
    paddingVertical: 1,
  },
});

export default Profile;
