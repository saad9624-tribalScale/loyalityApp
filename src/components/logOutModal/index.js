import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState} from 'react';
import Images from '../../utils/Images';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WIDTH } from '../../utils/constant';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';

const SuccessModal = ({visibility, setVisibility, backToHome}) => {
  const navigation= useNavigation()
  const [date, setDate] = useState(new Date());

  const calendarContent = () => (
    <View style={styles.qrContentModalStyle}>
      <Image style={styles.success} source={Images.app_logo} />
      <TouchableOpacity onPress={() => setVisibility(false)}>
      </TouchableOpacity>
      <Text style={styles.completed}>Are you sure you want to logout?</Text>

    <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:20}}>
    <TouchableOpacity onPress={()=>LogoutUSer()} style={styles.logout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setVisibility(false)} style={styles.cancel}>
        <Text style={styles.textCancel}>Cancel</Text>
      </TouchableOpacity>

    </View>
     
    </View>
  );

  const closeModal= ()=>{

    setVisibility(false);
  }

  const LogoutUSer= async ()=>{
    setVisibility(false);
    await AsyncStorage.clear()
    navigation.replace('Login')
  }

  return (
    <View>
      <Modal
      backdropTransitionOutTiming={0}
        onBackdropPress={close => {
          closeModal()
        }}
        isVisible={visibility}>
        <View>{calendarContent()}</View>
      </Modal>
    </View>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  qrContentModalStyle: {
    backgroundColor: 'white',
    // height: Platform.OS == 'android' ? HEIGHT / 2.2 : HEIGHT / 2.5,
    width: WIDTH / 1.1,
    borderRadius: 50,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    alignSelf: 'center',
    paddingVertical: 20,
    paddingBottom: 50,
  },
  success: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  completed: {
    fontSize: 14,
    marginTop: 10,
    color: colors.black,
    fontFamily:fonts.med
  },
  congr: {
    fontSize: 16,
    color: colors.black,
  },
  logout:{
    backgroundColor:colors.orange,
    padding:10,
    marginTop:10,
    marginHorizontal:10,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5

  },
  cancel:{
    borderColor:colors.orange,
    borderWidth:1,
    padding:10,
    marginTop:10,
    marginHorizontal:10,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5

  },
  text:{
    color:'white',
    fontFamily:fonts.med
  },
  textCancel:{
    color:'black',
    fontFamily:fonts.med
  },
});
