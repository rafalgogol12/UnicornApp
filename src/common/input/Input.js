import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import InputStyles from "./styles";
import { PASTEL_BLUE } from "../../utils/GlobalStyles";

const VALIDATION_INTERVAL = 1000;

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
    };

    this.timeout = 0;
  }

  onChangeEvent = () => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.props.onTimeout != null) {
        this.props.onTimeout();
      }
    }, VALIDATION_INTERVAL);
  };

  onChange = (newValue) => {
    const { onChangeValue } = this.props;
    onChangeValue(newValue);
    this.onChangeEvent();
  };

  focusInput = () => {
    if (this.inputField) {
      this.inputField.focus();
      this.setState({ isFocus: true });
    }
  };

  onInputFocus = () => this.setState({ isFocus: true });

  onInputBlur = () => this.setState({ isFocus: false });

  render() {
    const {
      placeholder,
      value,
      secureTextEntry,
      invalidText,
      textContentType,
      keyboardType,
      autoCapitalize,
      invalid,
    } = this.props;
    const { isFocus } = this.state;

    const {
      containerStyles,
      inputContainer,
      focusStyles,
      invalidStyles,
      contentStyles,
      labelStyles,
      focusLabelStyles,
      inputStyles,
      inputFilledStyles,
      invalidTextStyles,
    } = InputStyles;

    return (
      <View style={containerStyles}>
        <TouchableWithoutFeedback
          style={[inputContainer, isFocus && focusStyles, value !== "" && focusStyles, invalid && invalidStyles]}
          onPress={this.focusInput}
        >
          <View style={contentStyles}>
            {value !== "" && (
              <Text style={[labelStyles, isFocus && focusLabelStyles, value !== "" && focusLabelStyles]}>
                {placeholder}
              </Text>
            )}
            <TextInput
              ref={(input) => {
                this.inputField = input;
              }}
              style={[inputStyles, value !== "" && inputFilledStyles]}
              placeholder={placeholder}
              placeholderTextColor={PASTEL_BLUE}
              value={value}
              onChangeText={this.onChange}
              textContentType={textContentType}
              keyboardType={keyboardType}
              returnKeyType="done"
              onBlur={this.onInputBlur}
              onFocus={this.onInputFocus}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry}
            />
          </View>
        </TouchableWithoutFeedback>
        {invalid && invalidText && <Text style={invalidTextStyles}>{invalidText}</Text>}
      </View>
    );
  }
}

Input.defaultProps = {
  invalid: false,
  secureTextEntry: false,
  placeholder: null,
  invalidText: null,
  textContentType: "none",
  keyboardType: "default",
  autoCapitalize: "words",
  onTimeout: () => null,
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  invalid: PropTypes.bool,
  placeholder: PropTypes.string,
  invalidText: PropTypes.string,
  textContentType: PropTypes.string,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  onTimeout: PropTypes.func,
};

export default Input;
