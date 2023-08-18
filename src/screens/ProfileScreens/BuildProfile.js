import { Alert, BackHandler, Image, ImageBackground, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Heading from '../../components/Texts/Heading';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '../../components/Modals/DateTimePicker';
import moment from 'moment';
import { sharedDateFormat } from '../../components/sharedFunction/sharedFunction';
// import DateTimePicker from '../../components/Modals/DateTimePicker';
import imageStore from '../../Mobx/mobxStore';
import auth, { firebase } from '@react-native-firebase/auth';
import { observer } from 'mobx-react';
import PickerView from '../../components/Picker/PickerView';
import { Provinces, Religion as ReligionsData, Caste as CasteData, MotherTongue } from '../../../utils/dummyData';



const BuildProfile = () => {
  const navigation = useNavigation();
  const [birthDate, setBirthDate] = useState('');
  const [Religion, setReligion] = useState('');
  const [Caste, setCaste] = useState('');
  const [Tongue, setTongue] = useState('');
  const [Email, setEmail] = useState(__DEV__ ? 'Easyrishta3@gmail.com' : '');
  const [Password, setPassword] = useState(__DEV__ ? 'Pakistan@99' : '');
  const [openModel, setOpenModel] = useState(false);

  let logedInUser = imageStore.logInUser
  let adminAdded = imageStore.adminAddedUser



  const handleDateChange = (date) => {
    console.log("date", date);
    setBirthDate(date);
  };
  const onDate = e => {
    if (e.nativeEvent == undefined) {
      setBirthDate(e);
    } else {
      setBirthDate(e.nativeEvent.text);
    }
  };

  const onReligion = e => {
    if (e.nativeEvent == undefined) {
      setReligion(e);
    } else {
      setReligion(e.nativeEvent.text);
    }
  };

  const onCaste = e => {
    if (e.nativeEvent == undefined) {
      setCaste(e);
    } else {
      setCaste(e.nativeEvent.text);
    }
  };

  const onTongue = e => {
    if (e.nativeEvent == undefined) {
      setTongue(e);
    } else {
      setTongue(e.nativeEvent.text);
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
      // Vibration.vibrate(1 * ONE_SECOND_IN_MS);
      showMessage({
        message:
          'Your Email is not correct! make sure @gmail.com included into your email.',
        type: 'danger',
        titleStyle: { fontSize: 13, position: 'absolute' },
      });
      return false;
    } else {
      console.log("else");
      if (e.includes('@gmail.com')) {
        setEmail(e);
        return true;
      }
    }
  };
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
  const goToProfileTwo = async () => {
    if (birthDate !== '' && Religion !== '' && Caste !== '' && Tongue !== '') {
      console.log(" sharedDateFormat(birthDate, 'DD/MM/YYYY', 'utc')", sharedDateFormat(birthDate, 'DD/MM/YYYY', 'utc'))
      if (logedInUser?.isAdminRole && checkEmail(Email, true) && checkPassword(Password, true)) {
        console.log("iff",);

        await firestore()
          .collection('EasyRishta')
          .doc('Community')
          .collection('People')
          .doc(imageStore?.adminAddedUser?.userEmail)
          .update({
            userDateofBirth: sharedDateFormat(birthDate, 'DD/MM/YYYY', 'utc'),
            userCaste: Caste,
            userReligion: Religion,
            userTongue: Tongue,
          }).then((res) => {
            console.log("res", res);
            navigation.navigate('ProfileTwo');
          })

      } else {
        console.log("else", logedInUser.userEmail);
        let email = imageStore?.userEmail ? imageStore.userEmail : logedInUser?.userEmail
        await firestore()
          .collection('EasyRishta')
          .doc('Community')
          .collection('People')
          .doc(email)
          .update({
            userDateofBirth: sharedDateFormat(birthDate, 'DD/MM/YYYY', 'utc'),
            userCaste: Caste,
            userReligion: Religion,
            userTongue: Tongue,
          }).then((res) => {
            console.log("res", res);
            navigation.navigate('ProfileTwo');
          }).catch((err) => {
            console.log("err user", err);

          })
      }


    } else {
      showMessage({
        message:
          'Please select all fields',
        type: "danger",
        duration: 2960,
        titleStyle: { fontSize: 13 },
      });
    }
  };
  function handleBackButtonClick() {
    navigation.goBack()
    return true

  }

  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);


  }, []);

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
        <ScrollView style={{ paddingHorizontal: 25 }}>
          <Heading children="Build Profile" />
          <TouchableOpacity style={{
            borderRadius: 10,
            paddingHorizontal: 15,
            fontSize: 15,
            // paddingTop: 6,
            width: '100%', borderWidth: 1,
            paddingVertical: 15

          }} onPress={() => {
            setOpenModel(true)

          }}>
            <Text style={{ color: 'black' }}>{birthDate ? sharedDateFormat(birthDate, 'DD/MM/YYYY', 'utc') : 'Date of Birth'}</Text>
            <DateTimePicker
              modal={true}
              open={openModel}
              // style={{width:350,height:490}}
              style={{ position: 'absolute', zIndex: 99, bottom: 0, top: 0 }}
              mode="date"
              placeholder="Select date"
              format="DD-MM-YYYY" // Change the format as per your requirement
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={handleDateChange}
              onConfirm={(date) => {
                console.log("res", date);
                setOpenModel(false)
                setBirthDate(date)
              }}
              onCancel={(date) => {
                setOpenModel(false)
                setBirthDate(date)
              }}
            />
          </TouchableOpacity>
        
          <PickerView
            options={ReligionsData}
            selectedValue={Religion}
            onValueChange={itemValue => {
              setReligion(itemValue);
            }}
            lable="Religion*"
            containerStyl={{ marginVertical: 10 }}
          />
          <PickerView
            options={CasteData}
            selectedValue={Caste}
            onValueChange={itemValue => {
              setCaste(itemValue);
            }}
            lable="Caste*"
            containerStyl={{ marginVertical: 10 }}

          />

          <PickerView
            options={MotherTongue}
            selectedValue={Tongue}
            onValueChange={itemValue => {
              setTongue(itemValue);
            }}
            lable="Mother Tongue*"
            containerStyl={{ marginVertical: 10 }}

          />

          <CustomButton
            children="Continue"
            width="100%"
            color="white"
            backgroundColor={'#ED225C'}
            onPress={goToProfileTwo}
            style={{ marginVertical: 10 }}
          />

        </ScrollView>
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
});
export default observer(BuildProfile);
