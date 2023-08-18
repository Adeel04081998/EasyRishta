import {
  BackHandler,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Heading from '../../components/Texts/Heading';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../utils/icons';
import BasicText from '../../components/Texts/BasicText';
import firestore from '@react-native-firebase/firestore';
import { getEmail, sharedGetAllUsers, sharedSingleUser } from '../../components/sharedFunction/sharedFunction';
import ImageStore from '../../Mobx/mobxStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react';

const UserHome = ({ route }) => {
  const navigation = useNavigation();
  let logedInUser = ImageStore.logInUser
  const [userInfo, setUserInfo] = useState('')
  console.log("logg user", logedInUser);
  const fetchData = async () => {
    const email = await getEmail();
    ImageStore.setUserEmail(email);
    AsyncStorage.getItem('@userInfo').then(res => {
      if (res) { setUserInfo(JSON.parse(res)) }
    }).catch((err) => { console.log("errror", err); });
    sharedSingleUser('People',email)
    sharedGetAllUsers()
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress',handleBackButtonClick);
    fetchData()
    return () => {
      setUserInfo(null)
    };
  }, [])
  function handleBackButtonClick() {
    console.log("here");
    // navigation.navigate('Home');
    // if (route?.params?.asAdmin) {
    //   console.log("hy");
    //   navigation.goBack()

      
    // } else {
    //   navigation.goBack()
    // }
    BackHandler.exitApp()
    return true

  }


  const getLoginuser = () => {
    navigation.navigate('Notification');
  };
  const goToLogOut =async () => {
    // imageStor.setUserInfo(documentSnapshot?._data);
    ImageStore.setUserInfo(null);
    ImageStore.setUserEmail('');
    ImageStore.setLoginUser(null)
    ImageStore.setSenderId(null)
    ImageStore.setadminAddedUser(null)
    await AsyncStorage.clear();
navigation.navigate('SignIn')
// BackHandler.exitApp()


  };

  const gotoNotifications = () => {
    navigation.navigate('Notification');
  };

  const gotoMakeMatch = () => {
    if (Object.keys(ImageStore.allUsers).length) {
      console.log("hetree");
      AsyncStorage.getItem('@userInfo').then(res => {
        console.log("res root stack=>", JSON.stringify(res).userGender);
        // loginuser = res
        if (res) {
          navigation.navigate('MakeMatch', { loginedUser: JSON.parse(res) });
        } else {
          navigation.navigate('MakeMatch', { loginedUser: logedInUser });
        }
      });
    }


  };

  const gotoOtherProfile = () => {
    // navigation.navigate('OtherUsers');
    console.log(" logedInUser?.isAdminRole", logedInUser?.isAdminRole);
    AsyncStorage.getItem('@userInfo').then(res => {
      console.log("res root stack=>", JSON.stringify(res).userGender);
      // loginuser = res
      if (res) {
        navigation.navigate('OtherUsers', {
          loginedUser: JSON.parse(res),
          asAdmin: logedInUser?.isAdminRole ?? false
        });
      } else {
        navigation.navigate('OtherUsers', { loginedUser: logedInUser });
      }
    });
  };
  const gotoBuildProfile = () => {
    navigation.navigate('SignUp', {
      asAdmin: logedInUser?.isAdminRole ?? true
    });
  };
  const gotoContact = () => {
    navigation.navigate('ContactScreen');
  };
  const handleWhatsAppOpen = () => {
    const phoneNumber = '923005069491'; // Replace with the desired phone number
    let url =
      "whatsapp://send?text=" +
      "&phone=92" +
      "310 2731024";
    Linking.openURL(url)
      .then(data => {
        console.log("WhatsApp Opened successfully " + data);
      })
      .catch(() => {
        alert("Make sure WhatsApp installed on your device");
      });
  };
  const handleChatOpen = (screenName) => {
    __DEV__ ? navigation.navigate(screenName) : navigation.navigate(screenName);
  };
  const userBtnUi = () => {
    return (
      <>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '50%',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <TouchableOpacity
            style={styles.BottomButtons}
            onPress={gotoMakeMatch}>
            <View style={styles.ButtonImg}>
              <Image
                source={require('../../assets/images/Vector.png')}
                resizeMode="contain"
                style={styles.Img}
              />
            </View>
            <BasicText children="Match Make" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.BottomButtons}
            onPress={gotoOtherProfile}>
            <View style={styles.ButtonImg}>
              <Image
                source={require('../../assets/images/Vector2.png')}
                resizeMode="contain"
                style={styles.Img}
              />
            </View>
            <BasicText children="Other Profile" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.BottomButtons}
            onPress={gotoContact}>
            <View style={styles.ButtonImg}>
              <Image
                source={require('../../assets/images/Vector3.png')}
                resizeMode="contain"
                style={styles.Img}
              />
            </View>
            <BasicText children="Contact" color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '50%',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.BottomButtons}
            onPress={() => { handleWhatsAppOpen() }}
          >
            <View style={styles.ButtonImg}>
              <Image
                source={require('../../assets/images/Vector4.png')}
                resizeMode="contain"
                style={styles.Img}
              />
            </View>
            <BasicText children="Whatsapp" color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomButtons}
            onPress={() => gotoNotifications()}
          >
            <Icon
              type={'ionicon'}
              name="notifications-outline"
              size={40}
              color={'white'}
            // onPress={gotoNotifications}
            />
            <BasicText children="Notifications" color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomButtons}
            onPress={() => { handleChatOpen('Chat') }}
          >
            <View style={styles.ButtonImg}>
              <Image
                source={require('../../assets/images/Vector6.png')}
                resizeMode="contain"
                style={styles.Img}
              />
            </View>
            <BasicText children="Online Chat" color="white" />
          </TouchableOpacity>
        </View></>
    )
  }
  const adminBtnUi = () => {
    return (
      <>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '50%',
            // justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <TouchableOpacity
            style={styles.BottomButtons}
            onPress={gotoOtherProfile}>
            <View style={styles.ButtonImg}>
              <Image
                source={require('../../assets/images/Vector.png')}
                resizeMode="contain"
                style={styles.Img}
              />
            </View>
            <BasicText children="Users" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.BottomButtons}
            onPress={gotoBuildProfile}>
            <View style={styles.ButtonImg}>
              <Image
                source={require('../../assets/images/Vector2.png')}
                resizeMode="contain"
                style={styles.Img}
              />
            </View>
            <BasicText children="Make Profile" color="white" />
          </TouchableOpacity>

        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '50%',
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.BottomButtons}
            // onPress={() => { handleWhatsAppOpen }}
            onPress={() => { handleChatOpen('userContactList') }}
          >
            <View style={styles.ButtonImg}>
              <Image
                source={require('../../assets/images/Vector4.png')}
                resizeMode="contain"
                style={styles.Img}
              />
            </View>
            <BasicText children="Chat" color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomButtons}
            onPress={() => gotoNotifications()}
          >
            <Icon
              type={'ionicon'}
              name="notifications-outline"
              size={40}
              color={'white'}
            // onPress={gotoNotifications}
            />
            <BasicText children="Notifications" color="white" />
          </TouchableOpacity>
        </View>
      </>
    )
  }


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{
          flex: 1,
          paddingHorizontal: 25,
          paddingVertical: 15,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '10%',
          }}>
          <View></View>
          <View></View>
          <View></View>

          <Heading children={userInfo?.isAdminRole ? "Admin" : 'Home'} />
          <Icon
            type={'Octicons'}
            name="sign-out"
            size={30}
            color={'red'}
            onPress={goToLogOut}
            
          />
          <View></View>
        </View>
        <View
          style={{
            flex: 0.45,
            width: '100%',
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              borderRadius: 25,
              alignSelf: 'center',
              width: "100%",
              height: "100%"
            }}
            resizeMode='contain'
            source={require('../../assets/images/logo1.jpeg')}
          />
        </View>
        <ImageBackground
          style={{
            flex: 0.25,
            width: '100%',
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}
          source={require('../../assets/images/bg2.png')}>
          <Image
            style={{
              borderRadius: 25,
              alignSelf: 'center',
            }}
            source={require('../../assets/images/logo2.png')}
          />
        </ImageBackground>
        <View
          style={{
            flex: 0.3,
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: "center",
            alignSelf: 'center'
          }}>
          {userInfo?.isAdminRole || logedInUser?.isAdminRole ? adminBtnUi() : userBtnUi()}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  stretch: {
    width: '80%',
    height: '40%',
    alignSelf: 'center',
  },
  BottomButtons: {
    width: '30%',
    height: '80%',
    padding: 2,
    backgroundColor: '#ED225C',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10
  },
  ButtonImg: { width: '60%', height: '70%' },
  Img: { width: '100%', height: '100%' },
});

export default observer(UserHome);
