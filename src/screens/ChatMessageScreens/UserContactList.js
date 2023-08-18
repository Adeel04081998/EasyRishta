import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import imageStore from '../../Mobx/mobxStore';
import Icon from '../../../utils/icons';
import { colors, getSize, girl_Icon, height_screen, width_screen } from '../../../utils/dummyData';
import Heading from '../../components/Texts/Heading';


const UserContactList = () => {
  const navigation = useNavigation();
  const [Visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [userData, setUserdata] = useState();
  const [filteredProducts, setFilteredProducts] = useState(imageStore?.logInUser?.isAdminRole ? imageStore.allUsers : []);
  let loginuser = imageStore.logInUser

  useEffect(() => {
    getDatasub();
  }, []);
  useEffect(() => {

    let filterdUser = imageStore.allUsers.filter((x, i) => {

      if (x.isAdminRole || (x.userEmail === loginuser?.userEmail)) return null
      if (x.userGender !== loginuser?.userGender) { return x }
      return false
    })
    setFilteredProducts(filterdUser)
  }, [])
  const getDatasub = async () => {
    const contactList = filteredProducts?.sort(function (a, b) {
      if (a?.userFirstName < b?.userFirstName) {
        return -1;
      }
      if (a?.userFirstName > b?.userFirstName) {
        return 1;
      }
      return 0;
    });
    setFilteredDataSource(contactList);
    setMasterDataSource(contactList);
  };


  const searchFilterFunction = text => {
    if (text) {
      const newData = filteredDataSource.filter(function (item) {
        const itemData = item?.userFirstName
          ? item?.userFirstName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  function handleBackButtonClick() {
    console.log("here");
    // // navigation.navigate('Home');
    // if (route?.params?.asAdmin) {
    //   navigation.navigate('Home');
      
    // } else {
    //   navigation.goBack()
    // }
    navigation.goBack()
    return true

  }

  useEffect(() => {
    
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    

  }, []);
  console.log('search--->>', imageStore.allUsers);

  return (
    <View style={styles.Container}>

      <ImageBackground
        // source={require('../../assets/images/bg.png')}
        source={require('../../assets/images/bg.png')}

        resizeMode="contain"
        style={{ flex: 1 }}>
        {filteredDataSource.length ?
          <><View style={styles.Header}>
            <Icon
              type={'material'}
              onPress={() => {
               handleBackButtonClick()
                // setSearch('')
              }
              }
              name="arrow-back-ios"
              size={getSize(25)}
              color={colors.blackColor}
          
            />
            <TextInput
              placeholder={'Type a name or number...'}
              style={styles.input}
              autoFocus={true}
              placeholderTextColor={'black'}
              onChangeText={text => searchFilterFunction(text)}
              onClear={text => searchFilterFunction('')}
              value={search}
              underlineColorAndroid="transparent"
            />
          </View>

            <FlatList
              data={filteredDataSource}
              style={{width:'100%',paddingHorizontal:10}}
              contentContainerStyle={{ justifyContent:'center',}}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={({ index, item }) => {
                console.log("item", item);
                if (item.isAdminRole) return null
                let name = item.userFirstName.concat(" ", item.userLastName)
                const chatuserdata = {
                  userName: item.name,
                  userId: item.userEmail,
                  userDesignation: item.userDesignation,
                  userImage: '',
                };
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Chat', { user: item })
                    }
                    style={styles.ContactList}>
                    <Image
                      style={styles.ContactImage}
                      // source={girl_Icon}
                      source={{uri:item?.userPicture}}
                    />
                    <View style={styles.ContactName}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' ,color:colors.blackColor}}>
                        {name}
                      </Text>
                      <Text style={{ fontSize: 15 ,color:colors.blackColor}}>{item.userDesignation}</Text>
                    </View>
                  </TouchableOpacity>
                )

              }}
            />
          </>
          : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Heading children={"No Record Found"} />
          </View>}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  Header: {
    height: height_screen * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.greySubHeadColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',
    // borderWidth:1,backgroundColor:"red"
  },
  BackIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  HideIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ContactList: {
    margin: 7,
    flexDirection: 'row',
    borderRadius: 15,
    alignItem: 'center',
    borderWidth: 0.5,
    borderEndColor: 'gray',
    backgroundColor: colors.whiteColor
  },
  ContactImage: {
    // backgroundColor: 'lightgray',
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 0.4,
  },
  ContactName: {
    alignItem: 'center',
    justifyContent: 'center',
  },
  input: {
    color: 'black',
    fontSize: 17,
    width: width_screen * 0.9,

    // borderWidth:1
  },
});

export default UserContactList;
