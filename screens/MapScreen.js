import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Permission, Location } from 'expo-location';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
    }
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted')
      console.log('Permission to access location was denied.');

    let location = await Location.getCurrentPositionAsync({ enabledHighAccuracy: true });

    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    }

    this.setState({ region: region })
  }
  render() {
    return (
      <View style={StyleSheet.container}>
        <Text>HomeScreen</Text>
        <MapView
          initialRegion={this.state.region}
          showUserLocation={true}
          showCompass={true}
          rotateEnabled={false}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

