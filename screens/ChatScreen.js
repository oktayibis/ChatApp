import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from 'react-native';
import {colors, fonts} from './theme';
import firebase from 'firebase';

const dimension = Dimensions.get('window');

const ChatScreen = ({route, user}) => {
  const [textMessage, setTextMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref('messages')
      .child(user.phoneNumber)
      .child(route.params.phone)
      .on('child_added', (value) =>
        setMessageList((prevState) => [...prevState, value.val()]),
      );
  }, []);

  const sendMessage = async () => {
    if (textMessage.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(user.phoneNumber)
        .child(route.params.phone)
        .push().key;
      let updates = {};
      let payloadMessage = {
        message: textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: user.phoneNumber,
      };
      updates[
        'messages/' + user.phoneNumber + '/' + route.params.phone + '/' + msgId
      ] = payloadMessage;
      updates[
        'messages/' + route.params.phone + '/' + user.phoneNumber + '/' + msgId
      ] = payloadMessage;
      firebase.database().ref().update(updates);
      setTextMessage('');
    }
  };

  const renderRow = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor:
            item.from === user.phone ? colors.light : colors.secondary,
          width: '60%',
          alignSelf: item.from === user.phone ? 'flex-end' : 'flex-start',
          marginBottom: 10,
          borderRadius: 5,
        }}>
        <Text style={styles.itemText}>{item.message}</Text>
        <Text style={styles.itemTime}>{item.time}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messageList}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
      <View style={styles.sendArea}>
        <TextInput
          style={styles.input}
          value={textMessage}
          onChangeText={(text) => setTextMessage(text)}
          placeholder="Type message..."
        />
        <TouchableHighlight style={styles.btn} onPress={() => sendMessage()}>
          <Text style={styles.btnText}>Send</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  input: {
    borderColor: colors.secondary,
    borderWidth: 1,
    padding: 5,
    width: '75%',
    marginLeft: 5,
  },
  btn: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
  },
  btnText: {
    color: colors.text,
    letterSpacing: 1.5,
    fontFamily: fonts.bold,
  },
  sendArea: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'space-between',
  },
  itemText: {
    color: colors.text,
    padding: 7,
  },
  itemTime: {
    color: colors.primary,
    opacity: 0.8,
    fontSize: 10,
  },
  list: {
    padding: 10,
    height: dimension.height * 0.8,
  },
});

export default ChatScreen;
