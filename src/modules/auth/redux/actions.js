import { REQUEST, CLEAR } from "../../../base/redux/consts";

export const REGISTER_ACTION = "REGISTER_ACTION";
export const LOGIN_ACTION = "LOGIN_ACTION";

const authActions = {
  registerUser: (user, navigation, onSuccess) => {
    return {
      type: REGISTER_ACTION + REQUEST,
      user,
      navigation,
      onSuccess,
    };
  },
  loginUser: (user, navigation) => {
    return {
      type: LOGIN_ACTION + REQUEST,
      user,
      navigation,
    };
  },
  clearUser: () => {
    return {
      type: LOGIN_ACTION + CLEAR,
    };
  },
};

export default authActions;
