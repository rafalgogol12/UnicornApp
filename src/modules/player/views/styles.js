import { StyleSheet } from "react-native";
import { GLOBAL_BIG_SPACE, GLOBAL_STYLES, WHITE, SCREEN_WIDTH, GLOBAL_MEDIUM_SPACE } from "../../../utils/GlobalStyles";

const PlayerStyles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    padding: GLOBAL_BIG_SPACE,
  },
  contentStyles: {
    flex: 1,
    alignItems: "center",
  },
  titleStyles: {
    ...GLOBAL_STYLES.latoBold,
    color: WHITE,
    textAlign: "center",
    fontSize: 23,
    marginTop: GLOBAL_BIG_SPACE * 3,
  },
  unicornStyles: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  playerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: GLOBAL_BIG_SPACE,
    width: SCREEN_WIDTH - GLOBAL_BIG_SPACE * 2,
  },
  playButtonContainer: {
    padding: GLOBAL_MEDIUM_SPACE,
    width: 100,
  },
  playText: {
    ...GLOBAL_STYLES.robotoBold,
    color: WHITE,
    fontSize: 22,
    textAlign: "center",
  },
  rowStyles: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledStyles: {
    opacity: 0.6,
  },
});

export default PlayerStyles;
