import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react';
import colors from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import fonts from '../../utils/fonts';

const Detail = ({image,text}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('Calendar',{text})}
         style={styles.detail}>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
    )
}

export default Detail

const styles = StyleSheet.create({
    detail: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:'white',
        height:60,
        marginHorizontal:20,
        marginTop:30,
    },
    image: {
        width: 25,
        height: 25,
        color: 'white',
        marginHorizontal:20,
        tintColor:colors.orange
    },
    text:{
        fontSize:14,
        fontFamily:fonts.med,
        color:'black',
        flex:1
    }
})
