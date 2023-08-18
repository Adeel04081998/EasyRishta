import React from 'react';
import SignUpScreen from '../screens/AuthScreens/SignUpScreen';
import SignInScreen from '../screens/AuthScreens/SignInScreen';
import OtpScreen from '../screens/AuthScreens/OtpScreen';
import OtpVerification from '../screens/AuthScreens/OtpVerification';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BuildProfile from '../screens/ProfileScreens/BuildProfile';
import ProfileTwo from '../screens/ProfileScreens/ProfileTwo';
import ProfileThree from '../screens/ProfileScreens/ProfileThree';
// import splash from '../screens/splash';
import ProfileFour from '../screens/ProfileScreens/ProfileFour';
import ProfileFive from '../screens/ProfileScreens/ProfileFive';
import ProfileSix from '../screens/ProfileScreens/ProfileSix';
import PictureScreen from '../screens/ProfileScreens/PictureScreen';
import UserId from '../screens/UserScreens/UserId';
import UserHome from '../screens/UserScreens/UserHome';
import ContactScreen from '../screens/UserScreens/ContactScreen';
import FilterScreen from '../screens/UserScreens/FilterScreen';
import MakeMatch from '../screens/UserScreens/MakeMatch';
import OtherUsers from '../screens/UserScreens/OtherUsers';
import OtherUsers2 from '../screens/UserScreens/OtherUsers2';
import Notification from '../screens/Notification/Notification';
import firebase from '@react-native-firebase/app';
const Stack = createNativeStackNavigator();
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
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="splash" component={splash} /> */}
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="optScreen" component={OtpScreen} />
        <Stack.Screen name="verification" component={OtpVerification} />
        <Stack.Screen name="BuildProfile" component={BuildProfile} />
        <Stack.Screen name="ProfileTwo" component={ProfileTwo} />
        <Stack.Screen name="ProfileThree" component={ProfileThree} />
        <Stack.Screen name="ProfileFour" component={ProfileFour} />
        <Stack.Screen name="ProfileFive" component={ProfileFive} />
        <Stack.Screen name="ProfileSix" component={ProfileSix} />
        <Stack.Screen name="PictureScreen" component={PictureScreen} />
        <Stack.Screen name="UserId" component={UserId} />
        <Stack.Screen name="UserHome" component={UserHome} />
        <Stack.Screen name="ContactScreen" component={ContactScreen} />
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
        <Stack.Screen name="MakeMatch" component={MakeMatch} />
        <Stack.Screen name="OtherUsers" component={OtherUsers} />
        <Stack.Screen name="OtherUsers2" component={OtherUsers2} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
