import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/colors';
import colors from '../../utils/colors';

export const ActiveDot = ({color,moveToIndex}) => (
  <TouchableOpacity style={[styles.black, {backgroundColor:colors.orange}]}>
    <View style={styles.dot} />
  </TouchableOpacity>
);

export const DeActiveDot = ({color,moveToIndex}) => <TouchableOpacity style={styles.deActivedot} >

</TouchableOpacity>

const styles = StyleSheet.create({
  dot: {
    backgroundColor: colors.orange,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    borderColor:'black',
    borderWidth:0.2,
    opacity:1
  },
  deActivedot: {
    backgroundColor: colors.orange,
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    opacity:0.5
  },
  black: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: 10,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
});
