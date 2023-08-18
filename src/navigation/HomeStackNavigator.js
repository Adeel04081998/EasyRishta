import React from 'react';
import UserId from '../screens/UserScreens/UserId';
import UserHome from '../screens/UserScreens/UserHome';
import ContactScreen from '../screens/UserScreens/ContactScreen';
import FilterScreen from '../screens/UserScreens/FilterScreen';
import MakeMatch from '../screens/UserScreens/MakeMatch';
import OtherUsers from '../screens/UserScreens/OtherUsers';
import OtherUsers2 from '../screens/UserScreens/OtherUsers2';
import Notification from '../screens/Notification/Notification';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MessagesScreen from '../screens/ChatMessageScreens/Messages';
import dummyChat from '../screens/ChatMessageScreens/dumyChat';
import DummyChat from '../screens/ChatMessageScreens/dumyChat';
import UserContactList from '../screens/ChatMessageScreens/UserContactList';

const Home = createNativeStackNavigator();

const HomeStackNavigator = props => {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Home.Screen name="UserHome" component={UserHome} />
      <Home.Screen name="UserId" component={UserId} />
      <Home.Screen name="ContactScreen" component={ContactScreen} />
      <Home.Screen name="FilterScreen" component={FilterScreen} />
      <Home.Screen name="MakeMatch" component={MakeMatch} />
      <Home.Screen name="OtherUsers" component={OtherUsers} />
      <Home.Screen name="OtherUsers2" component={OtherUsers2} />
      <Home.Screen name="Notification" component={Notification} />
      <Home.Screen name="Chat" component={DummyChat} />
      <Home.Screen name="userContactList" component={UserContactList} />
      

    </Home.Navigator>
  );
};

export default HomeStackNavigator;
