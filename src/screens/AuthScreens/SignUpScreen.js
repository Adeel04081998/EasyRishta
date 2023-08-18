import { Alert, BackHandler, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import React, { useEffect, useState } from 'react';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import Heading from '../../components/Texts/Heading';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageStore from '../../Mobx/mobxStore';
import { adminUser } from '../../../utils/dummyData';
import Icon from '../../../utils/icons';
import { observer } from 'mobx-react';
// import Icon from 'react-native-vector-icons/FontAwesome';

let idd = new Date().getTime().toString();
const SignUpScreen = ({ route }) => {
  const navigation = useNavigation();
  let userMobileNo = route.params?.userMobileNo ?? ''

  const [isActive, setIsActive] = useState();
  const [isActive2, setIsActive2] = useState(false);
  const [Gender, setGender] = useState();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState(__DEV__ ? 'Easyrishta3@gmail.com' : '');
  const [Password, setPassword] = useState(__DEV__ ? 'Pakistan@99' : '');
  const [Mobile, setMobile] = useState(userMobileNo);

  // const ONE_SECOND_IN_MS = 200;
  let logedInUser = imageStore.logInUser ?? {}
  console.log("login user", logedInUser);

  const selectGender = () => {
    setIsActive(true);
    setGender('Male');
    setIsActive2(false);
  };
  const selectGender2 = () => {
    setIsActive(false);
    setIsActive2(true);
    setGender('Female');
  };

  const goToOtp = () => {
    navigation.navigate('optScreen');
  };
  const goToSign = () => {
    navigation.navigate('SignIn');
  };

  //Name Validation Start
  const FirstnameValidation = e => {
    console.log('Ep--=>', e);
    if (e.nativeEvent == undefined) {
      setFirstName(e);
    } else {
      setFirstName(e.nativeEvent.text?.trim());
    }
  };
  const LastnameValidation = e => {
    console.log('Ep--=>', e);
    if (e.nativeEvent == undefined) {
      setLastName(e);
    } else {
      setLastName(e.nativeEvent.text?.trim());
    }
  };

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
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    console.log("reg test", reg.test(e));
    if (reg.test(e) === false) {
      console.log('Email is Not Correct');
      // Vibration.vibrate(1 * ONE_SECOND_IN_MS);
      showMessage({
        message:
          'Your Email is not correct! make sure @gmail.com included into your email.',
        type: 'danger',
        titleStyle: { fontSize: 13, position: 'absolute' },
      });
      console.log('showMessage--->>', showMessage);
      return false;
    } else {
      console.log("else");
      if (e.includes('@gmail.com')) {
        setEmail(e);
        return true;
      }
    }
  };
  //Email Validation End
  //
  //
  //
  //Password Validation Start
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
    if (passw.test(e) == false) {
      // Vibration.vibrate(1 * ONE_SECOND_IN_MS);
      showMessage({
        message:
          'Add password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character..',
        type: 'danger',
        duration: 2960,
        titleStyle: { fontSize: 13 },
      });
      return false;
    } else {
      setPassword(e);
      return true;
    }
  };

  const checkPhoneNumber = (e, check) => {
    console.log('EE-=-=>', e);
    if (e.nativeEvent == undefined) {
      setMobile(e);
      if (check == true) {
        if (phoneNumberValidation(e)) {
          return true;
        }
      }
    } else {
      phoneNumberValidation(e.nativeEvent.text?.trim());
    }
  };
  const phoneNumberValidation = e => {
    var str = /^(\+92|0|92)[0-9]{10}$/;
    if (str.test(e) == false) {
      // Vibration.vibrate(1 * ONE_SECOND_IN_MS);
      showMessage({
        message: 'Your Phone Number is not correct! Please try again.',
        type: 'danger',
        titleStyle: { fontSize: 13 },
      });
      console.log('phone number incorrect');

      return false;
    } else {
      setMobile(e);

      return true;
    }
  };
  //Phone Validation End

  const createTwoButtonAlert = () =>
    Alert.alert('Confirmation Email!', 'Please confirm your email!', [
      {
        text: '',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('ok pressed') },
      // { text: 'OK', onPress: () => navigation.navigate('SignIn') },
    ]);
  ///
  //
  //
  //
  const signUpAsBuildProfile = async () => {
    console.log("signUpAsBuildProfile");
    let user = await auth().createUserWithEmailAndPassword(Email, Password).catch((err) => { console.log("err 1", Alert.alert(err?.code)); })
    firebase.auth().currentUser?.sendEmailVerification({ handleCodeInApp: true, url: 'https://easy-rishta-ac1e8.firebaseapp.com' }).then(() => { createTwoButtonAlert() }).catch((err) => { Alert.alert(err?.code) })

    let obj = {
      userId: idd,
      userGender: Gender,
      userFirstName: FirstName,
      userLastName: LastName,
      userEmail: Email,
      userPassword: Password,
      userPhone: Mobile,
    }
    imageStore.setadminAddedUser(obj);
    await firestore()
      .collection('EasyRishta')
      .doc('Community')
      .collection('People')
      .doc(Email)
      .set({
        userId: idd,
        userGender: Gender,
        userFirstName: FirstName,
        userLastName: LastName,
        userEmail: Email,
        userPassword: Password,
        userPhone: Mobile,
      }).then((res) => {
        console.log("SignUp res", res);
        showMessage({
          message:
            'User SignUp SuccessFully',
          type: 'danger',
          titleStyle: { fontSize: 13, position: 'absolute' },
        });
        navigation.navigate('Profile')
      }).catch((err) => {
        console.log("err admin signup", err);
        showMessage({
          message: err?.code,
          type: 'danger',
          titleStyle: { fontSize: 13, position: 'absolute' },
        });
      });
  }
  const signUpAsAdminRole = async () => {
    console.log("signUpAsAdminRole");
    await firestore()
      .collection('EasyRishta')
      .doc('Community')
      .collection('People')
      .doc(Email)
      .set({
        userId: idd,
        userGender: Gender,
        userFirstName: FirstName,
        userLastName: LastName,
        userEmail: Email,
        userPassword: Password,
        userPhone: Mobile,
        // userId: Email,
        isAdminRole: true
      }).then((res) => {
        console.log("SignUp res", res);
        showMessage({
          message:
            'User SignUp SuccessFully',
          type: 'info',
          titleStyle: { fontSize: 13, position: 'absolute' },
        });
        navigation.navigate('SignIn')
      }).catch((err) => {
        showMessage({
          message: err?.code,
          type: 'danger',
          titleStyle: { fontSize: 13, position: 'absolute' },
        });
      });
  }
  const signUpAsUserSide = async () => {
    console.log("signUpAsUserSide");
    await firestore()
      .collection('EasyRishta')
      .doc('Community')
      .collection('People')
      .doc(Email)
      .set({
        userId: idd,
        userGender: Gender,
        userFirstName: FirstName,
        userLastName: LastName,
        userEmail: Email,
        userPassword: Password,
        userPhone: Mobile,
        // userId: Email,
      }).then((res) => {
        console.log("SignUp res", res);
        showMessage({
          message:
            'User SignUp SuccessFully',
          type: 'info',
          titleStyle: { fontSize: 13, position: 'absolute' },
        });
        navigation.navigate('SignIn')
      }).catch((err) => {
        console.log(err);
        showMessage({
          message: err?.code,
          type: 'danger',
          titleStyle: { fontSize: 13, position: 'absolute' },
        });
      });
  }
  const handleSubmitButton = async () => {
    if (
      FirstName !== '' &&
      LastName !== '' &&
      Email !== '' &&
      Mobile !== '' &&
      Password !== '' &&
      Gender !== ''
    ) {
      if (checkEmail(Email, true)) {
        if (checkPhoneNumber(Mobile, true)) {
          if (checkPassword(Password, true)) {
            if (logedInUser?.isAdminRole && (Email !== adminUser.email && Password !== adminUser.password)) { console.log("admin"); signUpAsBuildProfile() } else {
              console.log("user");
              imageStore.setUserEmail(Email);
              AsyncStorage.setItem('@email', Email);
              imageStore.setUserPassword(Password);
              auth()
                .createUserWithEmailAndPassword(Email, Password)
                .then(res => {
                  console.log('---->>>res', res);
                  firebase
                    .auth()
                    .currentUser?.sendEmailVerification({
                      handleCodeInApp: true,
                      url: 'https://easy-rishta-ac1e8.firebaseapp.com',
                    })
                    .then(async () => {
                      createTwoButtonAlert();
                      console.log("Email == adminUser.email && Password == adminUser.password", Email == adminUser.email && Password == adminUser.password);
                      if (Email == adminUser.email && Password == adminUser.password) { signUpAsAdminRole() } else { signUpAsUserSide() }
                    })
                    .catch(error => {
                      console.log("code signup error", error);
                      Alert.alert(error?.code);
                    })

                })
                .catch(error => {
                  console.log("errorSignUp", error?.code);
                  showMessage({
                    message: error?.code ?? 'SignUp Error',
                    type: 'danger',
                    titleStyle: { fontSize: 13, position: 'absolute' },
                  });
                  // Alert.alert(error);
                });
            }
          }
        }
      }
    } else {
      showMessage({
        message: "Make sure you fill all fields!",
        type: 'danger',
        titleStyle: { fontSize: 13, position: 'absolute' },
      });

    }
  };
  // useEffect (()=>{
  //   BackHandler.addEventListener('hardwareBackPress', goToHome);


  // },[])
  function handleBackButtonClick() {
    console.log("here");
    // navigation.navigate('Home');
    if (route?.params?.asAdmin) {
      navigation.navigate('Home');
    } else {
      navigation.goBack()
    }
    return true

  }

  useEffect(() => {
    if (route?.params?.asAdmin) {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    }

  }, []);

  return (
    <View style={styles.container}>

      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={styles.image}>
        {/* <Icon 
            type={'ionicon'}
            name="arrow-back-outline"
            size={30}
            color={'black'}
            
          /> */}
        {/* <Icon name="rocket" size={30} color="#900" /> */}
        {/* <Icon
          type={'ionicon'}
          name="arrow-back-outline"
          size={40}
          color={'black'}
          style={{ bottom: 20 }}
          onPress={() => { handleBackButtonClick() }}

        /> */}

        <Heading children={logedInUser?.isAdminRole ? "Build Profile" : "Sign Up"} />

        <View style={styles.header}>
          <CustomButton
            children="Male"
            width="45%"
            color="black"
            onPress={selectGender}
            backgroundColor={isActive ? '#ED225C' : 'transparent'}
          />
          <CustomButton
            children="Female"
            width="45%"
            color="black"
            onPress={selectGender2}
            backgroundColor={isActive2 ? '#ED225C' : 'transparent'}
          />
        </View>
        <CustomTextInput
          placeholder="First Name*"
          placeholderTextColor="black"
          value={FirstName}
          onChange={e => FirstnameValidation(e)}
        />
        <CustomTextInput
          placeholder="Last Name*"
          placeholderTextColor="black"
          value={LastName}
          onChange={e => LastnameValidation(e)}
        />
        <CustomTextInput
          placeholder="Email*"
          placeholderTextColor="black"
          value={Email}
          onChange={e => checkEmail(e)}
        />

        <CustomTextInput
          value={Password}
          placeholder="Password"
          placeholderTextColor="black"
          secure={true}
          onChange={e => checkPassword(e)}
        />

        <CustomTextInput
          placeholder="Mobile Number*"
          placeholderTextColor="black"
          value={Mobile}
          onChange={e => checkPhoneNumber(e)}
          keyboard={'numeric'}
        />
        {!logedInUser?.isAdminRole ? <View>
          <CustomButton
            children="Sign Up"
            width="100%"
            color="black"
            backgroundColor={'#ED225C'}
            onPress={handleSubmitButton}
          />
          {/* <Text
            style={{
              color: 'black',
              fontSize: 18,
              textAlign: 'center',
              marginVertical: 5,
            }}>
            or
          </Text>
          <CustomButton
            children="Signup with OTP"
            width="100%"
            color="black"
            backgroundColor={'#ED225C'}
            onPress={goToOtp}
          /> */}
        </View> : <CustomButton
          children="Continue"
          width="100%"
          color="white"
          backgroundColor={'#ED225C'}
          // onPress={goToProfileTwo}
          onPress={handleSubmitButton}
          style={{ marginVertical: 10 }}
        />}
        {!logedInUser?.isAdminRole ? <Text style={{ color: 'black', fontSize: 18, textAlign: 'center' }}>
          Already a member?{' '}
          <Text style={{ color: '#ED225C', fontSize: 18 }} onPress={goToSign}>
            Login in
          </Text>
        </Text> : null}
      </ImageBackground>
    </View>
  );
};

export default observer(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  dropDownStyle: {
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '20%',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
