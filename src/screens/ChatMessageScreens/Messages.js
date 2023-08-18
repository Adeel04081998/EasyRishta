import { Alert, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Heading from '../../components/Texts/Heading';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useCallback } from 'react';
import { Send_Icon, colors, getSize, height_screen, width_screen } from '../../../utils/dummyData';
import ChatHeader from '../../components/Chat/ChatHeader';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'

import imageStore from '../../Mobx/mobxStore';


const MessagesScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState(null)
  const [userData, setUserData] = useState('')


  useEffect(() => {
    // getUsers()
    getUserDataFromAsync()
  }, [])

  const getUsers = async () => {
    const querySanp = await firestore().collection('Orgn').doc('Pixako').collection('Employee').doc('hr@gmail.com').get()
    // const allUsers = querySanp.docs.map(docSnap => docSnap.data())
    console.log("ALL--=->", querySanp._data.empId)
    // imageStore.setReceverId(allUsers[0].empId)s
    // setUsers(allUsers)
  }

  const getUserDataFromAsync = async () => {
   
    const querySnapShot =
    firestore()
    .collection('EasyRishtaChat')
    .doc('Community')
    .collection('Chats')
    .doc('Easyrishta3@gmail.com')
    .collection('messages')
        .orderBy('createdAt', 'desc');

    querySnapShot.onSnapshot(snapshot => {
      const allMessages = snapshot.docs.map(snap => {
        return {
          ...snap.data(), createdAt: new Date()
        }
      });
      setMessages(allMessages)
    })
  }
  // firestore()
  // .collection('EasyRishta')
  // .doc('Community')
  // .collection('People')
  // .doc(email)
  // .get()
  const onSend = useCallback((messageArray = []) => {
    // console.log("Imfmfm--=>", imageStore.image)
    // console.log('Mee-=-=?', messageArray[0])
    // console.log(imageStore?.senderId, imageStore?.receverId)
    const msg = messageArray[0]
    const myMessage = {
      ...msg,
      senderId: imageStore?.senderId,
      receverId: 'Easyrishta3@gmail.com',
      // avatar: userData ? userData.empImg : ''
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMessage))
    firestore()
      .collection('EasyRishtaChat')
      .doc('Community')
      .collection('Chats')
      .doc('Easyrishta3@gmail.com')
      .collection('messages')
      .add({
        ...myMessage,
        createdAt: firestore.FieldValue.serverTimestamp(),
      }).then((res) => {
        console.log("res", res);

      }).catch((err) => {
        console.log("err", err);
      })
  }, [])



  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: height_screen * 0.1 }}>
        <ChatHeader
          // onCallBack={() => navigation.goBack()}
          name={users ? users[0].empName : ''}
          empType={users ? users[0].empType : ''}
          img={users ? users[0].empImg : null}
        />
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        textInputStyle={{ color: colors.blackColor, fontSize: getSize(14), lineHeight: 20, borderRadius: 20 }}
        user={{
          _id: imageStore.logInUser.userEmail ?? '',
          // avatar: imageStore ? imageStore.image : '',
          name: imageStore.logInUser.userLastName ?? ''
        }}
        renderSend={props => {
          return (
            <View style={{ borderWidth: 1 }}>
              <Send {...props}
                containerStyle={styles.senContainer}>
                <Image
                  style={styles.imgSty}
                  source={Send_Icon}
                />
              </Send>
            </View>
          )
        }}


      />



    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  stretch: {
    width: '80%',
    height: '40%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor
  },
  horizontalLine: {
    borderBottomColor: colors.greySubHeadColor,
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'flex-end'
  },
  imgSty: {
    width: 22,
    height: 22,
    borderWidth: 1
  },
  senContainer: {
    width: width_screen * 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
