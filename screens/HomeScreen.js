import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import {colors, fonts} from './theme';
export default function HomeScreen({setUser, user, navigation}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let dbRef = firebase.database().ref('users');
    dbRef.on('child_added', (val) => {
      let person = val.val();
      person.phone = val.key;
      if (user.phoneNumber === person.phone) {
        setUser({
          ...user,
          name: person.name,
        });
      } else {
        setUsers((prevState) => [...prevState, person]);
      }
    });
  }, []);

  const _handleLogout = async () => {
    await AsyncStorage.removeItem('userPhone');
    setUser({
      ...user,
      auth: false,
    });
    setUsers([]);
  };

  const renderRow = ({item}) => {
    return (
      <TouchableHighlight
        style={styles.item}
        onPress={() => navigation.navigate('Chat', item)}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight style={styles.btn} onPress={() => _handleLogout()}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.btn}>
          <Text style={styles.btnText}>Settings</Text>
        </TouchableHighlight>
      </View>
      <FlatList
        style={styles.list}
        data={users}
        renderItem={renderRow}
        keyExtractor={(item) => item.phone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  header: {
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  list: {
    paddingVertical: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnText: {
    color: colors.text,
    fontSize: 15,
    letterSpacing: 1.5,
    fontFamily: fonts.bold,
  },
  item: {
    backgroundColor: colors.light,
    padding: 5,
    marginBottom: 10,
    borderBottomColor: colors.primary,
    alignItems: 'center',
    borderRadius: 10,
  },
  itemText: {
    color: colors.text,
    fontFamily: fonts.regular,
    letterSpacing: 1.3,
  },
  loading: {
    backgroundColor: colors.light,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
