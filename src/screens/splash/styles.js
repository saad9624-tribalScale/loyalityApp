import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  child: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 200,
    alignSelf: 'center',
  },
});
