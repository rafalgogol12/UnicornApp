import { Dimensions } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;

// COLORS
export const WHITE = "rgb(255,255,255)";
export const BLACK = "rgb(29, 29, 29)";
export const PASTEL_BLUE = "rgb(127, 181, 243)";
export const REDDISH_PINK = "rgb(254, 79, 111)";
export const CHARCOAL_GREY = "rgb(170, 170, 170)";
export const TRANSPARENT = "transparent";

// CONSTS
export const GLOBAL_MEDIUM_SPACE = 11;
export const GLOBAL_BIG_SPACE = 17;
export const SPACE_INSIDE_INPUT = 20;
export const INPUT_HEIGHT = 64;
export const GLOBAL_RADIUS = 4;

export const GLOBAL_STYLES = {
  robotoRegular: {
    fontFamily: "Roboto-Regular",
  },
  robotoBold: {
    fontFamily: "Roboto-Bold",
  },
  latoRegular: {
    fontFamily: "Lato-Regular",
  },
  latoBold: {
    fontFamily: "Lato-Bold",
  },
};
