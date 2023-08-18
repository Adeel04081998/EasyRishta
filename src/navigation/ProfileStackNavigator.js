import React, {FunctionComponent, useEffect} from 'react';
import BuildProfile from '../screens/ProfileScreens/BuildProfile';
import ProfileTwo from '../screens/ProfileScreens/ProfileTwo';
import ProfileThree from '../screens/ProfileScreens/ProfileThree';
import ProfileFour from '../screens/ProfileScreens/ProfileFour';
import ProfileFive from '../screens/ProfileScreens/ProfileFive';
import ProfileSix from '../screens/ProfileScreens/ProfileSix';
import PictureScreen from '../screens/ProfileScreens/PictureScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';



const Profile = createNativeStackNavigator();

const ProfileStackNavigator = props => {
  return (
    <Profile.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Profile.Screen name="BuildProfile" component={BuildProfile} />
      <Profile.Screen name="ProfileTwo" component={ProfileTwo} />
      <Profile.Screen name="ProfileThree" component={ProfileThree} />
      <Profile.Screen name="ProfileFour" component={ProfileFour} />
      <Profile.Screen name="ProfileFive" component={ProfileFive} />
      <Profile.Screen name="ProfileSix" component={ProfileSix} />
      <Profile.Screen name="PictureScreen" component={PictureScreen} />
    </Profile.Navigator>
  );
};

export default ProfileStackNavigator;
