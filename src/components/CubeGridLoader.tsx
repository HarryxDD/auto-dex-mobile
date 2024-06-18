import { useEffect, useRef } from "react";
import { Animated, Modal, StyleSheet, View } from "react-native";

const CubeGridLoader = ({ visible }: { visible: boolean }) => {
  const animationValues = useRef(
    [...Array(9)].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = animationValues.map((value) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      )
    );

    const orderedAnimations = [
      animations[6], // bottom-left
      animations[7],
      animations[8], // bottom-right
      animations[3],
      animations[4],
      animations[5],
      animations[0], // top-left
      animations[1],
      animations[2], // top-right
    ];

    Animated.stagger(100, orderedAnimations).start();
  }, [animationValues]);

  const renderCubes = () => {
    return animationValues.map((animValue, index) => {
      const scale = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.3],
      });
      return (
        <Animated.View
          key={index}
          style={[
            styles.cube,
            {
              transform: [{ scale }],
            },
          ]}
        />
      );
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.grid}>
          {renderCubes().map((cube, index) => (
            <View key={index} style={styles.gridItem}>
              {cube}
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    width: 40,
    height: 40,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  gridItem: {
    width: "33.33%",
    height: "33.33%",
    justifyContent: "center",
    alignItems: "center",
  },
  cube: {
    width: 10,
    height: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
});

export default CubeGridLoader;
