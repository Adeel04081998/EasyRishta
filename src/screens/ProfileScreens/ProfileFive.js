import { Alert, ImageBackground, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Heading from '../../components/Texts/Heading';
import CustomButton from '../../components/Buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import PickerView from '../../components/Picker/PickerView';
import {
  HeightInFeet,
  HeightInInch,
  Width,
  EatingHabits,
  BooleanArray,
  BodyType,
  SkinTone,
} from '../../../utils/dummyData';
import { showMessage } from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import imageStore from '../../Mobx/mobxStore';

const ProfileFive = () => {
  const navigation = useNavigation();

  const [heightInFeet, setHeightInFeet] = useState('');
  const [heightInInch, setHeightInInch] = useState('');
  const [width, setWidth] = useState('');
  const [eatingHabits, setEatingHabits] = useState('');
  const [smoking, setSmoking] = useState('');
  const [drinking, setDrinking] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const goToProfileSix = async () => {
    // let emailUser = imageStore.logInUser?.isAdminRole ? imageStore?.adminAddedUser?.userEmail : imageStore?.userEmail
    let emailUser = imageStore.logInUser?.isAdminRole ? imageStore?.adminAddedUser?.userEmail : (imageStore?.userEmail?imageStore?.userEmail :imageStore.logInUser?.userEmail)
    if (
      heightInFeet !== '' &&
      heightInInch !== '' &&
      width !== '' &&
      eatingHabits !== '' &&
      smoking !== '' &&
      drinking !== '' &&
      bodyType !== '' &&
      skinTone !== ''
    ) {

      await firestore()
        .collection('EasyRishta')
        .doc('Community')
        .collection('People')
        .doc(emailUser)
        .update({
          userHeightInFeet: heightInFeet,
          userHeightInInch: heightInInch,
          userWidth: width,
          userEatingHabits: eatingHabits,
          userSmoking: smoking,
          userDrinking: drinking,
          userBodyType: bodyType,
          userSkinTone: skinTone,
        }).then(() => {

          navigation.navigate('ProfileSix');
        })
    } else {

      showMessage({
        message: 'Please select all fields',
        type: 'danger',
        duration: 2960,
        titleStyle: { fontSize: 13 },
      });
    }
  };
  const goToProfileFour = () => {
    navigation.navigate('ProfileFour');
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 15 }}>
        <Heading children="Build Profile" />
        <PickerView
          options={HeightInFeet}
          selectedValue={heightInFeet}
          onValueChange={itemValue => {
            setHeightInFeet(itemValue);
          }}
          lable="Height In Feet"
        />
        <PickerView
          options={HeightInInch}
          selectedValue={heightInInch}
          onValueChange={itemValue => {
            setHeightInInch(itemValue);
          }}
          lable="Height In Inch"
        />
        <PickerView
          options={Width}
          selectedValue={width}
          onValueChange={itemValue => {
            setWidth(itemValue);
          }}
          lable="Width"
        />
        <PickerView
          options={EatingHabits}
          selectedValue={eatingHabits}
          onValueChange={itemValue => {
            setEatingHabits(itemValue);
          }}
          lable="Eating Habits"
        />
        <PickerView
          options={BooleanArray}
          selectedValue={smoking}
          onValueChange={itemValue => {
            setSmoking(itemValue);
          }}
          lable="Smoking"
        />
        <PickerView
          options={BooleanArray}
          selectedValue={drinking}
          onValueChange={itemValue => {
            setDrinking(itemValue);
          }}
          lable="Drinking"
        />
        <PickerView
          options={BodyType}
          selectedValue={bodyType}
          onValueChange={itemValue => {
            setBodyType(itemValue);
          }}
          lable="Body Type"
        />
        <PickerView
          options={SkinTone}
          selectedValue={skinTone}
          onValueChange={itemValue => {
            setSkinTone(itemValue);
          }}
          lable="Skin Tone"
        />

        <CustomButton
          children="Continue"
          width="100%"
          color="white"
          backgroundColor={'#ED225C'}
          onPress={goToProfileSix}
          style={{ marginVertical: 10 }}
        />
        <CustomButton
          children="Previous"
          width="100%"
          onPress={goToProfileFour}
          style={{ marginVertical: 10 }}
          color="black"
          borderWidth={1}
        />
      </ImageBackground>
    </View>
  );
};

export default ProfileFive;
