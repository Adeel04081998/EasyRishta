// User List Screen

import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Heading from '../../components/Texts/Heading';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../utils/icons';
import BasicText from '../../components/Texts/BasicText';
import SubHeading from '../../components/Texts/SubHeading';
import imageStore from '../../Mobx/mobxStore';
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import CustomButton from '../../components/Buttons/CustomButton';
import { girl_Icon } from '../../../utils/dummyData';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import { SharedSendNotification, sharedGetAllUsers, sharedSingleUser } from '../../components/sharedFunction/sharedFunction';
import axios from 'axios';

const url = 'http://localhost:3000/send-notification'


const height = Dimensions.get('screen').height
const OtherUsers = ({ route }) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(imageStore?.logInUser?.isAdminRole ? imageStore.allUsers : []);
  let loginuser = route?.params?.loginedUser
  const data = [
    {
      img: require('../../assets/images/girl.png'),
      name: 'Charlotte',
      job: 'Fashion Designer',
    },
    {
      img: require('../../assets/images/girl.png'),
      name: 'Ellice',
      job: 'Fashion Designer',
    },
    {
      img: require('../../assets/images/girl.png'),
      name: 'Louis',
      job: 'Fashion Designer',
    },
  ];
  const gotoOtherProfile2 = (record) => {
    navigation.navigate('OtherUsers2', {
      pressedUserDeatil: record
    });
  };
  const sendNotification = async (obj) => {
    try {

      // Simulate a notification payload
      const notificationPayload = {
        senderDetail: loginuser
      };
      const response = await axios.post('http://192.168.100.65:3000/send-notification', {
        token: obj?.token,
        recipient: obj,
        sender: loginuser
      });
      console.log("response", response);

    } catch (error) {
      console.log("error", error);
    }


    // fetch('http://127.0.0.1:3000/send-notification', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     token:"fDNSU-V9Ti-G-F7qhy3G6g:APA91bEwtVMUUlpZnoekzbij5nJxkY2r5qF1iKnIB2RoUoZLRkTn5QJ1dJDDehdNDOeoVl_L4IXyekwAGuNPvn_PAA6S8gDulI9H3zl66r7bF5KxHmFBXcl35E0PvAMt2gJ9qCC5sv1Y"
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Notification sent:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error sending notification:===>', error);
    //   });




  }
  const gotoContactList = async (record) => {
    let tokenDetail = await sharedSingleUser('FcmToken', record.userEmail)
    SharedSendNotification(tokenDetail.token,  loginuser,record)
    // await firestore()
    //   .collection('EasyRishta')
    //   .doc('Community')
    //   .collection('Contact')
    //   .doc(imageStore.logInUser?.userEmail)
    //   .collection('Interest')
    //   .doc(record.userEmail)
    //   .set({
    //     ...record
    //   }).then(async (res) => {
    //     // console.log("res gotoContactList", res);
    //     let tokenDetail = await sharedSingleUser('FcmToken', record.userEmail)
    //     // sendNotification(tokenDetail)
    //   SharedSendNotification(tokenDetail.token,record,loginuser)
    //     showMessage({
    //       message: "Interest send to user successfully",
    //       type: 'danger',
    //       titleStyle: { fontSize: 13 },
    //     })
    //   }).catch((err) => {
    //     console.log("err gotoContactList", err);
    //   })
  };
  const handleSearch = (query) => {
    setSearch(query);
    const filtered = imageStore?.allUsers.filter(
      (product) =>
        product?.userFirstName.toLowerCase().indexOf(query?.trim()?.toLowerCase()) !== -1
    );
    setFilteredProducts(filtered);
  };

  function handleBackButtonClick() {
    if (route?.params?.asAdmin) {
      console.log("hy");
      navigation.goBack()

    } else {
      navigation.goBack()
    }
    return true

  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  useEffect(() => {
    let filterdUser = imageStore.allUsers.filter((x, i) => {
      if (x.isAdminRole || (x.userEmail === loginuser?.userEmail)) return null
      if (!loginuser?.isAdminRole) {
        return x
        // if (x.userGender !== loginuser?.userGender) { return x }
      } else {
        return x
      }

      return false
    })
    setFilteredProducts(filterdUser)
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{
          flex: 1,
          // paddingTop: 15,
          paddingVertical: 15
        }}>
        <View
          style={{
            // display: 'flex',
            // flexDirection: 'row',
            // justifyContent: 'space-between',
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
          <Heading children={imageStore?.logInUser?.isAdminRole ? "Users" : "Other People"} />
          <View>
          </View>
        </View>
        {imageStore?.logInUser?.isAdminRole ? <View style={{ margin: 20, width: '90%' }}>

          <CustomTextInput
            placeholder="Search*"
            placeholderTextColor="black"
            value={search}
            onChange={e => handleSearch(e)}
          />
        </View> : null}

        {filteredProducts.length ? <FlatList
          data={filteredProducts}
          // numColumns={2}
          contentContainerStyle={{ flexGrow: 1, }}
          style={{ padding: 15, }}
          renderItem={({ item, index }) => {
            let name = item.userFirstName?.concat(" ", item?.userLastName)
            if (item.isAdminRole || (item.userEmail === loginuser?.userEmail)) return null

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
                      {item?.userOccupation ? <BasicText children={item.userOccupation ?? ""} /> : null}
                      {item?.userDesignation ? <BasicText children={item.userDesignation ?? ''} /> : null}
                      {item?.userCity ? <BasicText children={item.userCity} /> : null}
                      {loginuser?.isAdminRole && item?.userPhone ? <BasicText children={item.userPhone} /> : null}

                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'flex-end',
                      marginTop: 10,
                    }}>
                    {!loginuser.isAdminRole ? <CustomButton
                      children="send interest"
                      width="50%"
                      backgroundColor="red"
                      onPress={() => gotoContactList(item)}
                    /> : null}
                  </View>
                </TouchableOpacity>
              )
            }
          }
          }
        /> : <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <SubHeading children={"No Record Found"}
          />
        </View>
        }
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({});

export default OtherUsers;
