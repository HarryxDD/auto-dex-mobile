import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { UiCol, UiRow } from "@/components";
import { EStrategyType } from "@/constants/strategy";
import {
  IconBasketDCA,
  IconLimitOrder,
  IconSingleToken,
  IconTWAP,
} from "@/theme/assets/icons/svg";
import { SHARED_STYLES } from "@/theme/shared";

const StrategyItem = ({
  title,
  desc,
  icon,
  onPress,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  onPress: () => void;
}) => {
  const { fonts, gutters, colors } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <UiRow
        style={[
          styles.strategyWrapper,
          { backgroundColor: colors.secondaryBlack },
        ]}
      >
        <UiCol.C
          style={[
            styles.iconWrapper,
            { backgroundColor: colors.charlestonGreen },
          ]}
        >
          {icon}
        </UiCol.C>
        <UiCol.X style={gutters.paddingRight_20}>
          <Text style={[fonts.size_16, fonts.bold, gutters.marginBottom_4]}>
            {title}
          </Text>
          <Text
            style={[fonts.semiBold, fonts.size_12, { color: colors.grayText }]}
          >
            {desc}
          </Text>
        </UiCol.X>
      </UiRow>
    </TouchableWithoutFeedback>
  );
};

function Strategy() {
  const { fonts, colors } = useTheme();

  const handleChooseDCA = (strategy: EStrategyType) => {
    console.log(123, strategy);
  };

  const handlePressLearnHow = () => {};

  return (
    <SafeScreen>
      <UiCol.X style={[SHARED_STYLES.screenPadding, styles.container]}>
        <StrategyItem
          title="Single token DCA"
          desc="Automatically buys a certain token based on pre-set parameters
                (time-based or price-based)"
          icon={<IconSingleToken />}
          onPress={() => handleChooseDCA(EStrategyType.SINGLE_TOKEN)}
        />
        <StrategyItem
          title="Limit Order"
          desc="Places an order to buy or sell at a specific price"
          icon={<IconLimitOrder />}
          onPress={() => handleChooseDCA(EStrategyType.LIMIT_ORDER)}
        />
        <StrategyItem
          title="TWAP"
          desc="Averages trades over time to minimize market impact"
          icon={<IconTWAP />}
          onPress={() => handleChooseDCA(EStrategyType.TWAP)}
        />
        <StrategyItem
          title="Basket DCA"
          desc="Automatically purchases multiple tokens over time based on pre-set parameters (time-based or price-based)"
          icon={<IconBasketDCA />}
          onPress={() => handleChooseDCA(EStrategyType.BASKET_DCA)}
        />
        <TouchableWithoutFeedback onPress={handlePressLearnHow}>
          <Text style={[fonts.bold, { color: colors.main }]}>
            Learn how it works?
          </Text>
        </TouchableWithoutFeedback>
      </UiCol.X>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 18,
  },
  strategyWrapper: {
    borderRadius: 12,
    padding: 16,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 16,
  },
});

export default Strategy;
