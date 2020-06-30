import React from "react";
import { Provider } from "react-redux";
import createStore from "./base/redux/configureStore";
import rootSaga from "./base/redux/sagas";
import Root from "./base/navigation";

const store = createStore();
store.runSaga(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
