// import Icon from '../../utils/icons'
import React, { useState } from 'react';
import Heading from '../Texts/Heading'
import BasicText from '../Texts/BasicText'
import Icon from '../../../utils/icons'
import { Image, StyleSheet, View } from 'react-native'
import { Send_Icon, colors, girl_Icon } from '../../../utils/dummyData'
import { useNavigation } from '@react-navigation/native';
const ChatHeader = (props) => {
  let nav=  useNavigation()

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15, }}>
                {/* <Icon type={'material'} onPress={props.onCallBack} name="arrow-back-ios" size={getSize(18)} color={colors.blackColor} /> */}
                <Icon
                    type={'material'}
                    name="arrow-back-ios"
                    size={30}
                    color={'black'}
                // style={{ bottom: 20 }}
                onPress={() => { props.back() }}

                />

                <Image
                    style={styles.imgSty}
                    source={props.img ? { uri: props.img } : null} 
                    // source={{uri:props?.imgUri}}
                    // source={girl_Icon}
                    


                    
                />
                <View style={{ marginLeft: 5 }}>
                    {/* <Titles children={props? props.name : ''} font={fontFamilyStyles.fontPopinsRegular} lineHeight={14} size={getSize(11)} color={colors.blackColor} />
                    <SmallText font={fontFamilyStyles.fontPopinsRegular} color={colors.blackColor} size={getSize(11)} children={props? props.empType : ''} />
             */}
                    <Heading children={props.userName} />
                    {/* <BasicText children={"here chat"} style={{ fontSize: 14, }} /> */}
                </View>
            </View>
            <View style={styles.horizontalLine}>
            </View>
        </View>
    )
}

export default ChatHeader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteColor
    },
    horizontalLine: {
        borderBottomColor: colors.greySubHeadColor,
        borderBottomWidth: 1,
        width: '100%',
        alignSelf: 'flex-end'
    },
    imgSty: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginLeft: 5
    }
});