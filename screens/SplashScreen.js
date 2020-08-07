import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';

export default function SplashScreen({setUser}) {
  useEffect(() => {
    var firebaseConfig = {
      apiKey: 'AIzaSyC5zrKO9U7pjG4Fz8qIjtpCjX44RjxWZvs',
      authDomain: 'chatapp-92bd6.firebaseapp.com',
      databaseURL: 'https://chatapp-92bd6.firebaseio.com',
      projectId: 'chatapp-92bd6',
      storageBucket: 'chatapp-92bd6.appspot.com',
      messagingSenderId: '171641365708',
      appId: '1:171641365708:web:6a294a8a3dd0cd65040e69',
      measurementId: 'G-FVPDS1N7B8',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    setUser({
      ...user,
      isLoading: false,
    });
  }, []);
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}
