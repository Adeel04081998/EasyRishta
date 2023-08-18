import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const SignInScreen = (props: Props) => {
  return (
    <ImageBackground
      source={require('../../assets/images/Splash.png')}
      resizeMode="contain"
      style={styles.image}></ImageBackground>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
