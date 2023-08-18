import {GestureResponderEvent, Text} from 'react-native';
import React, {FunctionComponent} from 'react';

export interface TextProps {
  onPress?: () => void;
  children: string;
  font?: string;
  color?: string;
  marginVertical?: string | number;
  marginHorizontal?: string | number;
  textAlign?: any;
  style?: object
}

const BasicText: FunctionComponent<TextProps> = props => {
  return (
    <Text
      onPress={props.onPress}
      // style={{
      //   fontSize: 13,
      //   color: props.color ? props.color : 'black',
      //   fontFamily: props.font,
      //   textAlign: props.textAlign ? props.textAlign : 'left',
      //   marginVertical: props.marginVertical ? props.marginVertical : 0,
      //   marginHorizontal: props.marginHorizontal ? props.marginHorizontal : 0
      // }} 
      style={[{fontSize: 13,
        color: props.color ? props.color : 'black',
        fontFamily: props.font,
        textAlign: props.textAlign ? props.textAlign : 'left',
        marginVertical: props.marginVertical ? props.marginVertical : 0,
        marginHorizontal: props.marginHorizontal ? props.marginHorizontal : 0},props.style]}
      
      >
      {props.children}
    </Text>
  );
};

export default BasicText;
