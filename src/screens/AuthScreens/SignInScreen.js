import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { hideMessage, showMessage } from 'react-native-flash-message';
import React, { useState, useEffect } from 'react';
import Heading from '../../components/Texts/Heading';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import BasicText from '../../components/Texts/BasicText';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import imageStore from '../../Mobx/mobxStore';
import { adminUser } from '../../../utils/dummyData';
import { Observer, observer } from 'mobx-react';
import { sharedFcmToken } from '../../components/sharedFunction/sharedFunction';
import messaging from '@react-native-firebase/messaging';

// adeelfareed202@gmail.com
// Test@123456
const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(__DEV__ ? "Easyrishta3@gmail.com" : "");
  const [password, setPassword] = useState(__DEV__ ? "Pakistan@99" : "");

  const checkEmail = (e, check) => {
    if (e.nativeEvent == undefined) {
      setEmail(e);
      if (check == true) {
        if (checkEmailValidation(e)) {
          return true;
        }
      }
    } else {
      checkEmailValidation(e.nativeEvent.text?.trim());
    }
  };
  const checkEmailValidation = e => {

    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    if (reg.test(e) === false) {
      showMessage({
        message:
          'Your Email is not correct! make sure @gmail.com included into your email.',
        type: 'danger',
        titleStyle: { fontSize: 13 },
      });
      return false;
    } else {
      if (e.includes('@gmail.com')) {
        console.log("herew");
        setEmail(e);
        return true;
      } else {
        showMessage({
          message:
            'Your Email is not correct! make sure @gmail.com included into your email.',
          type: 'danger',
          titleStyle: { fontSize: 13 },
        });
      }
    }
  };
  //
  //
  //
  const checkPassword = (e, check) => {
    if (e.nativeEvent == undefined) {
      setPassword(e);
      if (check == true) {
        if (passwordValidation(e)) {
          return true;
        }
      }
    } else {
      passwordValidation(e.nativeEvent.text?.trim());
    }
  };
  const passwordValidation = e => {

    var passw =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    console.log("passw.test(e)", passw.test(e));
    if (!passw.test(e)) {
      console.log("33", e);
      showMessage({
        message:
          'Add password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character..',
        type: 'danger',
        duration: 2960,
        titleStyle: { fontSize: 13 },
      });
      return false;
    } else {
      console.log("her pas");
      setPassword(e);
      return true;
    }
  };
  //
  //
  //
  const goToForget = () => {
    navigation.navigate('optScreen');
  };
  //
  //
  //
  const goToSignUp = () => {
    __DEV__ ? navigation.navigate('SignUp') : navigation.navigate('optScreen');
    // navigation.navigate('optScreen')
  };
  const goToProfile = async () => {
    if (email && password) {
      console.log("if email 1 ", email);
      console.log("if password 2", password);
      if (checkEmail(email, true)) {
        if (checkPassword(password, true)) {
          auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
              console.log('Res-=-=>', res);
              imageStore.setSenderId(res?.user?.email)
              if (res?.user?.emailVerified == false) {
                showMessage({
                  message:
                    'Your Email is not verified! Please verifiy your email.',
                  type: 'danger',
                  titleStyle: { fontSize: 13 },
                });
              } else {
                firestore()
                  .collection('EasyRishta')
                  .doc('Community')
                  .collection('People')
                  .doc(email)
                  .get()
                  .then(async documentSnapshot => {
                    console.log('docc', documentSnapshot?._data?.isAdminRole);
                    if (documentSnapshot?._data) {

                      __DEV__ ? getFcmToken(documentSnapshot?._data) : getFcmToken(documentSnapshot?._data)
                      imageStore.setUserInfo(documentSnapshot?._data);
                      imageStore.setUserEmail(email);
                      imageStore.setLoginUser(documentSnapshot?._data)
                      await AsyncStorage.setItem('@email', email)
                      await AsyncStorage.setItem('@userInfo', JSON.stringify(documentSnapshot?._data),).then(() => {
                        documentSnapshot?._data?.isAdminRole || documentSnapshot?._data?.isUserAddProfile ? navigation.navigate('Home', { userInfo: documentSnapshot?._data }) : navigation.navigate('Profile')
                      });
                    }
                  }).catch((err) => {
                    console.log("error", err);
                    showMessage({
                      message: "Your Email or Password didn't match.",
                      type: 'danger',
                      titleStyle: { fontSize: 13 },
                    })
                  });
              }
            })
            .catch(error => {
              console.log("error", error);
              showMessage({
                message: error?.code,
                type: 'danger',
                titleStyle: { fontSize: 13 },
              })
            });
        }
      }
    } else {
      showMessage({
        message: "Your Email or Password didn't match.",
        type: 'danger',
        titleStyle: { fontSize: 13 },
      });
    }
  };

  //
  const goToOtp = () => {
    navigation.navigate('optScreen');
  };
  const getFcmToken = async (user) => {
    messaging().getToken().then((res) => {
      let userFcmObj = {
        token: res,
        userEmail: user?.userEmail
      }
      sharedFcmToken(userFcmObj, user?.userEmail)
    }).catch((err) => {
      console.log("err token firbase", err);
      showMessage({
        message: "Donot get Notification Token",
        type: 'danger',
        titleStyle: { fontSize: 13 },
      });
    })
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{ flex: 1 }}>
        <Image
          style={styles.stretch}
          source={require('../../assets/images/logo.png')}
        />
        <View style={{ paddingHorizontal: 25 }}>
          <Heading children="Login" />
          <CustomTextInput
            placeholder="Email*"
            style={{ marginVertical: 10 }}
            value={email}
            onChange={e => checkEmail(e)}
          />
          <CustomTextInput
            placeholder="Password*"
            style={{ marginVertical: 10 }}
            value={password}
            onChange={e => checkPassword(e)}
          />
          <BasicText
            children="Forgot Password?"
            color="#ED225C"
            marginVertical={15}
            textAlign={'right'}
            onPress={goToForget}
          />
          <CustomButton
            children="Login"
            width="100%"
            color="white"
            backgroundColor={'#ED225C'}
            onPress={goToProfile}
          />
          <View style={styles.BottomTextView}>
            <BasicText children="New User?" marginHorizontal={5} />
            <BasicText
              children="Sign up"
              color="#ED225C"
              onPress={goToSignUp}
            />
          </View>
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
  BottomTextView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
});

export default observer(SignInScreen);