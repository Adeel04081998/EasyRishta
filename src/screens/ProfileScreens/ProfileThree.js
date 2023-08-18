import {
  Alert,
  ImageBackground,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/Texts/Heading';
import CustomButton from '../../components/Buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import PickerView from '../../components/Picker/PickerView';
import {
  Provinces,
  Country,
  Cities,
  MartialStatus,
  TotalChildren,
} from '../../../utils/dummyData';
import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import imageStore from '../../Mobx/mobxStore';




const ProfileThree = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedMartialStatus, setSelectedMartialStatus] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState('');
  const [statusChildren, setStatusChildren] = useState('');

  const navigation = useNavigation();
  const goToProfileFour = async() => {
    // let emailUser = imageStore.logInUser?.isAdminRole ? imageStore?.adminAddedUser?.userEmail : imageStore?.userEmail
    let emailUser = imageStore.logInUser?.isAdminRole ? imageStore?.adminAddedUser?.userEmail : (imageStore?.userEmail?imageStore?.userEmail :imageStore.logInUser?.userEmail)
    if (
      selectedMartialStatus !== '' &&
      numberOfChildren !== '' &&
      statusChildren !== ''
    ) {
      await firestore()
      .collection('EasyRishta')
      .doc('Community')
      .collection('People')
      .doc(emailUser)
      .update({
        userMartialStatus: selectedMartialStatus,
        userchildrens: numberOfChildren,
        userstatusChildren: statusChildren,
      }).then(()=>{
        navigation.navigate('ProfileFour');
      })
    } else {
      showMessage({
        message: 'Please select all fields',
        type: 'danger',
        duration: 2960,
        titleStyle: {fontSize: 13},
      });
    }
  };

  const goToProfileTwo = () => {
    navigation.navigate('ProfileTwo');
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{flex: 1, paddingHorizontal: 25, paddingVertical: 15}}>
        <Heading children="Build Profile" />
        <PickerView
          options={MartialStatus}
          selectedValue={selectedMartialStatus}
          onValueChange={itemValue => {
            setSelectedMartialStatus(itemValue);
          }}
          lable="Martial Status"
        />

        <PickerView
          options={TotalChildren}
          selectedValue={numberOfChildren}
          onValueChange={itemValue => {
            setNumberOfChildren(itemValue);
          }}
          lable="Total Children"
        />

        <PickerView
          options={MartialStatus}
          selectedValue={statusChildren}
          onValueChange={itemValue => {
            setStatusChildren(itemValue);
          }}
          lable="Status Children"
        />

        <CustomButton
          children="Continue"
          width="100%"
          color="white"
          backgroundColor={'#ED225C'}
          onPress={goToProfileFour}
          style={{marginVertical: 10}}
        />
        <CustomButton
          children="Previous"
          width="100%"
          onPress={goToProfileTwo}
          style={{marginVertical: 10}}
          color="black"
          borderWidth={1}
        />
      </ImageBackground>
    </View>
  );
};

export default ProfileThree;
