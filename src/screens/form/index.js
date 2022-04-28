import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Header from '../../components/header';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../utils/colors';
import Detail from '../../components/detail';
import Images from '../../utils/Images';
import InputHeader from '../../components/InputHeader';
import PhoneInput from 'react-native-phone-number-input';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { BASE_URL } from '../../utils/constant';
import fonts from '../../utils/fonts';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const EnterDetails = ({route}) => {
  const [image, setImage] = useState('');
  const [isLoading,setLoading]=useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [show, setShow] = useState(route?.params?.hide);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef < PhoneInput > null;
  const [fullName,setFullName]=useState('');
  const [lastName,setLastName]=useState('');
  const [email,setEmail]=useState('');
  const [number,setNumber]=useState('');
  const [token,setToken]=useState('');
  const [userId,setUserId]=useState('');
  const [date]=useState(moment(route?.params?.date).format('dddd, MMM Do YYYY'));
  const [time]=useState(route?.params?.time);


  const openPicker = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response?.assets[0]?.uri;
        if (source) {
          setImage(source);
          //uploadImage(source);
        }
      }
    });
  };

  useEffect(() => {
    getInfo()
  }, [])
  

  const getInfo = async()=>{
    const userInfo = await AsyncStorage.getItem('userInfo')
    const parsed = JSON.parse(userInfo)
    setToken(parsed?.token)
    setUserId(parsed?.id)
  }

  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const checkIfEmpty = () => {
    if (fullName == '') {
      alert('Enter FirstName');
    } else if (lastName == '') {
      alert('Enter LastName');
    } 
    else if (email == '') {
      alert('Enter Email');
    } 
    else if (emailRegex.test(email) === false) {
      alert('Enter valid Email');
    } 
    else if(number == ''){
        alert("Enter Mobile Number")
    }
  
    else if (image == '') {
      alert('Please Select Image');
    } 
    
    else {
      requestAuction();
    }
  };
  const requestAuction = async (source) => {
    setLoading(true)
    let data = new FormData();

    data.append('file', {
      uri: source,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    data.append('user_id', userId);
    data.append('first_name', fullName);
    data.append('last_name', lastName);
    data.append('email', email);
    data.append('phone', number);
    data.append('time', time);
    data.append('date', date);

    console.log("requestAuction222 form",data)



    const url = `${BASE_URL}auctions/request`;
    console.log('url', url);

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',

        Authorization : `Bearer ${token}`
      },
      body:data
    //  body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(async res => {
        setLoading(false)
        console.log('requestAuction', res);
          alert(res?.message)
      })
      .catch(err => {
        setLoading(false)
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Text style={styles.detail}>
          Enter Your details below to book this slot
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            justifyContent: 'space-between',
          }}>
          <View style={styles.inputView}>
            <InputHeader label="First Name" />
            <TextInput
            
            onChangeText={text=>setFullName(text)}
            style={styles.input} />
          </View>
          <View style={{flex: 1}}>
            <InputHeader label="Last Name" />
            <TextInput
              onChangeText={text=>setLastName(text)}
            style={styles.input} />
          </View>
        </View>

        <View style={styles.emailView}>
          <InputHeader
           
             label="E-Mail" />
          <TextInput 
           onChangeText={text=>setEmail(text)}
          style={styles.input} />
        </View>
        <View style={styles.emailView}>
          <InputHeader label="Phone Number" />
          <View
            style={[
              styles.input,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <Image source={Images.unitedStates} style={styles.flag} />
            <TextInput
              onChangeText={text=>setNumber(text)}
              keyboardType="number-pad"
              placeholder="+1"
              style={{width: '100%', marginHorizontal: 10,color:'black',height:50}}
              phone={true}
            />
          </View>

          {/* <PhoneInput
          textInputStyle={{
            backgroundColor:'white'
          }}
          textContainerStyle={{
            backgroundColor:'white'
          }}
          containerStyle={{
            backgroundColor:'white',
            width:'100%',
            marginVertical:10
          }}
            defaultValue={value}
           defaultCode="US"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
          /> */}
        </View>
        <View style={styles.emailView}>
          <InputHeader label="Upload Picture" />
          {image == '' ? (
            <TouchableOpacity
              style={styles.pictureView}
              onPress={() => openPicker()}>
              <Image style={styles.plus} source={Images.plus} />
              <Text style={styles.text}>Select your picture</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.pictureView}
              onPress={() => openPicker()}>
              <Image source={{uri: image}} style={styles.avatarIcon}  />
            </TouchableOpacity>
          )}
        </View>
        {show ? (
          <View>
            <View style={styles.checkPoint}>
              <CheckBox
                boxType="square"
                onCheckColor={colors.orange}
                onTintColor={colors.orange}
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text style={styles.checkText}>
                Get notification after the auction is published.
              </Text>
            </View>

            <View style={styles.checkPoint}>
              <CheckBox
                boxType="square"
                onCheckColor={colors.orange}
                onTintColor={colors.orange}
                disabled={false}
                value={toggleCheckBox1}
                onValueChange={newValue => setToggleCheckBox1(newValue)}
              />
              <Text style={styles.checkText}>
                Get notification 1 day before start.
              </Text>
            </View>

           
          </View>
        ) : (
          <View style={{marginTop: 20}}>
            <Detail
              action="google"
              color="black"
              image={Images.place}
              text={'79 old York Rd Chesterfield, NJ 08515'}
            />
            <Detail
              action="email"
              color="black"
              image={Images.email}
              text={'auctions@sunrise-antiques.com'}
            />
            <Detail
              action="phone"
              color="black"
              image={Images.phoneCll}
              text={'888-639-4443'}
            />
            <Detail
              action="facebook"
              color="black"
              image={Images.facebook}
              text={'Sunrise Antique & Auctioneers'}
            />

      {/* <TouchableOpacity
            
              style={styles.detailsBtn}>
                {isLoading ? <Loader color='white'/> :
              <Text style={styles.btnText}>Request Auction</Text>}
            </TouchableOpacity> */}

          </View>
        )}

<TouchableOpacity
             // onPress={() => setShow(false)}
              onPress={() => checkIfEmpty()}
              style={styles.detailsBtn}>
              {isLoading ? <Loader color='white'/> :
               <Text style={styles.btnText}>CONFIRM BOOKING</Text>}
            </TouchableOpacity>


      </ScrollView>
    </SafeAreaView>
  );
};

export default EnterDetails;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    width: undefined,
    height: 50,
    marginTop: 5,
    borderRadius: 5,
    color: 'black',
    paddingHorizontal: 10,
    fontFamily:fonts.reg

  },
  pictureView: {
    backgroundColor: 'white',
    width: undefined,
    height: 150,
    marginTop: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#e8e8e8',
    flex: 1,
  },
  inputView: {
    flex: 1,
    marginRight: 10,
  },
  emailView: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  checkPoint: {
    marginHorizontal: 20,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 12,
    marginHorizontal: 10,
    color: 'black',
    fontFamily:fonts.med
  },
  detailsBtn: {
    backgroundColor: colors.orange,
    width: 150,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 30,
  },
  detail: {
    alignSelf: 'center',
    marginVertical: 20,
    fontFamily:fonts.med,
    color: 'black',
  },
  btnText: {
    color: 'white',
    fontFamily:fonts.med
  },
  plus: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    tintColor: 'grey',
  },
  flag: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  avatarIcon: { height: '100%', width: '100%',borderRadius:5 },
text:{
  fontFamily:fonts.med,
  color:'black',
  marginTop:5
}
});
