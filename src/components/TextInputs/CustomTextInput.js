import React, {FunctionComponent} from 'react';
import {TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';

const CustomTextInput = (props) => {
  return (
    <TextInput
      multiline
      placeholder={props.placeholder}
      placeholderTextColor={
        props.placeholderTextColor ? props.placeholderTextColor : 'black'
      }
      secureTextEntry={props.secure ? props.secure : false}
      style={[
        props.style,
        styles.container,
        {
          width: props.width ? props.width : '100%',
          color: 'black',
          borderColor: props.borderColor ? props.borderColor : 'black',
          borderWidth: props.borderWidth ? props.borderWidth : 0.5,
          paddingBottom: props.paddingBottom ? props.paddingBottom : 6,
        },
      ]}
      keyboardType={props.keyboard}
      value={props?.value}
      onSubmitEditing={e => props.onChange}
      onChangeText={e => props.onChange && props.onChange(e)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    paddingTop: 6,
  },
});

export default CustomTextInput;
