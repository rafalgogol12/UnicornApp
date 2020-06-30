import React, { PureComponent, Component } from "react";
import { Image, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";
import WrapperStyles from "./styles";

const BACKGROUND_SOURCE = require("../../assets/img/background.png");

const Wrapper = (WrappedComponent) => {
  class HOC extends Component {
    constructor(props) {
      super(props);

      this.state = {
        keyboardIsVisible: false,
      };
    }

    componentDidMount() {
      this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this.keyboardDidHide);
    }

    componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }

    keyboardDidShow = () => this.setState({ keyboardIsVisible: true });

    keyboardDidHide = () => this.setState({ keyboardIsVisible: false });

    render() {
      const { safeAreaStyles, backgroundStyles } = WrapperStyles;
      const { keyboardIsVisible } = this.state;

      return (
        <SafeAreaView style={safeAreaStyles}>
          <Image source={BACKGROUND_SOURCE} style={backgroundStyles} />
          <WrappedComponent {...this.props} keyboardIsVisible={keyboardIsVisible} />
        </SafeAreaView>
      );
    }
  }

  return HOC;
};

export default Wrapper;

// class Wrapper extends PureComponent {
//   state = {
//     keyboardIsVisible,
//   };

//   render() {
//     const { children } = this.props;
//     const { safeAreaStyles, backgroundStyles } = WrapperStyles;
//     return (
//       <SafeAreaView style={safeAreaStyles}>
//         <Image source={BACKGROUND_SOURCE} style={backgroundStyles} />
//         {children}
//       </SafeAreaView>
//     );
//   }
// }

// Wrapper.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default Wrapper;
