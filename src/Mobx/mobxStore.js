import AsyncStorage from '@react-native-async-storage/async-storage';
import { makePersistable } from 'mobx-persist-store';

const {
  makeObservable,
  observable,
  action,
} = require('mobx');

class ImageStores {
  userEmail = ''
  userPassword = ''
  userInfo = {}
  allUsers = []
  logInUser = {}
  adminAddedUser = {}
  senderId = ''

  constructor() {

    makeObservable(
      this,
      {
        setUserEmail: action,
        setUserPassword: action,
        setUserInfo: action,
        getAllUsers: action,
        setLoginUser: action,
        setadminAddedUser: action,
        setSenderId: action,
        


      },
      { autoBind: true },
    );
    makePersistable(this, {
      name: 'userEmailPersistStore',
      properties: ['userEmail'],
      storage: AsyncStorage,
    })
    makePersistable(this, {
      name: 'userPasswordPersistStore',
      properties: ['userPassword'],
      storage: AsyncStorage,
    })
    makePersistable(this, {
      name: 'userInfoPersistStore',
      properties: ['userInfo'],
      storage: AsyncStorage,
    })
    makePersistable(this, {
      name: 'allUsersPersistStore',
      properties: ['allUsers'],
      storage: AsyncStorage,
    })
    makePersistable(this, {
      name: 'logInUserPersistStore',
      properties: ['logInUser'],
      storage: AsyncStorage,
    })
    makePersistable(this, {
      name: 'adminAddedUserPersistStore',
      properties: ['adminAddedUser'],
      storage: AsyncStorage,
    })
    makePersistable(this, {
      name: 'SenderIdPersistStore',
      properties: ['senderId'],
      storage: AsyncStorage,
    })

  }

  setUserEmail(email) {
    this.userEmail = email;
  }
  setUserPassword(pass) {
    this.userPassword = pass;
  }
  setUserInfo(info) {
    this.userInfo = info;
  }
  setLoginUser(user) {
    this.logInUser = user;
  }
  setadminAddedUser(user) {
    this.adminAddedUser = user;
  }
  setSenderId = (id) => {
    console.log("oid",id);
    this.senderId = id
  }
  getAllUsers(user) {
    this.allUsers = user;
  }

}

export default imageStore = new ImageStores();
