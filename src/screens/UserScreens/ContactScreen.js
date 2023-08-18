import { BackHandler, FlatList, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Heading from '../../components/Texts/Heading';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../utils/icons';
import SubHeading from '../../components/Texts/SubHeading';
import BasicText from '../../components/Texts/BasicText';
import CustomButton from '../../components/Buttons/CustomButton';
import { useEffect } from 'react';
import { adminUser, girl_Icon } from '../../../utils/dummyData';
import imageStore from '../../Mobx/mobxStore';
import { sharedGetAllUsers } from '../../components/sharedFunction/sharedFunction';
import { useState } from 'react';

const ContactScreen = () => {
  const navigation = useNavigation();

  let loginuser = imageStore.logInUser ?? {}
  const [userData, setUserData] = useState([]);

  const data = [
    {
      id: 1,
      name: 'Charlotte',
      role: 'Fashion Designer',
      age: '25years, 5ft 11in',
      city: 'christian, Newyork',
      img: require('../../assets/images/girl.png'),
    },
    {
      id: 2,
      name: 'Charlotte',
      role: 'Fashion Designer',
      age: '25years, 5ft 11in',
      city: 'christian, Newyork',
      img: require('../../assets/images/girl.png'),
    },
    {
      id: 3,
      name: 'Charlotte',
      role: 'Fashion Designer',
      age: '25years, 5ft 11in',
      city: 'christian, Newyork',
      img: require('../../assets/images/girl.png'),
    },
    {
      id: 4,
      name: 'Charlotte',
      role: 'Fashion Designer',
      age: '25years, 5ft 11in',
      city: 'christian, Newyork',
      img: require('../../assets/images/girl.png'),
    },

  ];
  const contactInterestList = async () => {
    let users = await sharedGetAllUsers('Contact')
    console.log("users", users);
    setUserData(users)

  }
  useEffect(() => {
    contactInterestList()
  }, [])
  const gotoOtherProfile2 = (record) => {
    navigation.navigate('OtherUsers2', { pressedUserDeatil: record });
  };
  function handleBackButtonClick() {
    console.log("here");
    navigation.goBack()
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{
          flex: 1,
          // paddingHorizontal: 25,
          paddingVertical: 15,

        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '90%',
            alignItems: 'center'

          }}>
          <Icon
            type={'ionicon'}
            name="arrow-back-outline"
            size={30}
            color={'black'}
            onPress={() => { handleBackButtonClick() }}
          />
          <Heading children="Contact List" />
          {/* <View></View> */}
        </View>
        {/* {data
          ? data.map((item, index) => {
              return (
                <View
                key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    borderColor: 'black',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    paddingVertical: 10,
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginVertical: 5,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                      }}
                      source={item.img}
                    />
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: '2%',
                        width: '70%',
                      }}>
                      <SubHeading children={item.name} />
                      <BasicText children={item.role} />
                      <BasicText children={item.age} />
                      <BasicText children={item.city} />
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'flex-end',
                      marginTop: 10,
                    }}>
                    <CustomButton
                      children="send interest"
                      width="50%"
                      backgroundColor="red"
                    />
                  </View>
                </View>
              );
            })
          : null} */}
        <FlatList
          data={userData ?? []}
          // numColumns={2}
          contentContainerStyle={{ flexGrow: 1, }}
          style={{ padding: 15, }}
          renderItem={({ item, index }) => {
            console.log("item", item);
            if (item.isAdminRole || (item.userEmail === adminUser?.email)) return null
            let name = item.userFirstName?.concat(" ", item?.userLastName)
            if (Object.keys(item).length) {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    // width: '100%',
                    borderColor: 'black',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    paddingVertical: 10,
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginVertical: 5,
                    marginHorizontal: 10
                  }}
                  onPress={() => gotoOtherProfile2(item)}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                      }}
                      source={{ uri: item?.userPicture }}
                    />
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: '2%',
                        width: '70%',
                      }}>
                      <SubHeading children={name} />
                      {item?.userOccupation ? <BasicText children={item?.userOccupation ?? ""} /> : null}
                      {item?.userDesignation ? <BasicText children={item?.userDesignation ?? ''} /> : null}
                      {item?.userCity ? <BasicText children={item?.userCity} /> : null}
                      {loginuser?.isAdminRole && item?.userPhone ? <BasicText children={item?.userPhone} /> : null}
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'flex-end',
                      marginTop: 10,
                    }}>

                  </View>
                </TouchableOpacity>


              )

            }
          }
          }
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
});

export default ContactScreen;
