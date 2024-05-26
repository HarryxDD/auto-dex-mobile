import { UiCol, UiRow } from "@/components";
import { PocketItemSection } from "@/components/PocketItemSection";
import SuccessModal from "@/components/SuccessModal";
import { useTheme } from "@/theme";
import { IconBNB } from "@/theme/assets/icons/svg";
import { SHARED_STYLES } from "@/theme/shared";
import NavigationRef from "@/utils/navigation-ref";
import { SetStateAction } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSingleToken } from "@/screens/SingleToken/SingleToken";
import { useBoolBag } from "@/hooks/useBoolBag";

const Confirm = ({
  singleTokenProgress,
  setSingleTokenProgress,
}: {
  singleTokenProgress: number;
  setSingleTokenProgress: React.Dispatch<SetStateAction<number>>;
}) => {
  const { fonts, colors, components, gutters } = useTheme();
  const { inputs, setInputs } = useSingleToken();
  const { boolBag, setBoolBag } = useBoolBag({
    showSuccessModal: false,
  });
  const { showSuccessModal } = boolBag;
  const isDisableCreateBtn = inputs.depositAmount === 0;

  const handleGoBack = () => {
    NavigationRef.goBack();
  };

  const handleMoveToPreviousStep = () => {
    setSingleTokenProgress(singleTokenProgress - 1);
  };

  const handlePressDoneSuccessModal = () => {
    setBoolBag({ showSuccessModal: false });
    handleGoBack();
  };

  const handlePressCreatePocket = () => {
    setBoolBag({ showSuccessModal: true });
  };

  const renderDepositAmountSection = () => (
    <UiCol style={styles.sectionWrapper}>
      <UiRow>
        <Text style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}>
          Deposit amount
        </Text>
        <Text style={[fonts.semiBold, fonts.size_16, { color: colors.red500 }]}>
          {" "}
          *
        </Text>
      </UiRow>
      <UiRow.C
        style={[
          components.inputContainer,
          gutters.marginTop_16,
          { backgroundColor: colors.charlestonGreen },
        ]}
      >
        <IconBNB width={18} height={18} style={gutters.marginRight_2} />
        <TextInput
          placeholder="From 0.1 SOL"
          value={inputs.depositAmount.toString()}
          onChangeText={(text) => {
            setInputs({ depositAmount: +text });
          }}
          style={styles.textInputStyle}
          placeholderTextColor={colors.grayText}
        />
        <Text style={[fonts.semiBold, fonts.size_14, { color: colors.white }]}>
          BNB
        </Text>
      </UiRow.C>
    </UiCol>
  );

  const renderDCAPairSection = () => (
    <UiCol style={styles.sectionWrapper}>
      <Text style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}>
        DCA Pair
      </Text>
      <UiCol.LRC style={styles.DCAPairWrapper}>
        <UiRow.LR
          style={[
            { backgroundColor: colors.charlestonGreen },
            gutters.paddingHorizontal_24,
            gutters.paddingVertical_24,
            styles.firstPairItem,
          ]}
        >
          <UiRow.C>
            <IconBNB width={18} height={18} style={gutters.marginRight_2} />
            <Text
              style={[
                fonts.semiBold,
                fonts.size_16,
                gutters.marginHorizontal_4,
                { color: colors.white },
              ]}
            >
              BNB
            </Text>
            <Ionicons
              name="chevron-down-outline"
              color={colors.grayText}
              size={18}
              style={gutters.marginTop_2}
            />
          </UiRow.C>
          <Text style={[fonts.size_12, { color: colors.grayText }]}>
            Balance: 319.23
          </Text>
        </UiRow.LR>
        <UiRow.LR
          style={[
            { backgroundColor: colors.charlestonGreen },
            gutters.paddingHorizontal_24,
            gutters.paddingVertical_24,
            styles.secondPairItem,
          ]}
        >
          <UiRow.C>
            <IconBNB width={18} height={18} style={gutters.marginRight_2} />
            <Text
              style={[
                fonts.semiBold,
                fonts.size_16,
                gutters.marginHorizontal_4,
                { color: colors.white },
              ]}
            >
              BNB
            </Text>
            <Ionicons
              name="chevron-down-outline"
              color={colors.grayText}
              size={18}
              style={gutters.marginTop_2}
            />
          </UiRow.C>
          <Text style={[fonts.size_12, { color: colors.grayText }]}>
            Balance: 319.23
          </Text>
        </UiRow.LR>
      </UiCol.LRC>
      <UiRow.LR>
        <Text style={[fonts.semiBold, fonts.size_14, { color: colors.white }]}>
          Provider
        </Text>
        <UiRow.C>
          <IconBNB width={18} height={18} style={gutters.marginRight_2} />
          <Text
            style={[
              fonts.semiBold,
              fonts.size_14,
              gutters.marginHorizontal_4,
              { color: colors.white },
            ]}
          >
            BNB
          </Text>
        </UiRow.C>
      </UiRow.LR>
    </UiCol>
  );

  const renderSummarySection = () => (
    <UiCol>
      <Text style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}>
        Summary
      </Text>
      <UiCol
        style={[
          { backgroundColor: colors.secondaryBlack },
          styles.contentContainer,
        ]}
      >
        <PocketItemSection title="Strategy" value="50 SOL" />
        <PocketItemSection title="First batch time" value="16/02/2023 20:00" />
      </UiCol>
    </UiCol>
  );

  const renderEndConditionsSection = () => (
    <UiCol>
      <Text style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}>
        End conditions
      </Text>
      <UiCol
        style={[
          { backgroundColor: colors.secondaryBlack },
          styles.contentContainer,
        ]}
      >
        <PocketItemSection title="Time" value="16/02/2023 20:00" />
        <PocketItemSection title="or" value="300 SOL" />
        <PocketItemSection title="or" value="1,000,000,000 BLOCK" />
        <PocketItemSection title="or" value="10 BATCHES" />
      </UiCol>
    </UiCol>
  );

  const renderTPSLSection = () => (
    <UiCol>
      <Text style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}>
        TP/SL
      </Text>
      <UiCol
        style={[
          { backgroundColor: colors.secondaryBlack },
          styles.contentContainer,
        ]}
      >
        <PocketItemSection title="Take profit" value="50 SOL" />
        <PocketItemSection title="Stop loss" value="10% of total invested" />
      </UiCol>
    </UiCol>
  );

  const renderScreenButtons = () => (
    <UiRow.LR style={[styles.buttonWrapper, styles.sectionWrapper]}>
      <TouchableWithoutFeedback onPress={handleMoveToPreviousStep}>
        <UiRow.C.X
          style={[components.secondaryBtn, gutters.paddingVertical_10]}
        >
          <Text style={[{ color: colors.main }, fonts.bold]}>Back</Text>
        </UiRow.C.X>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        disabled={isDisableCreateBtn}
        onPress={handlePressCreatePocket}
      >
        <UiRow.C.X
          style={[
            !isDisableCreateBtn
              ? components.primaryBtn
              : components.disablePrimaryBtn,
            gutters.paddingVertical_10,
          ]}
        >
          <Text style={[{ color: colors.white }, fonts.bold]}>
            Create pocket
          </Text>
        </UiRow.C.X>
      </TouchableWithoutFeedback>
    </UiRow.LR>
  );

  return (
    <>
      <SuccessModal
        visible={showSuccessModal}
        onClose={handlePressDoneSuccessModal}
        title="Success!"
      >
        <UiCol.LRC style={SHARED_STYLES.screenPadding}>
          <Text
            style={[
              fonts.size_14,
              SHARED_STYLES.textAlignCenter,
              { color: colors.white },
            ]}
          >
            Pocket <Text style={{ color: colors.ufoGreen }}>#14623</Text> has
            been created.
          </Text>
          <Text
            style={[
              fonts.size_14,
              gutters.marginVertical_10,
              SHARED_STYLES.textAlignCenter,
              { color: colors.white },
            ]}
          >
            The pocket’s status should be updated within 5 minutes.
          </Text>
        </UiCol.LRC>
      </SuccessModal>
      <ScrollView>
        <UiCol.LRT style={[SHARED_STYLES.screenPadding, gutters.marginTop_10]}>
          {renderDepositAmountSection()}
          {renderDCAPairSection()}
          {renderSummarySection()}
          {renderEndConditionsSection()}
          {renderTPSLSection()}
          {renderScreenButtons()}
        </UiCol.LRT>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 20,
  },
  DCAPairWrapper: {
    gap: 4,
    borderRadius: 20,
    marginVertical: 16,
  },
  firstPairItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  secondPairItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textInputStyle: {
    flex: 1,
    paddingVertical: 1,
    marginLeft: 6,
    color: "white",
  },
  sectionWrapper: {
    marginVertical: 30,
  },
  buttonWrapper: {
    gap: 16,
  },
  width18: { width: 18 },
  gap10: { gap: 10 },
});

export default Confirm;
