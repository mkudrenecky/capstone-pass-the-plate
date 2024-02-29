import React from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./components/landing/Landing";
import Details from "./components/loginSignup/Details";
import MainApp from "./components/drawer/DrawerNav";
import PasswordReset from "./components/loginSignup/PasswordReset";
import SettingsNav from "./components/settingsPage/Settings";
import EditProfile from "./components/editProfile/editProfileMain";
import mapView from "./components/map/mapMain";
import { AuthProvider } from "./context/AuthContext";
import { AppStateProvider } from "./context/AppStateContext";
import MainStack from "./components/mainStackNav/MainStack";
import { RootSiblingParent } from 'react-native-root-siblings';

// Import the SliderProvider from your context file
import { SliderProvider } from './context/MapContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AppStateProvider>
      <RootSiblingParent>
        <View style={{ flex: 1 }}>
          <StatusBar />
          <AuthProvider>
            {/* Wrap the NavigationContainer with the SliderProvider */}
            <SliderProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="Landing"
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="Landing" component={Landing} />
                  <Stack.Screen name="Details" component={Details} />
                  <Stack.Screen name="MainApp" component={MainApp} />
                  <Stack.Screen name="PasswordReset" component={PasswordReset} />
                  <Stack.Screen name="Settings" component={SettingsNav} />
                  <Stack.Screen name="EditProfile" component={EditProfile} />
                  <Stack.Screen name="mapView" component={mapView} />
                  <Stack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />
                </Stack.Navigator>
              </NavigationContainer>
            </SliderProvider>
          </AuthProvider>
        </View>
      </RootSiblingParent>
    </AppStateProvider>
  );
};

export default App;
