import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react';
import Home from './src/screens/home';
import Schedule from './src/screens/schedule';
import Calendar from './src/screens/pickDate';
import EnterDetails from './src/screens/form';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/login';
import Splash from './src/screens/splash';
import Register from './src/screens/Register';
import CurrentActions from './src/screens/CurrentActions';
import AuctionDetail from './src/screens/auctionDetail';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
    const Stack = createNativeStackNavigator();

    useEffect(() => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
  
      requestUserPermission();
      return unsubscribe;
    }, []);
  
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
      <NavigationContainer>
            <Stack.Navigator 
            initialRouteName='Splash'
            screenOptions={{
                headerShown:false
            }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="EnterDetails" component={EnterDetails} />
        <Stack.Screen name="CurrentActions" component={CurrentActions} />
        <Stack.Screen name="AuctionDetail" component={AuctionDetail} />
      </Stack.Navigator>

      </NavigationContainer>
    );
  }


