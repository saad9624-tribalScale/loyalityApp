import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React,{useState} from 'react';
import colors from '../../utils/colors';
import Images from '../../utils/Images';
import fonts from '../../utils/fonts';

const Input = ({placeholder, image, onChangeText, keyboardType, password}) => {
    const [secure,setSecure]=useState(true)
  return (
    <View style={styles.inputView}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={styles.image} source={image} />
        <TextInput
          secureTextEntry={password  ? secure :false}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholderTextColor="grey"
          style={styles.input}
          placeholder={placeholder}
        />
      </View>

      {password && (
        <TouchableOpacity onPress={()=>setSecure(!secure)}>
          <Image style={styles.eye} source={secure ? Images.visibility: Images.view} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputView: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingBottom: 20,
    marginVertical: 10,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eye: {
    width: 20,
    height: 20,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: colors.orange,
  },
  input: {
    color: 'black',
    width: '80%',
    fontFamily:fonts.med
  },
});
