import AsyncStorage from "@react-native-community/async-storage";

export const USERS_KEY = "users";
export const LOGGED_USER = "loggedUser";

export const readFromStore = async (key) => {
  try {
    const val = await AsyncStorage.getItem(key);
    if (val) {
      return JSON.parse(val);
    }
    return null;
  } catch (e) {
    return e;
  }
};

export const saveUsersToStore = async (user) => {
  try {
    const users = (await readFromStore(USERS_KEY)) || [];
    users.push(user);

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    return e;
  }
};

export const saveLoggedUser = async (user) => {
  try {
    await AsyncStorage.setItem(LOGGED_USER, JSON.stringify(user));
  } catch (e) {
    return e;
  }
};
