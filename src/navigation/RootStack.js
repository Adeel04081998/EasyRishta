import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStackNavigator from './AuthStackNavigator';
import FlashMessage from 'react-native-flash-message';
import HomeStackNavigator from './HomeStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from '@react-native-firebase/app';
import imageStore from '../Mobx/mobxStore';
import PictureScreen from '../screens/ProfileScreens/PictureScreen';
import { View } from 'react-native';

const RNfirebaseConfig = {
  apiKey: 'AIzaSyAhXXac2XWEuAXp9QNbrUTH67QPK_U3BTU',
  authDomain: 'easy-rishta-ac1e8.firebaseapp.com',
  projectId: 'easy-rishta-ac1e8',
  storageBucket: 'easy-rishta-ac1e8.appspot.com',
  messagingSenderId: '.....',
  appId:
    '1:1026839084152:android:0c25db9badd24842b0418d.apps.googleusercontent.com',
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(RNfirebaseConfig);
} else {
  app = firebase.app();
}

const Stack = createNativeStackNavigator();

const RootStack = (props) => {

  const navigationRef = useNavigationContainerRef();
  let isLoginUser = imageStore.logInUser ?? {}
  let isProfileAdded = isLoginUser?.isUserAddProfile ?? false
  const [user, setUser] = useState({})
  useEffect(() => {
    AsyncStorage.getItem('@userInfo').then(res => {
      let result = JSON.parse(res)
      if (result !== null) {
        result?.isAdminRole || result?.isUserAddProfile ? navigationRef.navigate('Home', { userInfo: result }) : navigationRef.navigate('Profile')
        setUser(JSON.parse(res))
      } else {
        AsyncStorage.getItem('@onboard').then(res => {
          let result1 = JSON.parse(res)
          if (result1 !== null) {
            navigationRef.navigate('Auth', { screen: 'Signup' });
          } else {
          }
        });
      }
    });


  }, []);

  const adminStack = () => {
    let isAuth = user?.userId ? true : false
  
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
        <Stack.Screen name="Home" component={HomeStackNavigator} />
        <Stack.Screen name="Profile" component={ProfileStackNavigator} />

      </Stack.Navigator>
    )
  }
  const userStack = () => {
    let isAuth = user?.userId ? true : false

    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user?.isUserAddProfile ? null : <Stack.Screen name="Auth" component={AuthStackNavigator} />}
        {/* {isAuth ? null : <Stack.Screen name="Auth" component={AuthStackNavigator} />} */}
        {user?.isUserAddProfile ? null : <Stack.Screen name="Profile" component={ProfileStackNavigator} />}
        <Stack.Screen name="Home" component={HomeStackNavigator} />
      </Stack.Navigator>
    )
  }


  return (
    <NavigationContainer ref={navigationRef}>
      {user?.isAdminRole ? adminStack() : userStack()}
      {/* <PictureScreen /> */}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default RootStack;
