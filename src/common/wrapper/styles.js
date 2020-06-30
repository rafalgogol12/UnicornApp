import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../utils/GlobalStyles";

const WrapperStyles = StyleSheet.create({
  safeAreaStyles: {
    flex: 1,
    position: "relative",
  },
  containerStyles: {
    flex: 1,
  },
  backgroundStyles: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    resizeMode: "cover",
    opacity: 0.9,
  },
});

export default WrapperStyles;
