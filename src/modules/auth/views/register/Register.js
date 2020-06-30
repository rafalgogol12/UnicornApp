import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { ScrollView } from "react-native-gesture-handler";
import Wrapper from "../../../../common/wrapper";
import Input from "../../../../common/input";
import { emailTestRegex } from "../../../../utils/Globals";
import RegisterStyles from "./styles";
import Button from "../../../../common/button/Button";
import { hasNumber } from "../../../../utils/Tools";
import { LOGIN_SCREEN } from "../../../../utils/GlobalRoutes";
import authActions from "../../redux/actions";
import { readFromStore, LOGGED_USER } from "../../../../utils/Storage";

const INITIAL_STATE = {
  email: "",
  emailValid: false,
  showEmailError: false,
  password: "",
  showPasswordError: false,
  passwordValid: false,
  name: "",
  nameValid: false,
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.initializeAction();
  }

  initializeAction = async () => {
    const { dispatch, navigation } = this.props;

    const user = await readFromStore(LOGGED_USER);

    if (user) {
      dispatch(authActions.loginUser(user, navigation));
    }
  };

  updateEmail = (email) => {
    const newEmail = email.trim();
    this.setState({ showEmailError: false, email: newEmail });
    if (emailTestRegex.test(newEmail) === true) {
      this.setState({ emailValid: true });
      return;
    }
    this.setState({ emailValid: false });
  };

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

  clearAction = () => {
    this.setState(INITIAL_STATE);
  };

  onRegisterAction = () => {
    const { email, name, password } = this.state;
    const { dispatch, navigation } = this.props;

    const credentials = {
      email,
      name,
      password,
    };

    dispatch(authActions.registerUser(credentials, navigation, this.clearAction));
  };

  onLoginAction = () => this.props.navigation.navigate(LOGIN_SCREEN);

  actionWhenStopTypingEmail = () => this.setState({ showEmailError: true });

  actionWhenStopTypingPass = () => this.setState({ showPasswordError: true });

  render() {
    const { keyboardIsVisible } = this.props;
    const {
      email,
      password,
      name,
      emailValid,
      showEmailError,
      nameValid,
      showPasswordError,
      passwordValid,
    } = this.state;
    const { containerStyles, contentStyles } = RegisterStyles;
    const validForm = emailValid && nameValid && passwordValid;

    return (
      <ScrollView contentContainerStyle={containerStyles} keyboardShouldPersistTaps="handled">
        <View style={contentStyles}>
          <Input
            placeholder="Email"
            value={email}
            onChangeValue={this.updateEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
            invalid={showEmailError && !emailValid && email !== ""}
            invalidText="Invalid email address"
            onTimeout={this.actionWhenStopTypingEmail}
            autoCapitalize="none"
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
          <Input
            placeholder="Name"
            value={name}
            onChangeValue={this.updateName}
            invalid={!nameValid && !!name}
            invalidText="Name must contain only letters"
            autoCapitalize="none"
          />
        </View>
        {!keyboardIsVisible && (
          <>
            <Button label="Register" onPress={this.onRegisterAction} disabled={!validForm} />
            <Button label="Login" onPress={this.onLoginAction} isEmpty />
          </>
        )}
      </ScrollView>
    );
  }
}

Register.defaultProps = {
  dispatch: () => null,
  keyboardIsVisible: false,
};

Register.propTypes = {
  dispatch: PropTypes.func,
  keyboardIsVisible: PropTypes.bool,
};

function mapStateToProps({ auth: { register } }) {
  return { register };
}

export default compose(Wrapper, connect(mapStateToProps))(Register);
