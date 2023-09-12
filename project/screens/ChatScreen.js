import React, {useState, useRef, useMemo, useEffect} from 'react';
import { View, Text, TouchableOpacity, Keyboard, StyleSheet, TextInput, Button, Image, ScrollView } from 'react-native';
import { auth, db } from '../firebaseConfig';
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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

    const messagesRef = db.collection('messages');
    const [formValue, setFormValue] = useState('');
    // const userRef = db.collection('users').doc(messagesRef.uid)
    const dummy = useRef();
    const [messages, setMessages] = useState([]);
    // const name_list = {};
    const fetchMessages = async () => {
      const querySnapshot = await messagesRef.orderBy('createdAt').get();
      const newMessages = [];
      querySnapshot.forEach((doc) => {
        newMessages.push(doc.data());
      });
      setMessages(newMessages);
    };
    
    const sendMessage = async () => {

      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
      });
  
      setFormValue('');
      dummy.current.scrollToEnd({ animated: true });
    };


    useEffect(() => {
      const unsubscribe = messagesRef
        .orderBy('createdAt')
        .onSnapshot((snapshot) => {
          const newMessages = [];
          snapshot.forEach((doc) => {
            newMessages.push(doc.data());
          });
          setMessages(newMessages);
        });
        return () => unsubscribe();
      }, []);

    
    return (
      <View style={styles.chatContainer}>
        <ScrollView
          style={styles.messageContainer}
          ref={dummy}
          onContentSizeChange={() => dummy.current.scrollToEnd({ animated: true })}
        >
        {messages &&
          messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={formValue}
            onChangeText={(text) => setFormValue(text)}
            placeholder="Say something nice"
          />
          <Button
            title="Send"
            onPress={sendMessage}
            disabled={!formValue}
          />
        </View>
      </View>
    );
};

function ChatMessage(props) {
  const { text, uid, createdAt } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <View style={styles.message}>
      <View style={messageClass === 'sent' ? styles.sentMessage : styles.receivedMessage}>
        <Text>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  chatContainer: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    padding: 8,
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 8,
  },
});


export default ChatScreen
