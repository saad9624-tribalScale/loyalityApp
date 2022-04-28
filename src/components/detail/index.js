import { StyleSheet, Text, View,Image, TouchableOpacity,Linking } from 'react-native'
import React from 'react';
import colors from '../../utils/colors';
import { Link } from '@react-navigation/native';
import fonts from '../../utils/fonts'
const Detail = ({image,text,color,action,location,actionUrl}) => {

    const openExternal = ()=>{
        if(action =='google'){
            const fullAddress = `79 old York Rd Chesterfield, NJ 08515`
            const url = Platform.select({
                ios: `maps:0,0?q=${fullAddress}`,
                android: `geo:0,0?q=${fullAddress}`,
              })
              Linking.openURL(url)
        }
        else if(action=='email'){
            Linking.openURL('mailto:auctions@sunrise-antiques.com')

        }
        else if(action == 'phone'){
            var phoneNumber = `888-639-4443`
            Linking.openURL(`tel:${phoneNumber}`)
        }
        else if(action == 'facebook'){
            Linking.openURL('https://www.facebook.com/sunriseantiquesandauctioneers');

        }
        else if(action == 'website'){
            Linking.openURL('https://www.sunrise-antiques.com/');

        }
        else if(action == 'url'){
            Linking.openURL(actionUrl);

        }

    }

   
      
    return (
        <TouchableOpacity onPress={()=>openExternal()} style={styles.detail}>
        <Image source={image} style={[styles.image,{tintColor:color? color : 'white'}]} />
        <Text style={[styles.text,{color:color? color :  'white'}]}>{text}</Text>
    </TouchableOpacity>
    )
}

export default Detail

const styles = StyleSheet.create({
    detail: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal:20,
        marginVertical:5,
        marginRight:30,
    
    },
    image: {
        width: 15,
        height: 15,
        resizeMode:'contain',
        tintColor:'white',
        marginRight:10
    },
    text:{
        color:'white',
        fontFamily:fonts.med ,
        fontSize:12,
        marginTop:2
    }
})
