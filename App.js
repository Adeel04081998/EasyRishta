import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Modal as NewModal, AppRegistry } from 'react-native';
import FlashMessage from "react-native-flash-message";
import RootStack from './src/navigation/RootStack';
import { SharedInterestMatchContact, SharedInterestMatchContactWithSenderEnd, sharedFcmToken, sharedGetAllUsers, sharedSaveNotificationToFCM, sharedSingleUser } from './src/components/sharedFunction/sharedFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageStore from './src/Mobx/mobxStore';
import { Provider } from 'mobx-react';
import { useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import { Notifications } from 'react-native-notifications';
import messaging from '@react-native-firebase/messaging';
import Modal from "react-native-modal";
import CustomButton from './src/components/Buttons/CustomButton';



const App = () => {
  let email = imageStore.userEmail

  const [user, setUser] = useState({})
  const [isModal, setIsModal] = useState(false)
  const [sender, setSender] = useState('')
  const [receiver, setReceiver] = useState('')
  const [notification, setNotification] = useState('')


  useEffect(() => {
    Notifications.registerRemoteNotifications();
    //handle in foregroundState
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const { data, notification } = remoteMessage;
      Notifications.postLocalNotification({
        title: notification.title ?? '',
        body: notification.body ?? '',
        sound: 'default',
        priority: 'high',
        data: data
      })
      let recipientDetail = JSON.parse(data?.recipientDetail)
      let senderDetail = JSON.parse(data?.senderDetail)
      manageNotificaiton(senderDetail, recipientDetail, notification)
      Notifications.events().registerNotificationOpened((notification, completion) => {
        console.log('Notification opened:', notification);
        // Perform actions when a notification is opened
        // For example, navigate to a specific screen or perform a task

        // Call completion to indicate that you've handled the notification opening
        completion();
      });
    });
    
    //handle in background kill state
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // Handle the notification data in the background or terminated state
      console.log('Notification received in background:', remoteMessage);
      const { data, notification } = remoteMessage;
      let recipientDetail = JSON.parse(data?.recipientDetail)
      let senderDetail = JSON.parse(data?.senderDetail)
      manageNotificaiton(senderDetail, recipientDetail, notification)

    });

    // when user clicks on notification to open from background case

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage,);
      const { data, notification } = remoteMessage;
      let recipientDetail = JSON.parse(data?.recipientDetail)
      let senderDetail = JSON.parse(data?.senderDetail)
      manageNotificaiton(senderDetail, recipientDetail, notification)
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('Notification caused app to open from quit state: getInitialNotification', remoteMessage,);

        if (remoteMessage) {
          // console.log('Notification caused app to open from quit state: getInitialNotification', remoteMessage.notification,);
          const { data, notification } = remoteMessage;
          let recipientDetail = JSON.parse(data?.recipientDetail)
          let senderDetail = JSON.parse(data?.senderDetail)
          manageNotificaiton(senderDetail, recipientDetail, notification)
        }

      });
//     const initialNotification = await messaging().getInitialNotification();
// console.log("initialNotification",initialNotification);

  }, []);
  useEffect(() => {
    AsyncStorage.getItem('@userInfo').then(res => {
      console.log("res root stack=>", res);
      let result = JSON.parse(res)
      if (result !== null) {
        setUser(JSON.parse(res))
      }
    });
    getEmail()
    sharedGetAllUsers()
    // fetchData()
  }, [!email]);

  const manageNotificaiton = (senderDetail, recipientDetail, notification) => {
    setIsModal(true)
    setSender(senderDetail)
    setReceiver(recipientDetail)
    setNotification(notification)
  }
  const getEmail = async () => {
    await AsyncStorage.getItem('@email').then((res) => {
      console.log("res get emails async", res);
      if (res) { sharedSingleUser('People', res) }
    }).catch((err) => {
      console.log("err get emails async", err);
    });
  }
  const customModal = () => {
    return (
      <NewModal
        animationType="slide"
        transparent={true}
        visible={isModal}

      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{`Interest Request send by ${sender?.userFirstName}`}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between', width: '100%', padding: 20 }}>
              <CustomButton
                children="Accept"
                width="40%"
                color="black"
                backgroundColor={'#ED225C'}
                style={{ padding: 10 }}
                onPress={() => {
                  SharedInterestMatchContact(sender, user)
                  // SharedInterestMatchContactWithSenderEnd(sender,user)
                  sharedSaveNotificationToFCM(sender, user, notification)
                  setIsModal(!isModal)
                }}
              />
              <CustomButton
                children="Reject"
                width="40%"
                color="black"
                backgroundColor={'#ED225C'}
                onPress={() => {
                  // SharedInterestMatchContact(notification)
                  sharedSaveNotificationToFCM(sender, user, notification)
                  setIsModal(!isModal)
                }}
              />
            </View>
          </View>
        </View>
      </NewModal>
    )
  }
  console.log("isModal", sender?.userFirstName);
  return (
    <View style={{ flex: 1, }}>
      <Provider store={imageStore}>
        <RootStack isAdel={true} />
        <FlashMessage position="top" />

        {isModal ? customModal() : null}
      </Provider>

    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,

  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '25%',
    width: '80%',

  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 16
  },
});

