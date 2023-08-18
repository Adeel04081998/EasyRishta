import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

type Props = {
  selectedValue: any;
  onValueChange: () => void;
  lable: string;
  options: Array<any>;
  containerStyl:any
};

const PickerView = (props: Props) => {
  return (
    <View style={[styles.container,props.containerStyl]}>
      <Picker
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}
        >
        <Picker.Item label={props.lable} value="" style={{fontSize: 15, fontWeight: 'bold', color: "black"}} />
        {props?.options?.map(option => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
            style={{color:'black'}}
            
          />
        ))}
      </Picker>
    </View>
  );
};

export default PickerView;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 5,
  },
});
