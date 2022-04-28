import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import Header from '../../components/header';
import ScheduleComponent from '../../components/schedule';
import colors from '../../utils/colors';
import Images from '../../utils/Images';
import { vs } from 'react-native-size-matters';
import fonts from '../../utils/fonts';

const Schedule = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor:'#e8e8e8',flex:1}}>
            <Header title='Schedule Your Consignment Today'/>
            <ScrollView>
            <ScheduleComponent
            image={Images.calendar}
            text='Monthly Consignment SALE Chesterfield'/>
            <ScheduleComponent
             image={Images.calendar}
            text='Twice Monthly - Friday Night Auction'/>
            <ScheduleComponent 
            
            image={Images.calendar}
                        text='Mondays -- Weekly Talligate Auction'/>

            <TouchableOpacity 
            onPress={()=>navigation.navigate('EnterDetails',{
                hide:false
            })}
            style={styles.status}>
                <Text style={styles.info}>I have Personal Property or Guns to Consign</Text>
            </TouchableOpacity>

            <Text style={styles.about}>At Sunrise Antiques & Auctioneers, we price ourselves on providing comprehensive live and online auction,appraisal and liquidation services Monthlt and weekly, we auction all types of merchandies including real estate,automobiles vintage clothing firearms, and personal property of all descriptions if needed we can provide a tag sales and will do garage and attic clean-outs.</Text>
        
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default Schedule

const styles = StyleSheet.create({
    status:{
        borderColor:colors.orange,
        borderWidth:1,
        alignSelf:'center',
        marginVertical:20,
        width:'90%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:20,
        paddingHorizontal:20,
        backgroundColor:'white',
    },
    about:{
        marginHorizontal:20,
        fontSize: Platform.OS=='android' ? vs(16): vs(13) ,
        lineHeight:22,
        color:'black',
        fontFamily:fonts.reg,
        paddingBottom:50
    },
    info:{
        color:colors.orange,
        fontFamily:fonts.bold,
    }
})
