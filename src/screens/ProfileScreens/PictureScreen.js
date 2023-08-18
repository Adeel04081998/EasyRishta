import { Alert, Image, ImageBackground, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Heading from '../../components/Texts/Heading';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomButton from '../../components/Buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import { handleUpload, sharedGetAllUsers,  uploadImageToFirebase } from '../../components/sharedFunction/sharedFunction';
// import { launchImageLibrary } from 'react-native-image-picker';
import imageStore from '../../Mobx/mobxStore';
import { observer } from 'mobx-react';

const PictureScreen = () => {
  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  let logedInUser = imageStore.logInUser ?? {}
  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
      setFile(response.assets[0]);
    });

  };


  const goToProfileSix = () => {
    navigation.navigate('ProfileSix');
  };
  const goToHomeScreen = async () => {
    // let emailUser = imageStore.logInUser?.isAdminRole ? imageStore?.adminAddedUser?.userEmail : imageStore?.userEmail
    let emailUser = imageStore.logInUser?.isAdminRole ? imageStore?.adminAddedUser?.userEmail : (imageStore?.userEmail ? imageStore?.userEmail : imageStore.logInUser?.userEmail)
    if (file) {
      let pic = await handleUpload(file, emailUser)
      if (pic) {
        await firestore()
          .collection('EasyRishta')
          .doc('Community')
          .collection('People')
          .doc(emailUser)
          .update({
            userPicture: pic,
            isUserAddProfile: true
          })
          .then((res) => {
            console.log("res", res);
            navigation.navigate('Home');
          });
      }
    } else {
      showMessage({
        message: 'Please select picture',
        type: 'danger',
        duration: 2960,
        titleStyle: { fontSize: 13 },
      });
    }

  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="contain"
        style={{
          flex: 1,
          paddingHorizontal: 25,
          paddingVertical: 15,
        }}>
        <Heading children="Add Photo" />
        <View
          style={{
            flex: 0.8,
            display: 'flex',
            alignItems: 'center',
            marginTop: '5%',
            width: '100%',
          }}>
          {/* <View> */}
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              borderWidth: 10,
              borderColor: 'black',
            }}
            source={
              file
                ? { uri: file?.uri }
                : require('../../assets/images/dummyImage.webp')
            }
          />
          {/* </View> */}
          <CustomButton
            children="Choose Photo"
            width="50%"
            color="white"
            backgroundColor={'#ED225C'}
            onPress={() => chooseFile('photo')}
            style={{
              marginVertical: '10%',
              paddingVertical: '5%',
              paddingHorizontal: 15,
            }}
          />
          <CustomButton
            children="Finish"
            width="100%"
            color="white"
            backgroundColor={'#ED225C'}
            onPress={goToHomeScreen}
          />
          <CustomButton
            children="Prevous"
            width="100%"
            color="black"
            style={{ marginVertical: '4%' }}
            onPress={goToProfileSix}
          />
        </View>
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

export default observer(PictureScreen);
