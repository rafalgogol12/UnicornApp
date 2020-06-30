import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { REGISTER_SCREEN, LOGIN_SCREEN, PLAYER_SCREEN } from "../../utils/GlobalRoutes";
import Register from "../../modules/auth/views/register";
import Login from "../../modules/auth/views/login";
import Player from "../../modules/player/views";

const Stack = createStackNavigator();

function RootContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={REGISTER_SCREEN} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={REGISTER_SCREEN} component={Register} />
        <Stack.Screen name={LOGIN_SCREEN} component={Login} />
        <Stack.Screen name={PLAYER_SCREEN} component={Player} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootContainer;
