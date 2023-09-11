import React, {useState, useRef, useMemo, useEffect} from 'react';
import {Alert} from 'react-native';
import { View, Text, TouchableOpacity, Keyboard, StyleSheet, TextInput, Button } from 'react-native';
import { auth } from '../firebaseConfig';
import { useIsFocused } from '@react-navigation/native';

const LoginScreen = ({navigation, route}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputStyle = {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    };

    const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
        navigation.navigate('Chat');  // Navigate to Settings or any other screen
        })
        .catch((error) => {
        Alert.alert('Login Failed', error.message);
        });
    };

    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
        style={inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        />
        <TextInput
        style={inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
        <Button title="Create Account" onPress={() => navigation.navigate('AccountCreation')} />
    </View>
    );
};

export default LoginScreen
