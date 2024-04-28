import { Text, View } from "react-native";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

function Profile() {
  const { layout } = useTheme();

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <Text>Profile</Text>
      </View>
    </SafeScreen>
  );
}

export default Profile;
