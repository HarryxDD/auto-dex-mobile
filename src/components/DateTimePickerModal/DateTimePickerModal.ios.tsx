import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useTheme } from "@/theme";
import { DateTimePickerIOSProps as Props } from "./DateTimePickerModal";

const DateTimePickerModal = (props: Props) => {
  const {
    date = new Date(),
    isVisible,
    onCancel,
    onConfirm,
    mode,
    ...rest
  } = props;
  const [currentDate, setCurrentDate] = useState(date);
  const { colors } = useTheme();

  const handleChange = (event: DateTimePickerEvent, dateValue?: Date) => {
    if (event.type === "dismissed" || !dateValue) {
      return;
    }
    setCurrentDate(dateValue);
  };

  return (
    <DateTimePicker
      themeVariant="light"
      style={{ backgroundColor: colors.white }}
      accentColor={colors.main}
      onChange={handleChange}
      value={currentDate}
      display="inline"
      mode={mode}
      {...rest}
    />
  );
};

export default DateTimePickerModal;
