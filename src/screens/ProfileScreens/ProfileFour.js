import {Alert, ImageBackground, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/Texts/Heading';
import CustomButton from '../../components/Buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import PickerView from '../../components/Picker/PickerView';
import {
  Education,
  EmpolementType,
  Salary,
  Occupation,
  Designation,
} from '../../../utils/dummyData';
import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import imageStore from '../../Mobx/mobxStore';


const ProfileFour = () => {
  const navigation = useNavigation();
  const [education, setEducation] = useState('');
  const [empolyeeType, setEmpolyeeType] = useState('');
  const [salary, setSalary] = useState('');
  const [occupation, setOccupation] = useState('');
  const [designation, setDesignation] = useState('');

  const goToProfileFive =async () => {
    // let emailUser = imageStore.logInUser?.isAdminRole ? imageStore?.adminAddedUser?.userEmail : imageStore?.userEmail
    let emailUser = imageStore.logInUser?.isAdminRole ? imageStore?.adminAddedUser?.userEmail : (imageStore?.userEmail?imageStore?.userEmail :imageStore.logInUser?.userEmail)

    if (
      education !== '' &&
      empolyeeType !== '' &&
      salary !== '' &&
      occupation !== '' &&
      designation !== ''
    ) {
      await firestore()
      .collection('EasyRishta')
      .doc('Community')
      .collection('People')
      .doc(emailUser)
      .update({
        userEducation: education,
        userEmpolyeeType: empolyeeType,
        userSalary: salary,
        userOccupation: occupation,
        userDesignation: designation,
      }).then(()=>{

        navigation.navigate('ProfileFive');
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
  const goToProfileThree = () => {
    navigation.navigate('ProfileFive');
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{flex: 1, paddingHorizontal: 25, paddingVertical: 15}}>
        <Heading children="Build Profile" />

        <PickerView
          options={Education}
          selectedValue={education}
          onValueChange={itemValue => {
            setEducation(itemValue);
          }}
          lable="Education"
        />
        <PickerView
          options={EmpolementType}
          selectedValue={empolyeeType}
          onValueChange={itemValue => {
            setEmpolyeeType(itemValue);
          }}
          lable="Employee In"
        />
        <PickerView
          options={Salary}
          selectedValue={salary}
          onValueChange={itemValue => {
            setSalary(itemValue);
          }}
          lable="Annual Income"
        />
        <PickerView
          options={Occupation}
          selectedValue={occupation}
          onValueChange={itemValue => {
            setOccupation(itemValue);
          }}
          lable="Occupation"
        />
        <PickerView
          options={Designation}
          selectedValue={designation}
          onValueChange={itemValue => {
            setDesignation(itemValue);
          }}
          lable="Designation"
        />

        <CustomButton
          children="Continue"
          width="100%"
          color="white"
          backgroundColor={'#ED225C'}
          onPress={goToProfileFive}
          style={{marginVertical: 10}}
        />
        <CustomButton
          children="Previous"
          width="100%"
          onPress={goToProfileThree}
          style={{marginVertical: 10}}
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

export default ProfileFour;
