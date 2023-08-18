import {Alert, ImageBackground, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/Texts/Heading';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import imageStore from '../../Mobx/mobxStore';



const ProfileFive = () => {
  const [Hobby, setHobby] = useState('');
  const [About, setAbout] = useState('');

  const navigation = useNavigation();
  const onHobby = e => {
    if (e.nativeEvent == undefined) {
      setHobby(e);
    } else {
      setHobby(e.nativeEvent.text);
    }
  };

  const onAbout = e => {
    if (e.nativeEvent == undefined) {
      setAbout(e);
    } else {
      setAbout(e.nativeEvent.text);
    }
  };

  const goToPictureScreen =async () => {
    let emailUser = imageStore.logInUser?.isAdminRole ? imageStore?.adminAddedUser?.userEmail : (imageStore?.userEmail?imageStore?.userEmail :imageStore.logInUser?.userEmail)
    if (Hobby !== '' && About !== '') {
      await firestore()
      .collection('EasyRishta')
      .doc('Community')
      .collection('People')
      .doc(emailUser)
      .update({
        userHobby: Hobby,
        userAbout: About,
        // isUserAddProfile:true
      
      }).then((res)=>{
        console.log("res",res);

        navigation.navigate('PictureScreen');
      })
    }else{

      showMessage({
        message: 'Please select all fields',
        type: 'danger',
        duration: 2960,
        titleStyle: {fontSize: 13},
      });
    }
  };

  const goToProfileFive = () => {
    navigation.navigate('ProfileFive');
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{flex: 1, paddingHorizontal: 25, paddingVertical: 15}}>
        <Heading children="Build Profile" />
        <CustomTextInput
          placeholder="Hobby*"
          style={{marginVertical: 10}}
          borderWidth={1}
          paddingBottom={30}
          value={Hobby}
          onChange={e => onHobby(e)}
        />
        <CustomTextInput
          placeholder="Write about yourself*"
          style={{marginVertical: 10}}
          borderWidth={1}
          paddingBottom={30}
          value={About}
          onChange={e => onAbout(e)}
        />
        <CustomButton
          children="Continue"
          width="100%"
          color="white"
          backgroundColor={'#ED225C'}
          onPress={goToPictureScreen}
          style={{marginVertical: 10}}
        />
         <CustomButton
          children="Previous"
          width="100%"
          onPress={goToProfileFive}
          style={{ marginVertical: 10 }}
          color="black"
          borderWidth={1}
        />
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
  dropDownStyle: {
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
});

export default ProfileFive;
