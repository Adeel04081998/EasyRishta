import firestore from '@react-native-firebase/firestore';
import ImageStore from '../../Mobx/mobxStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment, { utc } from 'moment';
import storage from '@react-native-firebase/storage';
import axios from 'axios';

export const sharedGetAllUsers = async (CollectionName = 'People') => {
    try {
        let snapshot = ''
        let data = [];
        if (CollectionName === 'Contact') {
            let querySnapshot = await firestore().collection('EasyRishta').doc('Community').collection(CollectionName).doc(ImageStore.logInUser?.userEmail).collection('Interest').get()
            querySnapshot.forEach(function (doc) {
                if (doc.exists) { data.push({ ...doc.data() }); }
            });
            return data;
        } else if (CollectionName === 'Notification') {
            let querySnapshot = await firestore().collection('EasyRishta').doc('Community').collection(CollectionName).doc(ImageStore.logInUser?.userEmail).collection('Notif').get()
            querySnapshot.forEach(function (doc) {
                if (doc.exists) { data.push({ ...doc.data() }); }
            });
            return data;
        } else {
            snapshot = await firestore().collection('EasyRishta').doc('Community').collection(CollectionName).get();
            const documents = snapshot.docs.map((doc) => { return doc.data() });
            // console.log("documents",documents);
            if (CollectionName === 'People') { ImageStore.getAllUsers(documents); }
            return documents
        }
    } catch (error) { // console.log("error=>>> sharedGetAllUsers", error); 
    }

}

export const sharedSingleUser = async (collectionName = 'People', email) => {
    try {
        const snapshot = await firestore().collection('EasyRishta').doc('Community').collection(collectionName).doc(email).get();
        // console.log("snapshot sharedSingleUser", snapshot._data);
        if (collectionName === 'People') {
            await AsyncStorage.setItem(
                '@userInfo',
                JSON.stringify(snapshot?._data),
            ).then((res) => {
                // console.log("res sharedSingleUser", res);
            }).catch((err) => {
                console.log("err=>sharedSingleUser", err);
            });
            ImageStore.setLoginUser(snapshot?._data)
        }
        return snapshot?._data

    } catch (error) {
        // console.log("error=>>>sharedSingleUser", error);
    }

}
export const sharedCalculateAge = (dateOfBirth) => {
    if (dateOfBirth !== undefined) {
        console.log("dateOfBirth === 'undefined", dateOfBirth);
        const [day, month, year] = dateOfBirth.split('/');
        const birthDate = new Date(`${year}-${month}-${day}`);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        // Check if the user's birthday has occurred this year
        const birthMonth = birthDate.getMonth();
        const currentMonth = currentDate.getMonth();
        if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
            return age - 1; // Subtract 1 if the birthday has not yet occurred this year
        }
        return age;
    }


}
export const getEmail = async () => {
    try {
        const email = await AsyncStorage.getItem('@email')
        // console.log("emmail getEmail", email);
        return email
    } catch (error) {
        // console.log("error getEmail", error);

    }
}
export const sharedDateFormat = (date, formatStyl, zone) => {

    if (zone === 'utc') {
        let formatedDate = moment.utc(date).format(formatStyl)
        return formatedDate
    }
}

export const handleUpload = async (image, emailId) => {
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const imageName = `profile_${emailId}`;
    const imageRef = storage().ref().child(`profileImages/${image.fileName}`);
    await imageRef.putFile(image.uri); // Use putFile() to upload the image directly
    // Get the download URL for the uploaded image
    const downloadURL = await imageRef.getDownloadURL();
    // Save the downloadURL to the user's profile or database
    // For example, you could update the user's profile document in Firestore
    // with the downloadURL so you can retrieve it later.
    return downloadURL;
}

export const sharedFcmToken = async (record, email) => {
    await firestore()
        .collection('EasyRishta')
        .doc('Community')
        .collection('FcmToken')
        .doc(email ?? ImageStore.logInUser?.userEmail)
        .set({
            ...record
        }).then((res) => {
            console.log("res gotoContactList", res);

        }).catch((err) => {
            console.log("err gotoContactList", err);
        })
}
export const SharedSendNotification = async (token, senderDeatil, recipientDetail) => {
    try {


        // const response = await axios.post('https://superb-snickerdoodle-40eb52.netlify.app/.netlify/functions/api/send-notification', {
        //     token: token,
        //     senderDeatil,
        //     recipientDetail
        // });
        console.log("senderDeatil", senderDeatil);
        console.log("recipientDetail", recipientDetail);
        console.log("token", token);;
        await axios.post('https://superb-snickerdoodle-40eb52.netlify.app/.netlify/functions/api/send-notification', {
            token: token,
            senderDeatil,
            recipientDetail
        }).then((res) => {
            console.log("post call res", res);

        }).catch((err) => {
            console.log("post errr", err);

        });
        // const resul =await axios.get(' https://superb-snickerdoodle-40eb52.netlify.app/.netlify/functions/api/demo')
        //   console.log("response",response);

    } catch (error) {
        console.log("error", error);
    }
}

export const SharedInterestMatchContact = async (record, user) => {
    await firestore()
        .collection('EasyRishta')
        .doc('Community')
        .collection('Contact')
        .doc(ImageStore.logInUser?.userEmail ? ImageStore.logInUser?.userEmail : user?.userEmail)
        .collection('Interest')
        .doc(record.userEmail)
        .set({
            ...record
        }).then(async (res) => {
            console.log("res gotoContactList", res);
        }).catch((err) => {
            console.log("err gotoContactList", err);
        })
}
export const SharedInterestMatchContactWithSenderEnd = async (record, user) => {
    console.log("record",record);
    console.log("user",user);
    let updatedUser= ImageStore.logInUser ? ImageStore.logInUser : user
  

    await firestore()
        .collection('EasyRishta')
        .doc('Community')
        .collection('Contact')
        .doc(record.userEmail ? record.userEmail: record.userEmail)
        .collection('Interest')
        .doc(ImageStore.logInUser?.userEmail ? ImageStore.logInUser?.userEmail : user?.userEmail)
        .set({
            ...updatedUser
        }).then(async (res) => {
            console.log("res gotoContactList", res);
        }).catch((err) => {
            console.log("err gotoContactList", err);
        })
}
export const sharedSaveNotificationToFCM = async (record, user, notification) => {
    await firestore()
        .collection('EasyRishta')
        .doc('Community')
        .collection('Notification')
        .doc(ImageStore.logInUser?.userEmail ? ImageStore.logInUser?.userEmail : user?.userEmail)
        .collection('Notif')
        .doc(record.userEmail)
        .set({
            ...record,
            notification: notification
        }).then(async (res) => {
            console.log("res gotoContactList", res);
        }).catch((err) => {
            console.log("err gotoContactList", err);
        })
}