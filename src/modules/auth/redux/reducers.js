import { combineReducers } from "redux";
import { apiReducer } from "../../../base/redux/utils";
import { REGISTER_ACTION, LOGIN_ACTION } from "./actions";

export default combineReducers({
  register: apiReducer(REGISTER_ACTION),
  login: apiReducer(LOGIN_ACTION),
});
