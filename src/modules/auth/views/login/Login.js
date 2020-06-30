import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { ScrollView } from "react-native-gesture-handler";
import Wrapper from "../../../../common/wrapper";
import Input from "../../../../common/input";
import { hasNumber } from "../../../../utils/Tools";
import LoginStyles from "./styles";
import Button from "../../../../common/button/Button";
import authActions from "../../redux/actions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      nameValid: false,
      showPasswordError: false,
      passwordValid: false,
    };
  }

  updatePassword = (password) => {
    this.setState({ showPasswordError: false, password });
    if (password.length < 6) {
      this.setState({ passwordValid: false });
      return;
    }

    this.setState({ passwordValid: true });
  };

  updateName = (name) => {
    this.setState({ name });
    if (hasNumber(name)) {
      this.setState({ nameValid: false });
      return;
    }

    this.setState({ nameValid: true });
  };

  onLoginAction = () => {
    const { dispatch, navigation } = this.props;
    const { name, password } = this.state;
    const user = { name, password };

    dispatch(authActions.loginUser(user, navigation));
  };

  render() {
    const { keyboardIsVisible } = this.props;
    const { name, nameValid, password, showPasswordError, passwordValid } = this.state;
    const { containerStyles, contentStyles } = LoginStyles;
    const valid = nameValid && passwordValid;

    return (
      <ScrollView contentContainerStyle={containerStyles} keyboardShouldPersistTaps="handled">
        <View style={contentStyles}>
          <Input
            placeholder="Name"
            value={name}
            onChangeValue={this.updateName}
            invalid={!nameValid && !!name}
            invalidText="Name must contain only letters"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeValue={this.updatePassword}
            secureTextEntry
            invalid={showPasswordError && !passwordValid && !!password}
            onTimeout={this.actionWhenStopTypingPass}
            textContentType="password"
            invalidText="Password must contain min 6 chars"
          />
        </View>
        {!keyboardIsVisible && <Button label="Login" onPress={this.onLoginAction} disabled={!valid} />}
      </ScrollView>
    );
  }
}

Login.defaultProps = {
  dispatch: () => null,
  keyboardIsVisible: false,
};

Login.propTypes = {
  dispatch: PropTypes.func,
  keyboardIsVisible: PropTypes.bool,
};

function mapStateToProps({ auth: { login } }) {
  return { login };
}

export default compose(Wrapper, connect(mapStateToProps))(Login);
