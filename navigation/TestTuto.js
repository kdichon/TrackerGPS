import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/LoginScreen'
import Tabs from '../navigation/Tabs'
import FormBtm from '../components/FormButton';
import FormIpt from '../components/FormInput';

import { Animated } from "react-native";
import { SFSymbol, SFSymbolWeight, SFSymbolScale } from "react-native-sfsymbols";

const AnimatedSFSymbol = Animated.createAnimatedComponent(SFSymbol);

const { Navigator, Screen } = createStackNavigator();

const NavigStack = () => {
	return (
		<NavigationContainer>
			<Navigator>
				<Screen
					name="Tabs" 
					component={Tabs}
				/>	
				<Screen
					name="LoginScreen"
					component={LoginScreen}
				/>
			</Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	shadow: {
		shadowColor: '#7F5DF0',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5
	}
})

export default NavigStack;