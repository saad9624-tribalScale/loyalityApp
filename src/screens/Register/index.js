import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputHeader from '../../components/InputHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Images from '../../utils/Images';
import { BASE_URL } from '../../utils/constant';
import fonts from '../../utils/fonts';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [pass, setPass] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const checkIfEmpty = () => {
    if (name == '') {
      alert('Enter Username');
    } else if (email == '') {
      alert('Enter Email');
    } else if (emailRegex.test(email) === false) {
      alert('Enter valid Email');
    } 
    else if(number == ''){
        alert("Enter Mobile Number")
    }
    else if (pass == '') {
      alert('Enter Password');
    } 
    else if (confirmPass == '') {
      alert('Enter confirm Password');
    } 
    
    else if (pass != confirmPass) {
      alert('Password mismatched!');
    } else {
      sigupHandler();
    }
  };

  const sigupHandler = async () => {
    setLoading(true);
    let formdata = new FormData();

    formdata.append('username', name);
    formdata.append('email', email);
    formdata.append('phone', number);
    formdata.append('password', pass);

    console.log('form', formdata);

    fetch(BASE_URL + 'user/register', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(response => response.json())
      .then(res => {
        console.log('res', res);
        if (res.status) {
          navigation.navigate('Login');
        } else {
          alert(res?.email);
        }
        //  alert(res.message);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        alert('Something went wrong!');

        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={Images.app_logo} style={styles.logo} />
        <Text style={styles.login}>Sign Up</Text>

        <Input
          onChangeText={text => setName(text)}
          image={Images.user}
          placeholder="Username"
        />
        <Input
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          image={Images.email}
          placeholder="Email-Address"
        />
        <Input
          onChangeText={text => setNumber(text)}
          image={Images.phone}
          placeholder="Mobile Number"
        />
        <Input
        password={true}
          onChangeText={text => setPass(text)}
          image={Images.padlock}
          placeholder="Password"
        />
        <Input
         password={true}
          onChangeText={text => setConfirmPass(text)}
          image={Images.padlock}
          placeholder="Confirm Password"
        />

        <Button
          isLoading={isLoading}
          onPress={() => checkIfEmpty()}
          // onPress={()=>navigation.navigate('Home')}
          title="Sign Up"
        />

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signup}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    width: undefined,
    height: 40,
    marginTop: 5,
    borderRadius: 5,
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  login: {
    marginTop: 20,
    fontSize:28,
    fontFamily:fonts.bold,
    marginBottom: 20,
    color: 'black',
  },
  signup: {
    marginTop: 10,
    fontSize:16,
    fontFamily:fonts.med,
    marginBottom: 20,
    alignSelf: 'center',
    color: 'black',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 20,
  },
});
