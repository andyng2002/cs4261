import React, {useState, useRef, useMemo, useEffect} from 'react';
import {Alert} from 'react-native';
import { View, Text, TouchableOpacity, Keyboard, StyleSheet, TextInput, Button } from 'react-native';
import { auth } from '../firebaseConfig';
import { useIsFocused } from '@react-navigation/native';

const ChatScreen = ({navigation, route}) => {

    const inputStyle = {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    };


    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
        style={inputStyle}
        placeholder="Message"
      />   
    </View>
    );
};

export default ChatScreen
