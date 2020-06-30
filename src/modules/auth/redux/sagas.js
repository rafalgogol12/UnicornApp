import { all, take, put, call } from "redux-saga/effects";
import { REGISTER_ACTION, LOGIN_ACTION } from "./actions";
import { REQUEST, SUCCESS, FAILURE } from "../../../base/redux/consts";
import { readFromStore, saveUsersToStore, USERS_KEY, saveLoggedUser } from "../../../utils/Storage";
import { PLAYER_SCREEN } from "../../../utils/GlobalRoutes";
import { Alert } from "react-native";

async function loginUser(user) {
  const users = await readFromStore(USERS_KEY);
  return new Promise((resolve, reject) => {
    const userExist = users && users.filter((item) => item.name === user.name && item.password === user.password);

    if (userExist.length > 0) {
      saveLoggedUser(user);
      return resolve(user);
    }
    return reject("User does't exist");
  });
}

function* watchLoginUser() {
  while (true) {
    const action = yield take(LOGIN_ACTION + REQUEST);

    try {
      const data = yield call(loginUser, action.user);
      yield put({
        type: LOGIN_ACTION + SUCCESS,
        data,
      });
      action.navigation.navigate(PLAYER_SCREEN);
    } catch (e) {
      yield put({
        type: LOGIN_ACTION + FAILURE,
        error: e,
      });
      Alert.alert(null, e, [
        {
          text: "OK",
          onPress: () => {},
        },
        { cancelable: false },
      ]);
    }
  }
}

async function registerUser(user) {
  const users = await readFromStore(USERS_KEY);
  return new Promise((resolve, reject) => {
    const userExist = users && users.filter((item) => item.email === user.email);
    if (userExist.length > 0) {
      reject("User exist");
    }
    saveUsersToStore(user);
    saveLoggedUser(user);
    resolve(user);
  });
}

function* watchRegisterUser() {
  while (true) {
    const action = yield take(REGISTER_ACTION + REQUEST);

    try {
      const data = yield call(registerUser, action.user);
      yield put({
        type: REGISTER_ACTION + SUCCESS,
        data,
      });
      action.onSuccess();
      action.navigation.navigate(PLAYER_SCREEN);
    } catch (e) {
      yield put({
        type: REGISTER_ACTION + FAILURE,
        error: e,
      });
      Alert.alert(null, e, [
        {
          text: "OK",
          onPress: () => {},
        },
        { cancelable: false },
      ]);
    }
  }
}

export function* watchAuthRequests() {
  yield all([watchRegisterUser(), watchLoginUser()]);
}
