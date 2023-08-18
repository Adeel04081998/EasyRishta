// User Detail Screen

import { Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Heading from '../../components/Texts/Heading';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../utils/icons';
import BasicText from '../../components/Texts/BasicText';
import SubHeading from '../../components/Texts/SubHeading';
import PickerView from '../../components/Picker/PickerView';
import {
  Complexion,
  MotherTongue,
  Religion,
  Caste,
  Country,
  Cities,
  dataArray,
  userDetailKeyValueMatch,
} from '../../../utils/dummyData';
const OtherUsers2 = ({ route }) => {
  const navigation = useNavigation()
  let userDetail = route.params?.pressedUserDeatil ?? {}
  console.log("userDetail",userDetail);
  const [complexion, setComplexion] = useState(userDetail.userSkinTone ?? '')
  const [motherTongue, setMotherTongue] = useState(userDetail.userTongue ?? '')
  const [religion, setReligion] = useState(userDetail.userReligion ?? '')
  const [caste, setCaste] = useState(userDetail.userCaste ?? '')
  const [city, setCity] = useState(userDetail.userCity ?? '')
  const [country, setCountry] = useState(userDetail.userCountry ?? '')
  return (
    <ScrollView style={{   }}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{
          flex: 1,
          padding:20,
        }}>
        <View
          style={{
            
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width:'100%',
            alignItems:'center',
            // backgroundColor:'red'
          }}>
          <Icon
            type={'ionicon'}
            name="arrow-back-outline"
            size={30}
            color={'black'}
            onPress ={ ()=>{navigation.goBack()}}
          />
          <Heading children="Other People" />
          <View></View>
        </View>
        
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            paddingVertical: 10,
          }}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
            source={{uri:userDetail.userPicture}}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: '2%',
            }}>
            <SubHeading children={userDetail.userFirstName.concat(" ", userDetail.userLastName)} />
            <BasicText children={userDetail.userDesignation} />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            borderColor: 'black',
            borderWidth: 0.5,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            // backgroundColor:'red'
          }}>
          {dataArray?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: '50%',
                  borderColor: 'black',
                  borderWidth: 0.5,
                  padding: 5,
                }}>
                <SubHeading children={item.question} />
                <BasicText children={userDetail?.[item.value]} />
              </View>
            );
          })}
        </View>
        {
          userDetailKeyValueMatch.map((x,i) => {
            return (
              <View style={{ margin:1}} key={i}>
                <SubHeading children={x.label} />
                <BasicText children={userDetail?.[x.value]} 
                // style={{backgroundColor:'green'}}
                />
              </View>
            )
          })
        }
      </ImageBackground>
    </ScrollView>
  );
};

export default OtherUsers2;
