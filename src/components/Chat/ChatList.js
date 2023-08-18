import React, { FunctionComponent } from 'react'
import { View, Text, ImageSourcePropType, Image, StyleSheet, ScrollView } from 'react-native'
import { colors, fontFamilyStyles, getSize } from '../../../utils/dummyData'


const ChatList= (props) => {
    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'flex-start' }}>
                <View style={{}}>
                    <Image source={props.C_profileImage ? { uri: props.C_profileImage } : undefined} style={{ width: getSize(40), height: getSize(40), borderRadius: 20, resizeMode: 'contain' }} />
                </View>
                <View style={{ marginLeft: 5, padding: 5, backgroundColor: colors.bggreylightColor, borderRadius: 10}}>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={[styles.profileTitle, { flexDirection: 'row',  color: colors.blackColor, textAlign: 'justify' }]}>{props.C_Pname}
                        </Text>
                        <Text style={{ color: colors.greySubHeadColor, fontSize: getSize(12),right: 5 }}>{'12:50'}
                        </Text>
                    </View>
                    <Text style={{ color: colors.greySubHeadColor, fontSize: getSize(12), width: width_screen * 0.7 }}>{props.C_Pcomment}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default ChatList

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileHeader: {
        paddingHorizontal: 10,
    },
    profileTitle: {
        color: colors.greySubHeadColor,
        fontFamily: fontFamilyStyles.fontDomineBold,
        fontSize: 12,
    },

});