import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Heading from '../../components/Texts/Heading';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import BasicText from '../../components/Texts/BasicText';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';


const OtpVerification = ({ route }) => {
  const navigation = useNavigation();
  let verificationId = route.params?.verificationId ?? ''
  let mobileNo = route.params?.mobileNo ?? ''

  const [Value1, setValue1] = useState('');
  const [Value2, setValue2] = useState('');
  const [Value3, setValue3] = useState('');
  const [Value4, setValue4] = useState('');
  const [Value5, setValue5] = useState('');
  const [Value6, setValue6] = useState('');
  const onValue1 = e => {
    console.log("e", e.length);
    // if (e.nativeEvent?.text === undefined ) {
    //   console.log("hy");
    //   setValue1(e);
    // } else if (e?.length === '1') {
    //   console.log("hy 2");

    //   setValue1(e.nativeEvent.text);
    // }
    if (e?.length === 1 || e?.length === 0) {
      setValue1(e);
    }
  };
  const onValue2 = e => {
    // if (e.nativeEvent == undefined) {
    //   setValue2(e);
    // } else {
    //   setValue2(e.nativeEvent.text);
    // }
    if (e?.length === 1 || e?.length === 0) {
      setValue2(e);
    }
  };
  const onValue3 = e => {
    // if (e.nativeEvent == undefined) {
    //   setValue3(e);
    // } else {
    //   setValue3(e.nativeEvent.text);
    // }
    if (e?.length === 1 || e?.length === 0) {
      setValue3(e);
    }
  };
  const onValue4 = e => {
    // if (e.nativeEvent == undefined) {
    //   setValue4(e);
    // } else {
    //   setValue4(e.nativeEvent.text);
    // }
    if (e?.length === 1 || e?.length === 0) {
      setValue4(e);
    }
  };
  const onValue5 = e => {
    // if (e.nativeEvent == undefined) {
    //   setValue5(e);
    // } else {
    //   setValue5(e.nativeEvent.text);
    // }
    if (e?.length === 1 || e?.length === 0) {
      setValue5(e);
    }
  };
  const onValue6 = e => {
    // if (e.nativeEvent == undefined) {
    //   setValue6(e);
    // } else {
    //   setValue6(e.nativeEvent.text);
    // }
    if (e?.length === 1 || e?.length === 0) {
      setValue6(e);
    }
  };

  const handleVerifyOTP = async () => {
    let code = Value1;
    code += Value2
    code += Value3
    code += Value4
    code += Value5
    code += Value6
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await auth().signInWithCredential(credential);
      showMessage({
        message: "Success', 'OTP verification successful!",
        type: 'danger',
        titleStyle: { fontSize: 13, position: 'absolute' },
      });
      navigation.navigate('SignUp', {
        userMobileNo: mobileNo
      });
    } catch (error) {
      console.log("Eerr", error.message);
      showMessage({
        message: error?.message,
        type: 'danger',
        titleStyle: { fontSize: 13, position: 'absolute' },
        style: { height: 80, }
      });
    }
  };

  const goToVerification = () => {
    if (
      Value1 !== '' &&
      Value2 !== '' &&
      Value3 !== '' &&
      Value4 !== '' &&
      Value5 !== '' &&
      Value6 !== ''
    ) {
      // navigation.navigate('BuildProfile');
      handleVerifyOTP()
    } else {
      Alert.alert('Please enter all digits!');
    }
  };

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
          <Heading children="Verification code" textAlign={'center'} />
          <View style={styles.buttonsView}>
            <CustomTextInput
              width="15%"
              borderColor="#ED225C"
              borderWidth={1.2}
              keyboard={'numeric'}
              maxLength={1}
              value={Value1}
              onChange={e => onValue1(e)}
            />
            <CustomTextInput
              width="15%"
              borderColor="#ED225C"
              borderWidth={1.2}
              keyboard={'numeric'}
              maxLength={1}
              value={Value2}
              onChange={e => onValue2(e)}
            />
            <CustomTextInput
              width="15%"
              borderColor="#ED225C"
              borderWidth={1.2}
              keyboard={'numeric'}
              maxLength={1}
              value={Value3}
              onChange={e => onValue3(e)}
            />
            <CustomTextInput
              width="15%"
              borderColor="#ED225C"
              borderWidth={1.2}
              keyboard={'numeric'}
              maxLength={1}
              value={Value4}
              onChange={e => onValue4(e)}
            />
            <CustomTextInput
              width="15%"
              borderColor="#ED225C"
              borderWidth={1.2}
              keyboard={'numeric'}
              maxLength={1}
              value={Value5}
              onChange={e => onValue5(e)}
            />
            <CustomTextInput
              width="15%"
              borderColor="#ED225C"
              borderWidth={1.2}
              keyboard={'numeric'}
              maxLength={1}
              value={Value6}
              onChange={e => onValue6(e)}
            />
          </View>
          <BasicText
            children={'Resend'}
            textAlign={'center'}
            marginVertical={10}
            onPress={() => Alert.alert('OTP sent successfully!')}
          />
          <CustomButton
            children="Submit"
            width="100%"
            color="black"
            backgroundColor={'#ED225C'}
            onPress={goToVerification}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  stretch: {
    width: '80%',
    height: '40%',
    alignSelf: 'center',
  },
  buttonsView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
  },
});
