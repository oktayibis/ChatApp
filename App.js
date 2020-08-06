/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  StatusBar,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {colors, fonts} from './screens/theme';

const App: () => React$Node = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');

  const submitForm = () => {
    if (phoneNumber.length > 15 || phoneNumber.length < 10) {
      Alert.alert('Phone Number is wrong.');
    } else if (username.length < 3) {
      Alert.alert('Your name can not be less than 3 characters');
    } else {
      Alert.alert(phoneNumber + username);
      setPhoneNumber('');
      setUsername('');
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>ChatApp</Text>
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={phoneNumber}
          placeholderTextColor={colors.primary}
          keyboardType="number-pad"
          textContentType="telephoneNumber"
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          placeholder="Your Name"
          value={username}
          style={styles.input}
          placeholderTextColor={colors.primary}
          onChangeText={(text) => setUsername(text)}
        />
        <TouchableHighlight style={styles.btn} onPress={() => submitForm()}>
          <Text style={styles.btnText}>Start Chat</Text>
        </TouchableHighlight>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 50,
    fontSize: 30,
    color: colors.secondary,
    letterSpacing: 2,
    fontFamily: fonts.semiBold,
  },

  input: {
    borderWidth: 1,
    backgroundColor: colors.text,
    color: colors.primary,
    borderRadius: 5,
    borderColor: 'white',
    width: '90%',
    padding: 15,
    marginBottom: 10,
    fontFamily: fonts.light,
  },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  btnText: {
    color: colors.text,
    fontSize: 16,
    letterSpacing: 1.5,
    fontFamily: fonts.bold,
  },
});

export default App;
