import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function HomeScreen({setUser, user}) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userPhone');
    setUser({
      ...user,
      auth: false,
    });
  };
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableHighlight onPress={() => handleLogout()}>
        <Text>Logout</Text>
      </TouchableHighlight>
    </View>
  );
}
