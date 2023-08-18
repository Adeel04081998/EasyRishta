import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/Texts/Heading';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../../utils/icons';
import BasicText from '../../components/Texts/BasicText';
import CustomButton from '../../components/Buttons/CustomButton';
import Slider from '@react-native-community/slider';
import PickerView from '../../components/Picker/PickerView';
import {
  MartialStatus,
  Complexion,
  MotherTongue,
  Caste,
  Country,
  Education,
  Religion
} from '../../../utils/dummyData';
const FilterScreen = () => {
  const navigation = useNavigation();
  const [Height, setHeight] = useState(2);
  const [Age, setAge] = useState(20);
  const [selectedMartialStatus, setSelectedMartialStatus] = useState('');
  const [complexion, setComplexion] = useState('')
  const [motherTongue, setMotherTongue] = useState('')
  const [religion, setReligion] = useState('');
  const [caste, setCaste] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('');
  const [education, setEducation] = useState('');


  const gotoMatchMake = () => {
    navigation.navigate('MakeMatch');
  };
  const goToOtherProfile = () => {
    navigation.navigate('OtherUsers');
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{
          flex: 1,
          paddingHorizontal: 25,
          paddingTop: 15,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View></View>
          <Heading children="Filter" />
          <Icon
            type={'entypo'}
            name="cross"
            size={30}
            color={'red'}
            onPress={gotoMatchMake}
          />
        </View>
        <PickerView
          options={MartialStatus}
          selectedValue={selectedMartialStatus}
          onValueChange={itemValue => {
            setSelectedMartialStatus(itemValue);
          }}
          lable="Martial Status"
        />
        <View
          style={{
            width: '100%',
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
            padding: 10,
            marginVertical: 5,
          }}>
          <BasicText children="Height" />
          <Slider
            value={Height}
            onValueChange={newValue => setHeight(newValue)}
            minimumValue={0}
            maximumValue={100}
            step={1}
            minimumTrackTintColor="red" // Set the color of the track
            thumbTintColor="red" // Set the color of the thumb
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginVertical: 5,
            }}>
            <BasicText children="4ft 6in" />
            <BasicText children="5ft" />
          </View>
          <BasicText children="Age" />
          <Slider
            value={Age}
            onValueChange={newValue => setAge(newValue)}
            minimumValue={0}
            maximumValue={100}
            step={1}
            minimumTrackTintColor="red" // Set the color of the track
            thumbTintColor="red" // Set the color of the thumb
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <BasicText children="18 Years" />
            <BasicText children="30 Years" />
          </View>
        </View>
        <PickerView
          options={Complexion}
          selectedValue={complexion}
          onValueChange={itemValue => {
            setComplexion(itemValue);
          }}
          lable="Complexion"
        />
        <PickerView
          options={MotherTongue}
          selectedValue={motherTongue}
          onValueChange={itemValue => {
            setMotherTongue(itemValue);
          }}
          lable="Mother Tongue"
        />
        <PickerView
          options={Religion}
          selectedValue={religion}
          onValueChange={itemValue => {
            setReligion(itemValue);
          }} 
          lable="Religion"
        />
        <PickerView
          options={Caste}
          selectedValue={caste}
          onValueChange={itemValue => {
            setCaste(itemValue);
          }}
          lable="Caste"
        />
        <PickerView
          options={Country}
          selectedValue={selectedCountry}
          onValueChange={itemValue => {
            setSelectedCountry(itemValue);
          }}
          lable="Country"
        />
        <PickerView
          options={Education}
          selectedValue={education}
          onValueChange={itemValue => {
            setEducation(itemValue);
          }}
          lable="Education"
        />
        <CustomButton
          children="Save and Search"
          width="100%"
          color="white"
          backgroundColor={'#ED225C'}
          onPress={goToOtherProfile}
          style={{marginVertical: 10}}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownStyle: {
    marginVertical: 5,
    backgroundColor: 'transparent',
  },
});

export default FilterScreen;
