import React, { FunctionComponent, useEffect } from 'react';
import SignUpScreen from '../screens/AuthScreens/SignUpScreen';
import SignInScreen from '../screens/AuthScreens/SignInScreen';
import OtpScreen from '../screens/AuthScreens/OtpScreen';
import OtpVerification from '../screens/AuthScreens/OtpVerification';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import imageStore from '../Mobx/mobxStore';


const Auth = createNativeStackNavigator();

const AuthStackNavigator = props => {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="optScreen"
        component={OtpScreen}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="verification"
        component={OtpVerification}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
};

export default AuthStackNavigator;
