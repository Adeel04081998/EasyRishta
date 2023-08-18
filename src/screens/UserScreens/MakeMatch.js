import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Heading from '../../components/Texts/Heading';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../utils/icons';
import SubHeading from '../../components/Texts/SubHeading';
import BasicText from '../../components/Texts/BasicText';
import firestore from '@react-native-firebase/firestore';
import ImageStore from '../../Mobx/mobxStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sharedCalculateAge } from '../../components/sharedFunction/sharedFunction';
import { adminUser, colors, girl_Icon, height_screen } from '../../../utils/dummyData';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const MakeMatch = ({ route }) => {
  const navigation = useNavigation();
  let users = ImageStore.allUsers
  let loginuser = route.params.loginedUser
  const [updatedUser, setUpdatedUser] = useState([]);
  const gotoFilter = () => {
    navigation.navigate('FilterScreen');
  };
  const gotoOtherProfile2 = (item) => {
    navigation.navigate('OtherUsers2', {
      pressedUserDeatil: item
    });
  };
  // console.log("users aall",users);
  console.log("loginuser", loginuser);

  useEffect(() => {
    let filterdUser = users.filter((x, i) => {
      if (x.isAdminRole || (x.userEmail === adminUser?.email)) return null
      if (loginuser?.userGender !== x.userGender && (sharedCalculateAge(loginuser.userDateofBirth) >= sharedCalculateAge(x.userDateofBirth)) && (loginuser.userCaste === x?.userCaste)) { return x }
      return false
    })
    console.log("filteredUser", filterdUser);
    setUpdatedUser(filterdUser)
  }, []);
  function handleBackButtonClick() {
    console.log("here");
    navigation.goBack()
  
    return true

  }

  useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress',handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  const renderRecordUi = (x, i) => {
    let name1 = x.userFirstName.concat(" ", x.userLastName)
    let desc1 = "Profile Created By Self ";
    desc1 += sharedCalculateAge(x.userDateofBirth) + "Years, "
    desc1 += x.userHeightInFeet + " " + x.userHeightInInch + ", "
    desc1 += x.userReligion + ", "
    desc1 += x.userProvince + ",  " + x.userCountry
    desc1 += ", Read More ...";
    console.log("X", x);
    return (
      <View style={{ borderWidth: 0.5, borderRadius: 20, borderColor: colors.bggreylightColor, marginTop: 15 }}>
        <Image
          style={{
            width: '100%',
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: 15,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            height: height_screen * 0.4
          }}
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/easy-rishta-ac1e8.appspot.com/o/profileImages%2Frn_image_picker_lib_temp_cb3bd066-5edc-4417-8a58-7fd9e7ab68e5.jpg?alt=media&token=9f3606df-bea9-4a91-92a2-3f55cc38e12c' }}
        // source={girl_Icon}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={{ flex: 1 }}>
            <Heading children={name1} />
            <BasicText children={desc1} style={{ fontSize: 14, }}
            />
          </View>
          <TouchableOpacity onPress={() => gotoOtherProfile2(x)}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 25 }}
              source={require('../../assets/images/makematchicon.png')}
            />
          </TouchableOpacity>
        </View>

      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
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
          <Icon
            type={'ionicon'}
            name="arrow-back-outline"
            size={30}
            color={'black'}
            onPress={() => { handleBackButtonClick() }}
          />
          <Heading children="Make Match" />
          <View></View>
          {/* <Icon
            type={'ant'}
            name="filter"
            size={30}
            color={'black'}
            onPress={gotoFilter}
          /> */}
        </View>

        {updatedUser.length ? <FlatList
          data={updatedUser}
          renderItem={({ item, index }) => renderRecordUi(item, index)}
        /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Heading children={"No Match Found"} />
        </View>


        }
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MakeMatch;
