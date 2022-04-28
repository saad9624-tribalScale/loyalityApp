import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react';
import colors from '../../utils/colors';
import Loader from '../Loader';
import fonts from '../../utils/fonts';
const Button = ({title,onPress,isLoading}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btn}>
           {isLoading ? <Loader color='white'/> : <Text style={styles.text}>{title}</Text>} 

        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btn:{
        backgroundColor:colors.orange,
        height:45,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        marginTop:20
    },
    text:{
        color:'white',
        fontFamily:fonts.bold,
        fontSize:18

    }
})
