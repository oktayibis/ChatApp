import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {colors, fonts} from './screens/theme';
import React, {useState, useEffect} from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import {View, Text} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import firebase from "firebase"
export default function App() {
  const Stack = createStackNavigator();

  const [user, setUser] = useState({
    userName: null,
    phoneNumber: null,
    auth: false,
  });

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyC5zrKO9U7pjG4Fz8qIjtpCjX44RjxWZvs",
      authDomain: "chatapp-92bd6.firebaseapp.com",
      databaseURL: "https://chatapp-92bd6.firebaseio.com",
      projectId: "chatapp-92bd6",
      storageBucket: "chatapp-92bd6.appspot.com",
      messagingSenderId: "171641365708",
      appId: "1:171641365708:web:6a294a8a3dd0cd65040e69",
      measurementId: "G-FVPDS1N7B8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    const getLogin = async () => {
      await AsyncStorage.getItem('userPhone').then((val) => {
        if (val) {
          setUser({
            ...user,
            phoneNumber: val,
            auth: true,
          });
        } else {
          setUser({
            ...user,
            auth: false
          })
        }
      });
    };

    getLogin();
  }, []);
  // if(user.isLoading) {
  //   return <SplashScreen user={user} setUser={setUser} />
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.auth === false ? (
          // No token found, user isn't signed in
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setUser={setUser} user={user} />}
          </Stack.Screen>
        ) : (
          // User is signed in
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} setUser={setUser} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="Chat">
            {(props) => <ChatScreen {...props} setUser={setUser} user={user} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
