import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  FlatList
} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/Texts/Heading';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../../utils/icons';
import { useEffect } from 'react';
import { sharedGetAllUsers } from '../../components/sharedFunction/sharedFunction';
import { adminUser } from '../../../utils/dummyData';
const UserId = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState([]);
  const data = [
    {
      id: 1,
      name: 'Charlotte',
      message: 'Send interest in your profile',
      img: require('../../assets/images/girl.png'),
    },
    {
      id: 2,
      name: 'Charlotte',
      message: 'Send interest in your profile',
      img: require('../../assets/images/girl.png'),
    },
    {
      id: 3,
      name: 'Charlotte',
      message: 'Send interest in your profile',
      img: require('../../assets/images/girl.png'),
    },
    {
      id: 4,
      name: 'Charlotte',
      message: 'Send interest in your profile',
      img: require('../../assets/images/girl.png'),
    },
    {
      id: 5,
      name: 'Charlotte',
      message: 'Send interest in your profile',
      img: require('../../assets/images/girl.png'),
    },
  ];
  function handleBackButtonClick() {
    console.log("here");
    navigation.goBack()
    return true

  }
  const getNotifications = async () => {
    let notification = await sharedGetAllUsers('Notification')
    console.log("notification", notification);
    setUserData(notification)

  }
  const gotoOtherProfile2 = (record) => {
    navigation.navigate('OtherUsers2', {
      pressedUserDeatil: record
    });
  };
  useEffect(() => {
    getNotifications()
      BackHandler.addEventListener('hardwareBackPress',handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
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
            alignItems:'center'
          }}>
          <Icon
            type={'ionicon'}
            name="arrow-back-outline"
            size={30}
            color={'black'}
            onPress={()=>{handleBackButtonClick()}}
          />
          <Heading children="Notifications" />
          <View></View>
        </View>
        <FlatList
          data={userData ?? []}
          contentContainerStyle={{ flexGrow: 1, }}
          style={{ padding: 15, }}
          renderItem={({ item, index }) => {
            console.log("item", item);
            if (Object.keys(item).length) {
              if (item.isAdminRole || (item.userEmail === adminUser?.email)) return null
              return (
                <TouchableOpacity
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
                    justifyContent: 'space-between',
                  }} 
                  onPress={() => gotoOtherProfile2(item)}
                  >
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                    source={{ uri: item?.userPicture }}
                   
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 25,
                      fontWeight: 'bold',
                      width: '70%',
                      padding: 5
                    }}>
                    {item.userFirstName}
                    <Text style={{color: 'black', fontSize: 18, fontWeight:"normal"}}>
                      {''} {"Send interest in your profile"}
                    </Text>
                  </Text>
                  <Icon
                    type={'entypo'}
                    name="dots-three-vertical"
                    size={30}
                    color={'black'}
                  />
                </TouchableOpacity>
              )

            }
          }
          }
        />
        {/* {userData
          ? userData?.map((item, index) => {
            
              return (
                <TouchableOpacity
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
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                    source={item.img}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 25,
                      fontWeight: 'bold',
                      width: '70%',
                      padding: 5
                    }}>
                    {item.name}
                    <Text style={{color: 'black', fontSize: 18, fontWeight:"normal"}}>
                      {''} {item.message}
                    </Text>
                  </Text>
                  <Icon
                    type={'entypo'}
                    name="dots-three-vertical"
                    size={30}
                    color={'black'}
                  />
                </TouchableOpacity>
              );
            })
          : null} */}
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
