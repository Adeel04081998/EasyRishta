import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Heading from '../../components/Texts/Heading';
import CustomButton from '../../components/Buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import PickerView from '../../components/Picker/PickerView';
import { showMessage } from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import {
  Provinces,
  Country,
  Cities,
  MartialStatus,
} from '../../../utils/dummyData';
import { sharedSignleUser, sharedSingleUser } from '../../components/sharedFunction/sharedFunction';
import imageStore from '../../Mobx/mobxStore';


const ProfileTwo = () => {
  const navigation = useNavigation();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedMartialStatus, setSelectedMartialStatus] = useState('');

  const goToProfileThree = async () => {
    let emailUser = imageStore.logInUser?.isAdminRole ? imageStore?.adminAddedUser?.userEmail : (imageStore?.userEmail?imageStore?.userEmail :imageStore.logInUser?.userEmail)
    if (
      selectedCountry !== '' &&
      selectedProvince !== '' &&
      selectedCity !== '' &&
      selectedMartialStatus !== ''
    ) {

      await firestore()
        .collection('EasyRishta')
        .doc('Community')
        .collection('People')
        .doc(emailUser)
        .update({
          userCountry: selectedCountry,
          userProvince: selectedProvince,
          userCity: selectedCity,
          userMartialStatus: selectedMartialStatus,
        }).then((res) => {
          console.log("res profile2", res);
          // sharedSingleUser()
          navigation.navigate('ProfileThree');
        }).catch((error) => {
          console.log("error profile2", error);

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
  const goToBuildProfile = () => {
    navigation.navigate('BuildProfile');
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 15 }}>
        <Heading children="Build Profile" />
        <PickerView
          options={Country}
          selectedValue={selectedCountry}
          onValueChange={itemValue => {
            setSelectedCountry(itemValue);
          }}
          lable="Country"
        />
        <PickerView
          options={Provinces}
          selectedValue={selectedProvince}
          onValueChange={itemValue => {
            setSelectedProvince(itemValue);
          }}
          lable="State"
        />
        <PickerView
          options={Cities}
          selectedValue={selectedCity}
          onValueChange={itemValue => {
            setSelectedCity(itemValue);
          }}
          lable="City"
        />
        <PickerView
          options={MartialStatus}
          selectedValue={selectedMartialStatus}
          onValueChange={itemValue => {
            setSelectedMartialStatus(itemValue);
          }}
          lable="Martial Status"
        />
        <CustomButton
          children="Continue"
          width="100%"
          color="white"
          backgroundColor={'#ED225C'}
          onPress={goToProfileThree}
          style={{ marginVertical: 10 }}
        />
        <CustomButton
          children="Previous"
          width="100%"
          onPress={goToBuildProfile}
          style={{ marginVertical: 10 }}
          color="black"
        />
      </ImageBackground>
    </View>
  );
};

export default ProfileTwo;
