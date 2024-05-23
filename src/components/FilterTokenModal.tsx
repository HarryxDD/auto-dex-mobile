import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { ForwardedRef, forwardRef } from "react";
import { ModalBackdrop } from "@/components/ModalBackdrop";
import { Text } from "react-native";
import { useTheme } from "@/theme";
import { UiCol } from "@/components";

interface Props extends Partial<BottomSheetModalProps> {}

export const FilterTokenModal = forwardRef(
  (props: Props, ref: ForwardedRef<BottomSheetModal>) => {
    const { containerStyle, snapPoints = ["40%"], ...rest } = props;
    const { colors } = useTheme();

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          enableContentPanningGesture={false}
          // handleIndicatorStyle={styles.indicator}
          backdropComponent={ModalBackdrop}
          snapPoints={snapPoints}
          keyboardBehavior="extend"
          // onDismiss={}
          handleComponent={null}
          backgroundStyle={{ backgroundColor: colors.purple50 }}
          {...rest}
        >
          <UiCol.C.X>
            <Text style={[{ color: colors.white }]}>Filter token modal!</Text>
          </UiCol.C.X>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);
