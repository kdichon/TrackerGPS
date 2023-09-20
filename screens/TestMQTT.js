import React, {Component} from 'react';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {ListItem} from 'react-native-elements';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  enableCache: true,
  sync: {},
});

export default class AllPeople extends Component {
  constructor() {
    super();
    this.onMessageArrived = this.onMessageArrived.bind(this);
    this.onConnectionLost = this.onConnectionLost.bind(this);

    const client = new Paho.MQTT.Client(
      'onto.mywire.org',
      8080,
      'Client-' + Math.random() * 9999 + 1,
    );
    client.onMessageArrived = this.onMessageArrived;
    client.onConnectionLost = this.onConnectionLost;
    client.connect({
      onSuccess: this.onConnect,
      useSSL: false,
      onFailure: (e) => {
        console.log('Error: ', e);
      },
    });

    this.state = {
      message: [''],
      data: [],
      isLoading: true,
      client,
      messageToSend: '',
      isConnected: false,
    };
  }

  onConnect = () => {
    console.log('Connected');
    const {client} = this.state;
    client.subscribe('/app/to/allpeople');
    this.setState({
      isConnected: true,
      error: '',
      isLoading: true,
      messageToSend: 'allpeople',
    });
    this.sendMessage();
  };

  onMessageArrived(entry) {
    console.log("Nieuwe Test 1:")
    console.log("PayloadMEssage: "+entry.payloadMessage);
    console.log("Payload tostring: "+entry.payloadMessage.toString())
    //this.setState({data: entry, isLoading: false});
  }

  sendMessage = () => {
    console.log('message send.');
    var message = new Paho.MQTT.Message(this.state.messageToSend);
    message.destinationName = '/app/from';

    if (this.state.isConnected) {
      this.state.client.send(message);
    } else {
      this.connect(this.state.client)
        .then(() => {
          this.state.client.send(message);
          this.setState({error: '', isConnected: true});
        })
        .catch((error) => {
          console.log(error);
          this.setState({error: error});
        });
    }
  };

  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
      this.setState({error: 'Lost Connection', isConnected: false});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            keyExtractor={keyExtractor}
            data={this.state.data}
            renderItem={Item}
          />
        )}
      </View>
    );
  }
}

const keyExtractor = (item, index) => login.username.toString();

const Item = ({item}) => {
  return (
    <TouchableOpacity>
      <ListItem
        title="TestTitle" //{item.results.name.first}
        titleStyle={{fontWeight: 'bold'}}
        leftIcon={<MCIcons name="account" size={36} color="dodgerblue" />}
        subtitle={item.results.name.last}
        rightTitle={item.results.registered.date}
        rightTitleStyle={{fontSize: 14}}
        chevron
        bottomDivider
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
});