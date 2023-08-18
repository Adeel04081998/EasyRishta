import {GestureResponderEvent, Text} from 'react-native';
import React, {FunctionComponent} from 'react';

export interface TextProps {
  onPress?: () => void;
  children: string;
  font?: string;
  textAlign?: any;
}

const Heading: FunctionComponent<TextProps> = props => {
  return (
    <Text
      onPress={props.onPress}
      style={{
        fontSize: 30,
        color: 'black',
        fontFamily: props.font,
        textAlign: props.textAlign ? props.textAlign : 'left',
        fontWeight: "bold"
      }}>
      {props.children}
    </Text>
  );
};

export default Heading;
