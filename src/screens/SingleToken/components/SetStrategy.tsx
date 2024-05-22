import { UiCol, UiRow } from "@/components";
import CollapsibleView from "@/components/CollapsibleComponent";
import {
  EConditionOperator,
  EStrategyFrequency,
  STRATEGY_FREQUENCIES,
} from "@/constants/strategy";
import { useTheme } from "@/theme";
import { IconBNB, QuestionMark, TrashCan } from "@/theme/assets/icons/svg";
import { useInput } from "@/theme/hooks/useInput";
import { SHARED_STYLES } from "@/theme/shared";
import { SetStateAction, useRef, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import {
  getSelectedDate,
  getSelectedTime,
} from "@/components/DateTimePickerModal/helper";
import { StrategyConditionModal } from "@/components/StrategyConditionModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const SetStrategy = ({
  singleTokenProgress,
  setSingleTokenProgress,
}: {
  singleTokenProgress: number;
  setSingleTokenProgress: React.Dispatch<SetStateAction<number>>;
}) => {
  const { fonts, colors, components, gutters } = useTheme();
  const [isShowAdvanceSetup, setIsShowAdvanceSetup] = useState<boolean>(false);
  const strategyConditionModalRef = useRef<BottomSheetModal>(null);
  const [inputs, setInputs] = useInput({
    searchValue: "",
    frequency: null,
    showDatePicker: false,
    showTimePicker: false,
    firstBatchDate: new Date(),
    firstBatchTime: new Date(),
    conditionOperator: EConditionOperator.BETWEEN,
  });
  const [selectedFrequency, setSelectedFrequency] = useState(
    EStrategyFrequency.DAILY
  );

  const handleMoveToNextStep = () => {
    setSingleTokenProgress(singleTokenProgress + 1);
  };

  const handleMoveToPreviousStep = () => {
    setSingleTokenProgress(singleTokenProgress - 1);
  };

  const handleConfirmFirstBatchTime = (mode: string, date: Date) => {
    setInputs(
      mode === "date"
        ? { firstBatchDate: date, showDatePicker: false }
        : { firstBatchTime: date, showTimePicker: false }
    );
  };

  const handleShowStrategyConditionModal = () => {
    Keyboard.dismiss();
    strategyConditionModalRef?.current?.present();
  };

  const handleSelectCondition = (condition: EConditionOperator) => {
    setInputs({ conditionOperator: condition });
  };

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

  const renderAmountEachBatchSection = () => (
    <UiCol style={styles.sectionWrapper}>
      <UiRow>
        <Text style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}>
          Amount each batch
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
          value={inputs.searchValue}
          onChangeText={(text) => {
            setInputs({ searchValue: text });
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

  const renderFrequencySection = () => (
    <UiCol style={styles.sectionWrapper}>
      <UiRow.L>
        <Text style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}>
          Frequency
        </Text>
        <Text
          style={[fonts.semiBold, fonts.size_18, { color: colors.grayText }]}
        >
          {" "}
          ⓘ
        </Text>
      </UiRow.L>
      <UiRow style={[SHARED_STYLES.flexWrap, gutters.marginTop_8]}>
        {STRATEGY_FREQUENCIES.map((frequency) => (
          <TouchableWithoutFeedback
            key={frequency.name}
            onPress={() => {
              setSelectedFrequency(frequency.name);
              setInputs({ frequency: frequency.value });
            }}
          >
            <UiCol.C
              style={[
                {
                  backgroundColor:
                    frequency.name === selectedFrequency
                      ? colors.main
                      : colors.charlestonGreen,
                },
                styles.frequencyItem,
              ]}
            >
              <Text
                style={[
                  {
                    color:
                      frequency.name === selectedFrequency
                        ? colors.white
                        : colors.grayText,
                  },
                ]}
              >
                {frequency.name}
              </Text>
            </UiCol.C>
          </TouchableWithoutFeedback>
        ))}
      </UiRow>
    </UiCol>
  );

  const renderFirstBatchTimeSection = () => (
    <UiCol style={styles.sectionWrapper}>
      <DateTimePickerModal
        isVisible={inputs.showTimePicker}
        date={inputs.firstBatchTime}
        mode="time"
        onConfirm={(date) => handleConfirmFirstBatchTime("time", date)}
        onCancel={() => setInputs({ showTimePicker: false })}
      />
      <DateTimePickerModal
        isVisible={inputs.showDatePicker}
        date={inputs.firstBatchDate}
        mode="date"
        onConfirm={(date) => handleConfirmFirstBatchTime("date", date)}
        onCancel={() => setInputs({ showDatePicker: false })}
      />
      <UiRow.L>
        <Text style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}>
          First batch time
        </Text>
        <Text style={[fonts.size_16, { color: colors.grayText }]}>
          {" "}
          (+7Hrs)
        </Text>
      </UiRow.L>
      <UiRow style={styles.firstBatchTimeItem}>
        <TouchableWithoutFeedback
          onPress={() => setInputs({ showDatePicker: true })}
        >
          <UiRow.LR.X
            style={[
              components.inputContainer,
              { backgroundColor: colors.charlestonGreen },
            ]}
          >
            <Text>{getSelectedDate(inputs.firstBatchDate)}</Text>
            <Ionicons
              name="calendar-outline"
              color={colors.grayText}
              size={18}
              style={gutters.marginTop_2}
            />
          </UiRow.LR.X>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => setInputs({ showTimePicker: true })}
        >
          <UiRow.C
            style={[
              components.inputContainer,
              { backgroundColor: colors.charlestonGreen },
            ]}
          >
            <Text style={gutters.marginRight_10}>
              {getSelectedTime(inputs.firstBatchTime)}
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
    </UiCol>
  );

  const renderAdvanceSetupSection = () => (
    <UiCol.LRT>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsShowAdvanceSetup(!isShowAdvanceSetup);
        }}
      >
        <UiRow.C style={styles.sectionWrapper}>
          <Text style={[gutters.marginRight_8, { color: colors.main }]}>
            Advance setup
          </Text>
          <Ionicons
            name={`chevron-${isShowAdvanceSetup ? "up" : "down"}-outline`}
            color={colors.main}
            size={18}
            style={gutters.marginTop_2}
          />
        </UiRow.C>
      </TouchableWithoutFeedback>
      {isShowAdvanceSetup && (
        <UiCol style={styles.sectionWrapper}>
          {/* Buy at market price if */}
          <UiCol style={styles.sectionWrapper}>
            <UiRow.L>
              <Text
                style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}
              >
                Buy at market price if
              </Text>
            </UiRow.L>
            <CollapsibleView title="Add condition" maxHeight={220}>
              <UiCol>
                <Text
                  style={[
                    fonts.size_14,
                    gutters.marginBottom_14,
                    { color: colors.ceil },
                  ]}
                >
                  Each batch (1.21 SOL) can buy
                </Text>
                <TouchableWithoutFeedback
                  onPress={handleShowStrategyConditionModal}
                >
                  <UiRow.C
                    style={[
                      components.inputContainer,
                      { backgroundColor: colors.charlestonGreen },
                      SHARED_STYLES.justifyContentBetween,
                    ]}
                  >
                    <UiCol style={styles.width18} />
                    <Text
                      style={[{ color: colors.white }, gutters.marginRight_10]}
                    >
                      {inputs.conditionOperator}
                    </Text>
                    <Ionicons
                      name="chevron-down-outline"
                      color={colors.main}
                      size={18}
                      style={gutters.marginTop_2}
                    />
                  </UiRow.C>
                </TouchableWithoutFeedback>
                <UiRow.LR style={gutters.marginTop_14}>
                  <UiRow.X
                    style={[
                      components.inputContainer,
                      { backgroundColor: colors.charlestonGreen },
                    ]}
                  >
                    <TextInput
                      style={[{ color: colors.white }, gutters.marginRight_10]}
                      placeholder="Value"
                      placeholderTextColor={colors.grayText}
                    />
                  </UiRow.X>
                  {inputs.conditionOperator === EConditionOperator.BETWEEN && (
                    <>
                      <Text style={gutters.marginHorizontal_20}>and</Text>
                      <UiRow.X
                        style={[
                          components.inputContainer,
                          { backgroundColor: colors.charlestonGreen },
                        ]}
                      >
                        <TextInput
                          style={[
                            { color: colors.white },
                            gutters.marginRight_10,
                          ]}
                          placeholder="Value"
                          placeholderTextColor={colors.grayText}
                        />
                      </UiRow.X>
                    </>
                  )}
                </UiRow.LR>
                <UiRow.L style={gutters.marginTop_14}>
                  <IconBNB
                    width={18}
                    height={18}
                    style={gutters.marginRight_2}
                  />
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
                </UiRow.L>
              </UiCol>
            </CollapsibleView>
          </UiCol>

          {/* Close pocket when reach */}
          <UiCol style={styles.sectionWrapper}>
            <UiRow.L>
              <Text
                style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}
              >
                Close pocket when reach
              </Text>
            </UiRow.L>
            <CollapsibleView title="Add end time" maxHeight={90}>
              <UiRow style={styles.gap10}>
                <UiRow.C.X
                  style={[
                    components.inputContainer,
                    { backgroundColor: colors.charlestonGreen },
                  ]}
                >
                  <Ionicons
                    name="search-outline"
                    color={colors.grayText}
                    size={18}
                  />
                  <TextInput
                    placeholder="Search"
                    value={inputs.searchValue}
                    onChangeText={(text) => {
                      setInputs({ searchValue: text });
                    }}
                    placeholderTextColor={colors.grayText}
                  />
                </UiRow.C.X>
                <TouchableWithoutFeedback>
                  <UiRow.C
                    style={[
                      components.inputContainer,
                      { backgroundColor: colors.charlestonGreen },
                    ]}
                  >
                    <Text
                      style={[
                        { color: colors.grayText },
                        gutters.marginRight_10,
                      ]}
                    >
                      00:00
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
            </CollapsibleView>
            <CollapsibleView title="Add target token amount" maxHeight={90}>
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
                  value={inputs.searchValue}
                  onChangeText={(text) => {
                    setInputs({ searchValue: text });
                  }}
                  style={styles.textInputStyle}
                  placeholderTextColor={colors.grayText}
                />
                <Text
                  style={[
                    fonts.semiBold,
                    fonts.size_14,
                    { color: colors.white },
                  ]}
                >
                  BNB
                </Text>
              </UiRow.C>
            </CollapsibleView>
            <CollapsibleView title="Add target SOL amount" maxHeight={90}>
              <Text>abc</Text>
            </CollapsibleView>
            <CollapsibleView
              title="Add target batches purchased"
              maxHeight={90}
            >
              <Text>abc</Text>
            </CollapsibleView>
          </UiCol>

          {/* Take Profit */}
          <UiCol style={styles.sectionWrapper}>
            <Text
              style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}
            >
              Take Profit
            </Text>
            <UiRow.L>
              <Text
                style={[
                  fonts.size_12,
                  gutters.marginVertical_10,
                  { color: colors.grayText },
                ]}
              >
                At fixed price target
              </Text>
              <QuestionMark
                style={[gutters.marginTop_2, gutters.marginLeft_2]}
              />
            </UiRow.L>
            <UiRow.C
              style={[
                components.inputContainer,
                { backgroundColor: colors.charlestonGreen },
              ]}
            >
              <IconBNB width={18} height={18} style={gutters.marginRight_2} />
              <TextInput
                placeholder="Input price take profit"
                value={inputs.searchValue}
                onChangeText={(text) => {
                  setInputs({ searchValue: text });
                }}
                style={styles.textInputStyle}
                placeholderTextColor={colors.grayText}
              />
              <Text
                style={[fonts.semiBold, fonts.size_14, { color: colors.white }]}
              >
                BNB
              </Text>
            </UiRow.C>
          </UiCol>

          {/* Stop Loss */}
          <UiCol style={styles.sectionWrapper}>
            <Text
              style={[fonts.semiBold, fonts.size_16, { color: colors.white }]}
            >
              Stop Loss
            </Text>
            <UiRow.L>
              <Text
                style={[
                  fonts.size_12,
                  gutters.marginVertical_10,
                  { color: colors.grayText },
                ]}
              >
                At fixed price stop loss
              </Text>
              <QuestionMark
                style={[gutters.marginTop_2, gutters.marginLeft_2]}
              />
            </UiRow.L>
            <UiRow.C
              style={[
                components.inputContainer,
                { backgroundColor: colors.charlestonGreen },
              ]}
            >
              <IconBNB width={18} height={18} style={gutters.marginRight_2} />
              <TextInput
                placeholder="Input price stop loss"
                value={inputs.searchValue}
                onChangeText={(text) => {
                  setInputs({ searchValue: text });
                }}
                style={styles.textInputStyle}
                placeholderTextColor={colors.grayText}
              />
              <Text
                style={[fonts.semiBold, fonts.size_14, { color: colors.white }]}
              >
                BNB
              </Text>
            </UiRow.C>
          </UiCol>

          <UiRow.C.X
            style={[
              components.secondaryBtn,
              gutters.paddingVertical_10,
              {
                borderColor: colors.red400,
                backgroundColor: `${colors.red400}17`,
              },
            ]}
          >
            <Text
              style={[
                { color: colors.red400 },
                gutters.marginRight_4,
                fonts.bold,
              ]}
            >
              Remove Advance Setup
            </Text>
            <TrashCan />
          </UiRow.C.X>
        </UiCol>
      )}
    </UiCol.LRT>
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
      <TouchableWithoutFeedback onPress={handleMoveToNextStep}>
        <UiRow.C.X style={[components.primaryBtn, gutters.paddingVertical_10]}>
          <Text style={[{ color: colors.white }, fonts.bold]}>Continue</Text>
        </UiRow.C.X>
      </TouchableWithoutFeedback>
    </UiRow.LR>
  );

  return (
    <>
      <StrategyConditionModal
        ref={strategyConditionModalRef}
        selectedCondition={inputs.conditionOperator}
        onSelectCondition={handleSelectCondition}
      />
      <ScrollView>
        <UiCol.LRT style={[SHARED_STYLES.screenPadding, gutters.marginTop_10]}>
          {renderDCAPairSection()}
          {renderAmountEachBatchSection()}
          {renderFrequencySection()}
          {renderFirstBatchTimeSection()}
          {renderAdvanceSetupSection()}
          {renderScreenButtons()}
        </UiCol.LRT>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
  sectionWrapper: {
    marginBottom: 30,
  },
  textInputStyle: {
    flex: 1,
    paddingVertical: 1,
    marginLeft: 6,
  },
  frequencyItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    marginVertical: 7,
    borderRadius: 20,
  },
  firstBatchTimeItem: {
    gap: 10,
    marginTop: 16,
  },
  buttonWrapper: {
    gap: 16,
  },
  width18: { width: 18 },
  gap10: { gap: 10 },
});

export default SetStrategy;
