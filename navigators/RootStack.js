import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderDashboard from "../shared/HeaderDashboard";
import { CredentialsContext } from "../components/CredentialsContext";

//Screens
import Splash from "../screens/Splash";
import AuthNavigationRoutes from "./AuthNavigationRoutes";
import DrawerNavigationRoutes from "./DrawerNavigationRoutes";
import TabNavigationRoutes from "./TabNavigationRoutes";

import { Colors } from "../components/styles";
const { primary, tertiary, green, brand } = Colors;
const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: tertiary,
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
            initialRouteName="AuthNavigationRoutes"
          >
            {storedCredentials ? (
              <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="DrawerNavigationRoutes"
                component={DrawerNavigationRoutes}
                initialParams={storedCredentials}
              />
              {/* <Stack.Screen
                options={{ headerShown: false }}
                name="TabNavigationRoutes"
                component={TabNavigationRoutes}
                initialParams={storedCredentials}
              /> */}
              </>
            ) : (
              <Stack.Screen
                options={{ headerShown: false }}
                name="AuthNavigationRoutes"
                component={AuthNavigationRoutes}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
