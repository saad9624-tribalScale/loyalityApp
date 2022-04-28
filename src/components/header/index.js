import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react';
import Images from '../../utils/Images';
import colors from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import fonts from '../../utils/fonts';

const Header = ({title}) => {
    const navigation=  useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backView}>
                <Image style={styles.back} source={Images.back}/>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity >
                <Image style={styles.back} />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    back:{
        width:20,
        height:20,
        tintColor:colors.orange,
        
    },
    backView:{
        backgroundColor:'white',
        width:35,
        height:35,
        borderRadius:17.5,
        alignItems:'center',
        justifyContent:'center'

    },
    container:{
        height:60,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        justifyContent:'space-between'
    },
    title:{
        color:'black',
        fontFamily:fonts.med,
        fontSize:16
    },

    
})
