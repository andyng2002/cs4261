import React, {useState, useRef, useMemo} from 'react'
import { View, Text,  StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native'
import firebase from "firebase/app";
import { auth } from '../firebaseConfig';
import "firebase/firestore";

const AccountCreationScreen = ({ navigation }) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  var db = firebase.firestore();
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

  const handleCreateAccount = async () => {
      auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Add a new document in Firestore
        db.collection('users').doc(user.uid).set({
          firstName,
          lastName,
          email,
        })
        navigation.navigate('Login')
    })
    .catch(error => console.error(error.message))
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={inputStyle}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={inputStyle}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        title="Create Account"
        onPress={handleCreateAccount}
      />
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default AccountCreationScreen;
