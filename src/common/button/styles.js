import { StyleSheet } from "react-native";
import {
  INPUT_HEIGHT,
  PASTEL_BLUE,
  GLOBAL_BIG_SPACE,
  TRANSPARENT,
  WHITE,
  GLOBAL_STYLES,
  CHARCOAL_GREY,
} from "../../utils/GlobalStyles";

const ButtonStyles = StyleSheet.create({
  containerStyles: {
    height: INPUT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginTop: GLOBAL_BIG_SPACE,
    backgroundColor: PASTEL_BLUE,
  },
  disabledStyles: {
    backgroundColor: CHARCOAL_GREY,
  },
  textStyles: {
    ...GLOBAL_STYLES.robotoBold,
    fontSize: 16,
    color: WHITE,
  },
  onlyBorderStyles: {
    backgroundColor: TRANSPARENT,
    borderWidth: 1,
    borderColor: PASTEL_BLUE,
  },
});

export default ButtonStyles;
