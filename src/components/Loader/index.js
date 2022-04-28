import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react';

const Loader = ({color,size}) => {
    return (
        <ActivityIndicator
        color={color? color : 'white'}
        size={size ? size : 'large'}
        />
    )
}

export default Loader

const styles = StyleSheet.create({})
