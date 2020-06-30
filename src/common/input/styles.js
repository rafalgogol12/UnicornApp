import { StyleSheet } from "react-native";
import {
  BLACK,
  REDDISH_PINK,
  GLOBAL_MEDIUM_SPACE,
  SPACE_INSIDE_INPUT,
  INPUT_HEIGHT,
  PASTEL_BLUE,
  GLOBAL_STYLES,
  WHITE,
  TRANSPARENT,
} from "../../utils/GlobalStyles";

const InputStyles = StyleSheet.create({
  containerStyles: {
    marginBottom: GLOBAL_MEDIUM_SPACE,
  },
  contentStyles: {
    flex: 1,
  },
  inputContainer: {
    borderColor: TRANSPARENT,
    borderWidth: 1,
    paddingHorizontal: SPACE_INSIDE_INPUT,
    height: INPUT_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: WHITE,
  },
  inputStyles: {
    ...GLOBAL_STYLES.robotoBold,
    fontSize: 15,
    color: BLACK,
    padding: 0,
    margin: 0,
    height: INPUT_HEIGHT,
  },
  inputFilledStyles: {
    paddingTop: 20,
  },
  labelStyles: {
    ...GLOBAL_STYLES.robotoRegular,
    top: 15,
    position: "absolute",
    color: PASTEL_BLUE,
    fontSize: 12,
    lineHeight: 15,
    textAlign: "left",
    alignSelf: "stretch",
  },
  invalidStyles: {
    borderColor: REDDISH_PINK,
  },
  invalidTextStyles: {
    ...GLOBAL_STYLES.robotoRegular,
    fontSize: 14,
    textAlign: "left",
    color: REDDISH_PINK,
  },
  focusStyles: {
    borderColor: PASTEL_BLUE,
  },
  focusLabelStyles: {
    color: PASTEL_BLUE,
  },
});

export default InputStyles;
