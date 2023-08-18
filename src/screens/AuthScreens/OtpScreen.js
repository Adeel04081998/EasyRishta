import { Alert, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Heading from '../../components/Texts/Heading';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import { observer } from 'mobx-react';


const OtpScreen = () => {
  const navigation = useNavigation();
  const [mobileNo, setMobileNo] = useState(__DEV__ ? '+923315001767' : '');
  const onPassword = (e) => {
    if (e.nativeEvent == undefined) {
      setMobileNo(e);
    } else {
      setMobileNo(e.nativeEvent?.text?.trim());
    }
  };

  const goToVerification = async () => {
    if (mobileNo !== '') {
      try {
        const confirmation = await auth().signInWithPhoneNumber(mobileNo);
        console.log("confirmation", confirmation);
        if (confirmation?._verificationId) {
          navigation.navigate('verification', {
            verificationId: confirmation?._verificationId,
            mobileNo:mobileNo
          });

        }   
      } catch (error) {
        console.log("error=>", error?.code);
        showMessage({
          message: error?.code,
          type: 'danger',
          titleStyle: { fontSize: 13, position: 'absolute' },
        });
      }
      // navigation.navigate('verification');
    } else {
      showMessage({
        message: "Please enter password!",
        type: 'danger',
        titleStyle: { fontSize: 13, position: 'absolute' },
      });
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
          <Heading children="Signup with OTP" />
          <CustomTextInput
            placeholder="Mobile*"
            style={{ marginVertical: 10 }}
            value={mobileNo}
            onChange={(e) => onPassword(e)}
          />
          <CustomButton
            children="Signup with OTP"
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

export default observer(OtpScreen);

const styles = StyleSheet.create({
  stretch: {
    width: '80%',
    height: '40%',
    alignSelf: 'center',
  },
});
