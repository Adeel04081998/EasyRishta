import { Alert, BackHandler, Image, ImageBackground, Keyboard, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useCallback } from 'react';
import { useEffect } from 'react';
import imageStore from '../../Mobx/mobxStore';
import { Send_Icon, adminUser, colors, getSize, girl_Icon, height_screen } from '../../../utils/dummyData';
import firestore from '@react-native-firebase/firestore';
import ChatHeader from '../../components/Chat/ChatHeader';

const DummyChat = ({ route }) => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [userData, setUserData] = useState('')
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    // console.log("route", route?.params?.user);
    // console.log("mageStore?.senderId", imageStore?.logInUser);
    let senderId = imageStore?.senderId ? imageStore?.senderId : imageStore?.logInUser?.userEmail;
    let docId = '';
    let selectedUser = route?.params?.user
    let receiverId = selectedUser?.userEmail
    let userPic = selectedUser?.userFirstName ? selectedUser?.userPicture : girl_Icon

    useEffect(() => {

        AllMessages()
    }, [])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);
    function handleBackButtonClick() {
        console.log("here");
        navigation.goBack()
        return true

    }
    const AllMessages = () => {
        if (selectedUser?.userEmail) {
            console.log("get admin", senderId, receiverId);
            // const docid2 =
            // route?.params?.data?.userId > imageStore?.senderId
            //   ? imageStore?.senderId + '-' + route?.params?.data?.userId
            //   : route?.params?.data?.userId + '-' + imageStore?.senderId;
            const docid2 =
                senderId > receiverId
                    ? senderId + '-' + receiverId
                    : receiverId + '-' + senderId;
            console.log("doc admin all user", docid2);

            const messageRef = firestore()
                .collection('EasyRishta')
                .doc('Community')
                .collection('Chats')
                .doc(docid2)
                .collection('messages')
                .orderBy('createdAt', 'desc')

            messageRef.onSnapshot(querySnap => {
                const allmsg = querySnap.docs.map(docsnap => {
                    const data = docsnap.data();
                    if (data.createdAt) {
                        return {
                            ...docsnap.data(),
                            createdAt: docsnap.data().createdAt.toDate(),
                        };
                    } else {
                        return {
                            ...docsnap.data(),
                            createdAt: new Date(),
                        };
                    }
                });
                console.log("allmsg==>", allmsg);
                setMessages(allmsg);
            });
        } else {
            //user login  ha

            const docid2 =
                adminUser.email > senderId
                    ? senderId + '-' + adminUser.email
                    // : adminUser.email + '-' + senderId
                    : senderId + '-' + adminUser.email;
            console.log("get user", docid2);


            const messageRef = firestore()
                .collection('EasyRishta')
                .doc('Community')
                .collection('Chats')
                .doc(docid2)
                .collection('messages')
                .orderBy('createdAt', 'desc');

            messageRef.onSnapshot(querySnap => {
                const allmsg = querySnap.docs.map(docsnap => {
                    const data = docsnap.data();
                    if (data.createdAt) {
                        return {
                            ...docsnap.data(),
                            createdAt: docsnap.data().createdAt.toDate(),
                        };
                    } else {
                        return {
                            ...docsnap.data(),
                            createdAt: new Date(),
                        };
                    }
                });
                console.log("all msg", allmsg);
                setMessages(allmsg);
            });
        }
    };
    const onSend = useCallback((messageArray) => {
        const msg = messageArray[0];

        if (selectedUser?.userEmail) {
            console.log("admin send");
            const mymsg = {
                ...msg,
                sentBy: senderId,
                sentTo: receiverId,

            };

            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, mymsg),
            );
            //     docId =
            // route?.params?.data?.userId > imageStore.senderId
            //   ? imageStore.senderId + '-' + route?.params?.data?.userId
            //   : route?.params?.data?.userId + '-' + imageStore.senderId;
            docId =
                receiverId > senderId
                    ? receiverId + '-' + senderId
                    : senderId + '-' + receiverId
            console.log("docId admin", docId);
            firestore()
                .collection('EasyRishta')
                .doc('Community')
                .collection('Chats')
                .doc(docId)
                .collection('messages')
                .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() });
        } else {
            // JAB USER LOGIN HA
            const mymsg = {
                ...msg,
                sentBy: senderId,
                sentTo: adminUser.email,
                // createdAt: new Date(),
            };

            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, mymsg),
            );

            // docId =
            //     imageStore?.userhrData.empId > imageStore.senderId
            //         ? imageStore.senderId + '-' + imageStore?.userhrData.empId
            //         : imageStore?.userhrData.empId + '-' + imageStore.senderId;
            docId =
                adminUser.email > senderId
                    ? adminUser.email + '-' + senderId
                    : senderId + '-' + adminUser.email
            console.log("docId", docId);
            firestore()
                .collection('EasyRishta')
                .doc('Community')
                .collection('Chats')
                .doc(docId)
                .collection('messages')
                .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() });
        }

    }, [])
    console.log("is keyboardx", isKeyboardVisible);
    return (
        <>

            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: height_screen * 0.1, }}>
                    <ChatHeader
                        userName={selectedUser?.userFirstName ? selectedUser?.userFirstName : 'Admin'}
                        img={selectedUser?.userFirstName ? selectedUser?.userPicture : 'https://firebasestorage.googleapis.com/v0/b/easy-rishta-ac1e8.appspot.com/o/girl.png?alt=media&token=693abe55-9c30-408b-9074-b000036049e9'}
                        back={() => { handleBackButtonClick() }}
                    />
                </View>

                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: senderId,
                        avatar: userPic,
                    }}
                    textInputStyle={{ color: colors.blackColor, fontSize: getSize(14), lineHeight: 20, borderRadius: 20 }}
                    renderBubble={props => {
                        return (
                            <Bubble
                                {...props}
                                wrapperStyle={{
                                    right: {
                                        backgroundColor: colors.redLightColor,
                                    },
                                    left: {
                                        backgroundColor: 'lightgray',
                                    },
                                }}
                            />
                        );
                    }}
                />


            </View>
        </>
    );
};

export default DummyChat;

const styles = StyleSheet.create({

});
