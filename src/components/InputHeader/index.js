import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import fonts from '../../utils/fonts';

const InputHeader = ({label,large}) => {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.steric}>*</Text>
        </View>
    )
}

export default InputHeader

const styles = StyleSheet.create({
    row:{
        alignItems:'center',
        flexDirection:'row'
    },
    steric:{
        color:'red'
    },
    label:{
        color:'black',
        fontFamily:fonts.med,
        fontSize:12
    }
})
