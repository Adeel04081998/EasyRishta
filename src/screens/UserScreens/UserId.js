import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/Texts/Heading';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../../utils/icons';
import SubHeading from '../../components/Texts/SubHeading';
import BasicText from '../../components/Texts/BasicText';
const UserId = () => {
  //   const navigation = useNavigation();
  //   const goToProfileSix = () => {
  //     navigation.navigate('ProfileSix');
  //   };
  //   const goToUserId = () => {
  //     // if (file) {
  //     navigation.navigate('UserId');
  //     // } else {
  //     // Alert.alert("please choose image")
  //     // }
  //   };
  const data = [
    {
      id: 1,
      name: 'Charlotte',
      userId: 'EA401250',
      img: require('../../assets/images/girl.png'),
    },
    {
      id: 2,
      name: 'Charlotte',
      userId: 'EA401250',
      img: require('../../assets/images/girl.png'),
    },
    {
      id: 3,
      name: 'Charlotte',
      userId: 'EA401250',
      img: require('../../assets/images/girl.png'),
    },
    {
      id: 4,
      name: 'Charlotte',
      userId: 'EA401250',
      img: require('../../assets/images/girl.png'),
    },
    {
      id: 5,
      name: 'Charlotte',
      userId: 'EA401250',
      img: require('../../assets/images/girl.png'),
    },
  ];
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{
          flex: 1,
          paddingHorizontal: 25,
          paddingVertical: 15,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '10%',
          }}>
          <Icon
            type={'ionicon'}
            name="arrow-back-outline"
            size={30}
            color={'black'}
          />
          <Heading children="User ID" />
          <View></View>
        </View>
        {data
          ? data.map((item, index) => {
              return (
                <View
                key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    borderColor: 'black',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    paddingVertical: 10,
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginVertical: 5,
                  }}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                    source={item.img}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginLeft: '2%',
                    }}>
                    <SubHeading children={item.name} />
                    <BasicText children={item.userId} />
                  </View>
                </View>
              );
            })
          : null}
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

export default UserId;
