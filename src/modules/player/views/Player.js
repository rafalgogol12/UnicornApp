import React, { Component } from "react";
import { Text, View, Alert, Image, Platform, ActivityIndicator, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Video from "react-native-video";
import PropTypes from "prop-types";
import { compose } from "redux";
import Wrapper from "../../../common/wrapper";
import PlayerStyles from "./styles";
import Button from "../../../common/button/Button";
import { LOGGED_USER } from "../../../utils/Storage";
import { REGISTER_SCREEN } from "../../../utils/GlobalRoutes";
import authActions from "../../auth/redux/actions";

const unicornSource = require("../../../assets/img/unicorn.png");
const songUri = require("../../../../song.mp3");

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      loadingIndicator: false,
    };
  }

  logoutAction = async () => {
    const { dispatch, navigation } = this.props;
    dispatch(authActions.clearUser());
    await AsyncStorage.removeItem(LOGGED_USER);
    Alert.alert(null, "You are logged!", [
      {
        text: "OK",
        onPress: () => navigation.navigate(REGISTER_SCREEN),
      },
      { cancelable: false },
    ]);
  };

  onError = ({ error }) => {
    console.log("error", error);
  };

  onLoadStart = () => this.setState({ loadingIndicator: true });

  onLoad = () => this.setState({ loadingIndicator: false });

  onPlayPress = (playing) => {
    this.setState({
      playing: !playing,
    });
  };

  render() {
    const {
      login: { data },
    } = this.props;
    const { playing, loadingIndicator } = this.state;
    const {
      containerStyles,
      contentStyles,
      unicornStyles,
      titleStyles,
      playerContainer,
      playButtonContainer,
      playText,
      rowStyles,
      disabledStyles,
    } = PlayerStyles;
    const shouldRepeat = Platform.OS === "ios";

    const name = data && data.name;

    return (
      <View style={containerStyles}>
        <View style={contentStyles}>
          <Text style={titleStyles}>
            Welcome {name} to <Image source={unicornSource} style={unicornStyles} /> paradise!
          </Text>
          <View style={playerContainer}>
            {loadingIndicator && <ActivityIndicator />}
            <Video
              source={songUri}
              ref={(ref) => {
                this.player = ref;
              }}
              audioOnly
              volume={1.0}
              muted={false}
              paused={!playing}
              onError={this.onError}
              onLoadStart={this.onLoadStart}
              onLoad={this.onLoad}
              resizeMode="cover"
              repeat={shouldRepeat}
            />
            <View style={rowStyles}>
              <TouchableOpacity style={playButtonContainer} onPress={() => this.onPlayPress(playing)}>
                <Text style={playText}>{playing ? "Pause" : "Play"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[playButtonContainer, !playing && disabledStyles]}
                onPress={() => this.onPlayPress(true)}
                disabled={!playing}
              >
                <Text style={playText}>Stop</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Button label="Logout" onPress={this.logoutAction} />
      </View>
    );
  }
}

Player.defaultProps = {
  login: {},
  dispatch: () => {},
};

Player.propTypes = {
  login: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ auth: { login } }) {
  return { login };
}
export default compose(Wrapper, connect(mapStateToProps))(Player);
