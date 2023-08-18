import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {FunctionComponent} from 'react';

//types
interface CustomProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children?: string;
  width?: string;
  backgroundColor?: string;
  color?: string;
  bottom?: number;
  borderWidth?: number;
  style?: any;
}

const CustomButton: FunctionComponent<CustomProps> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        props.style,
        styles.container,
        {
          backgroundColor: props.backgroundColor,
          bottom: props.bottom,
          width: props.width,
          borderWidth: props.borderWidth ? props.borderWidth : 0.5,
        },
      ]}>
      <Text style={[styles.children, {color: props.color}]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  children: {
    fontSize: 15,
    fontWeight: '400',
  },
});
