import { StyleSheet, Text, TextInput, View,Image, TouchableOpacity, StatusBar } from 'react-native'
import React, {useEffect, useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputHeader from '../../components/InputHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Images from '../../utils/Images';
import { BASE_URL } from '../../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fonts from '../../utils/fonts';

const Login = ({navigation}) => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [isLoading, setLoading] = useState(false);
    const [device_token, setDevice_token] = useState('false');
  
    const checkIfEmpty = ()=>{
        if(email == ''){
          alert('Enter Email')
        }
        else if(password == ''){
          alert('Enter Password')
        }
        else{
          loginHandler()
        }
      }

      useEffect(()=>{
        getUserInfo()
      })

      const getUserInfo = async () => {
   
        const fcm = await AsyncStorage.getItem('fcm');
      console.log("fcm",fcm)
      setDevice_token(fcm)
       
        
      };

    
    
      const loginHandler = async () => {
        setLoading(true);
        let formdata = new FormData();
    
        formdata.append('email', email); 
        formdata.append('password', password);
        formdata.append('device_token', device_token);
    
        console.log('loginHandler form', formdata);
    
        fetch(BASE_URL + 'user/login', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formdata,
        })
          .then(response => response.json())
          .then(async res => {
            console.log('res', res.message);
            if(res.status){
             await   AsyncStorage.setItem('token',res?.data?.token)
             await  AsyncStorage.setItem('userInfo', JSON.stringify(res?.data));
            // await  AsyncStorage.setItem('address', res?.data?.address);
           
              navigation.replace('Home')
            }
            else{
              alert(res.message)
            }
            setLoading(false); 
          })
          .catch(err => {
            setLoading(false);
    
            console.log(err);
          });
      };
  

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
            barStyle={'dark-content'} backgroundColor={'white'}  />
            <Image source={Images.app_logo} style={styles.logo}/>
            <Text style={styles.login}>Login</Text>

            <Input
            keyboardType='email-address'
            onChangeText={text=>setEmail(text)} 
            image={Images.email} placeholder='Email-Address'/>
           
            <Input
            password={true}
            style={styles.input}
            onChangeText={text=>setPassword(text)}
            image={Images.padlock} placeholder='Password'/>

            <Button
            isLoading={isLoading}
            onPress={()=> checkIfEmpty()}
          //  onPress={()=>navigation.navigate('Home')}
             title='Sign In'/>

            <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                
                <Text style={styles.signup}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
   
      input: {
        backgroundColor: 'white',
        width: undefined,
        height: 40,
        marginTop: 5,
        borderRadius: 5,
      },
      container:{
          paddingHorizontal:20,
          backgroundColor:'white',
          flex:1
      },
      login:{
          marginTop:100,
          fontSize:28,
          fontFamily:fonts.bold,
          marginBottom:20,
          color:'black'

      },
      signup:{
          marginTop:10,
          fontSize:16,
          fontFamily:fonts.med,
          marginBottom:20,
          alignSelf:'center',
          color:'black'

      },
      logo:{
          width:100,
          height:100,
          alignSelf:'center',
          resizeMode:'contain',
          marginTop:50
      }

})
