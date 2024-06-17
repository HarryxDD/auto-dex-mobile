/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScrollView, StyleSheet, Text } from "react-native";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { UiCol, UiRow } from "@/components";
import { RouteProp, useRoute } from "@react-navigation/native";
import { MainParamList } from "@/types/navigation";
import { PocketItemSection } from "@/components/PocketItemSection";
import { SHARED_STYLES } from "@/theme/shared";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MachineService } from "@/libs/services/machine.service";
import { PoolEntity } from "@/libs/entities/pool.entity";
import { useToken } from "@/hooks/useToken";
import { truncateAddress } from "@/utils/helpers/string";
import { convertHoursToDurationsTime, extractAveragePrice } from "@/utils";
import { convertDecimal } from "@/libs/entities/machine.entity";
import BigDecimal from "js-big-decimal"

import moment from "moment";

function PocketDetail() {
  const { colors, fonts, gutters } = useTheme();
  const { params } =
    useRoute<RouteProp<MainParamList, "SCREEN_POCKET_DETAIL">>();
  const { pocketId } = params || {};
  const [pool, setPool] = useState<PoolEntity>();
  const { whiteListedTokens } = useToken();

  const baseToken = useMemo(() => {
    return whiteListedTokens.find((token) => token.address === pool?.baseTokenAddress);
  }, [pool]);

  const targetToken = useMemo(() => {
    return whiteListedTokens.find((token) => token.address === pool?.targetTokenAddress);
  }, [pool]);

  useEffect(() =>  {
    if (!pocketId) return;
    new MachineService().getMachine(String(pocketId))
      .then((res) => {
        if (res) {
          setPool(res);
        }
      })
      .catch((err) => {
        console.log(err);
      }); 
  }, [pocketId]);

  const handleRenderFrequency = useCallback(() => {
    let convertedHours = pool?.frequency?.hours;
    if (pool?.frequency?.seconds) {
      convertedHours = (pool?.frequency?.seconds || 0) / 3600;
    }

    const res = convertHoursToDurationsTime(convertedHours);
    if (res.hours) {
      if (res.hours === 1) {
        return "hourly";
      } 
        return `every ${res.hours} hours`;
      
    } if (res.days) {
      if (res.days === 1) {
        return "daily";
      } 
        return `every ${res.days} days`;
      
    } if (res.weeks) {
      if (res.weeks === 1) {
        return "weekly";
      } 
        return `every ${res.weeks} weeks`;
      
    } if (res.months) {
      if (res.months === 1) {
        return "monthly";
      } 
        return `every ${res.months} months`;
      
    } if (res.years) {
      if (res.years === 1) {
        return "yearly";
      } 
        return `every ${res.years} years`;
    }

    return "daily";
  }, [pool, pocketId]);

  const renderProgressSection = () => (
    <UiCol>
      <Text
        style={[
          fonts.bold,
          fonts.size_16,
          gutters.marginBottom_10,
          { color: colors.white },
        ]}
      >
        Progress
      </Text>
      <UiCol
        style={[{ backgroundColor: colors.secondaryBlack }, styles.container]}
      >
        <PocketItemSection
          title="Total invested"
          value={
            `${convertDecimal(pool?.currentSpentBaseToken?.toString())} ${baseToken?.symbol}`
          } />
        <PocketItemSection title="Batch bought" value={`${pool?.currentBatchAmount} BATCHES`} />
        <PocketItemSection title="Token hold">
          <UiCol.R>
            <Text style={[fonts.semiBold, { color: colors.white }]}>
              1 {baseToken?.symbol} = {extractAveragePrice(baseToken, baseToken)} {targetToken?.symbol}
            </Text>
            <Text style={[fonts.semiBold, { color: colors.white }]}>
              1 {targetToken?.symbol} = {extractAveragePrice(targetToken, baseToken)} {baseToken?.symbol}
            </Text>
          </UiCol.R>
        </PocketItemSection>
        <PocketItemSection title="Tokens hold">
          <UiCol.R>
            <Text style={[fonts.semiBold, { color: colors.white }]}>
              {`${convertDecimal(
                new BigDecimal(pool?.depositedAmount?.toString() || "0").subtract(
                  new BigDecimal(pool?.currentSpentBaseToken?.toString() || "0")
                ).getValue().toString(
                )
              )} ${baseToken?.symbol}`}
            </Text>
            <Text style={[fonts.semiBold, { color: colors.white }]}>
              {`${convertDecimal(pool?.currentReceivedTargetToken?.toString())} ${targetToken?.symbol}`}
            </Text>
          </UiCol.R>
        </PocketItemSection>
        <PocketItemSection title="APL (ROI)">
          <Text style={[fonts.semiBold, { color: (pool?.currentROI || 0) < 0 ? colors.red400 : colors.ufoGreen }]}>
            {`${pool?.currentROIValue || 0}`} {baseToken?.symbol} ({`${pool?.currentROI?.toFixed(2) || 0}`}%)
          </Text>
        </PocketItemSection>
      </UiCol>
    </UiCol>
  );

  const renderNextBatchSection = () => (
    <UiCol>
      <Text
        style={[
          fonts.bold,
          fonts.size_16,
          gutters.marginBottom_10,
          { color: colors.white },
        ]}
      >
        Next batch
      </Text>
      <UiCol
        style={[{ backgroundColor: colors.secondaryBlack }, styles.container]}
      >
        <PocketItemSection title="Next batch time" value={moment(pool?.nextExecutionAt || new Date()).format("DD/MM/YYYY HH:mm")} />
        <PocketItemSection title="Outstanding deposit" value={`${convertDecimal(pool?.remainingBaseTokenBalance || 0)} ${baseToken?.symbol}`} />
      </UiCol>
    </UiCol>
  );

  const renderPoolInfoSection = () => (
    <UiCol>
      <Text
        style={[
          fonts.bold,
          fonts.size_16,
          gutters.marginBottom_10,
          { color: colors.white },
        ]}
      >
        Pool info
      </Text>
      <UiCol
        style={[{ backgroundColor: colors.secondaryBlack }, styles.container]}
      >
        <PocketItemSection
          title="Total deposited"
          value={`${convertDecimal(pool?.depositedAmount)} ${baseToken?.symbol}`}
        />
        <PocketItemSection
          title="Start date"
          value={`${moment(pool?.startTime).format("DD/MM/YYYY HH:mm")}`}
        />
      </UiCol>
    </UiCol>
  );

  const renderEndConditionSection = () => (
    <UiCol>
      <Text
        style={[
          fonts.bold,
          fonts.size_16,
          gutters.marginBottom_10,
          { color: colors.white },
        ]}
      >
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
      <Text
        style={[
          fonts.bold,
          fonts.size_16,
          gutters.marginBottom_10,
          { color: colors.white },
        ]}
      >
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
      <Text
        style={[
          fonts.bold,
          fonts.size_16,
          gutters.marginBottom_10,
          { color: colors.white },
        ]}
      >
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
          <UiRow.LR
            style={[
              { backgroundColor: colors.charlestonGreen },
              styles.chainInfo,
            ]}
          >
            <UiCol>
              <Text style={[fonts.bold, { color: colors.white }]}>{targetToken?.symbol}/{baseToken?.symbol}</Text>
              <Text style={[{ color: colors.grayText }, fonts.size_12]}>
                Uniswap
              </Text>
            </UiCol>
            <Text style={[{ color: colors.white }]}>#{truncateAddress(pool?._id || pool?.id || "")}</Text>
          </UiRow.LR>
          <PocketItemSection
            title="Strategy"
            value={`${convertDecimal(pool?.batchVolume?.toString())} ${targetToken?.symbol} ${handleRenderFrequency()}`}
            containerStyle={gutters.marginBottom_16}
          />
          {renderProgressSection()}
          {renderNextBatchSection()}
          {renderPoolInfoSection()}
          {/* {renderEndConditionSection()}
          {renderTPSLSection()} */}
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
