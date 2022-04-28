import {
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import Images from '../../utils/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../utils/colors';
import messaging from '@react-native-firebase/messaging';

const Splash = ({navigation}) => {
  useEffect(() => {
    StatusBar.setHidden(true);
    setTimeout(() => {
      StatusBar.setHidden(false);
      getUserInfo()

    }, 2000);

  }, []);


  const getUserInfo = async () => {
   
    const user = await AsyncStorage.getItem('userInfo');
    const fcm = await AsyncStorage.getItem('fcm');
    if(fcm == null){
      requestUserPermission()
    }
    const usrObj = JSON.parse(user);
  console.log("usrObj",usrObj)
  if(usrObj != null){
     setTimeout(() => {
      StatusBar.setHidden(false);
      <StatusBar
      barStyle={'light-content'} backgroundColor={colors.orange}  />
      navigation.replace('Home')


    }, 2000);
  }
  else{
    setTimeout(() => {
      StatusBar.setHidden(false);
      navigation.replace('Login')


    }, 2000);
  }
   
    
  };

  async function requestUserPermission() {
    const token = await messaging().getToken();
    console.log("topken",token)
    await AsyncStorage.setItem('fcm', token);

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <View style={styles.image}>
      <View style={styles.child}>
        <Image style={styles.logo} source={Images.app_logo} />
      </View>

     
    </View>
  );
};

export default Splash;
