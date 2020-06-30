import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import ButtonStyles from "./styles";

const Button = ({ label, onPress, isEmpty, disabled }) => {
  const { containerStyles, disabledStyles, onlyBorderStyles, textStyles } = ButtonStyles;

  return (
    <TouchableOpacity
      style={[containerStyles, isEmpty && onlyBorderStyles, disabled && disabledStyles]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  isEmpty: false,
  disabled: false,
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isEmpty: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
