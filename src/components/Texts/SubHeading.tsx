import {GestureResponderEvent, Text} from 'react-native';
import React, {FunctionComponent} from 'react';

export interface TextProps {
  onPress?: () => void;
  children: string;
  font?: string;
  textAlign?: any;
}

const SubHeading: FunctionComponent<TextProps> = props => {
  return (
    <Text
      onPress={props.onPress}
      style={{
        fontSize: 20,
        color: 'black',
        fontFamily: props.font,
        textAlign: props.textAlign ? props.textAlign : 'left',
        fontWeight: "bold"
      }}>
      {props.children}
    </Text>
  );
};

export default SubHeading