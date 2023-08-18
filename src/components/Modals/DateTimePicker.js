import React, { FunctionComponent } from 'react';
import { TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-date-picker';

const DateTimePicker = (props) => {
    return (
        // <DatePicker
        //     mode={props.mode}
        //     modal={props.isModal}
        //     open={props.isOpen}
        //     date={props.date}
        //     onConfirm={(date) => { props.onConfirm(date) }}
        //     onCancel={() => { props.onCancel() }}
        //     onDateChange={(date) => { console.log("date",date);}}
        //     confirmText={props.confirmText}
        //     cancelText={props.cancelText}
        //     style={{ height:140, position:'absolute'}}

        // />
        <DatePicker
            modal={props.modal}
            open={props.open}
            style={{ bottom:30}}
            date={new Date()}
            mode={props.mode}
            placeholder={props.placeholder}
            format={props.format} // Change the format as per your requirement
            confirmBtnText={props.confirmBtnText}
            cancelBtnText={props.cancelBtnText}
            // customStyles={{
            //     dateIcon: {
            //         display: 'none',
            //     },
            //     dateInput: {
            //         borderWidth: 0,
            //     },
            //     // Add more custom styles if needed
            // }}
        
            onDateChange={(date) => { props.onDateChange(date) }}
            androidVariant='iosClone'
            onConfirm={(date) => { props.onConfirm(date) }}
            onCancel={(date) => { props.onCancel(date) }}
            theme='light'

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

export default DateTimePicker;
