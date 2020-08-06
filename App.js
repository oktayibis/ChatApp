import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {colors, fonts} from './screens/theme';
import React, {useState, useEffect} from 'react';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import {View, Text} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  const Stack = createStackNavigator();

  const [user, setUser] = useState({
    userName: null,
    phoneNumber: null,
    auth: false,
  });

  useEffect(() => {
    const getLogin = async () => {
      await AsyncStorage.getItem('userPhone').then((val) => {
        if (val) {
          setUser({
            ...user,
            phoneNumber: val,
            auth: true,
          });
        }
      });
    };

    getLogin();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.auth === false ? (
          // No token found, user isn't signed in
          <Stack.Screen name="Home">
            {(props) => <LoginScreen {...props} setUser={setUser} user={user} />}
          </Stack.Screen>
        ) : (
          // User is signed in
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} setUser={setUser} user={user} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
