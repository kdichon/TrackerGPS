import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TrackerGPS from './screens/LoginScreen';
import NavigStack1 from './navigation/TestTuto';
import Tabs from './navigation/Tabs';
import Mapping from './screens/MapViewScreen';
import Map2 from './screens/TestMQTT';

const App = () => {
  return(
    <NavigationContainer>
      <TrackerGPS />
    </NavigationContainer>    
  );
}

export default App;