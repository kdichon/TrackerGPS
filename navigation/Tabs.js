import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import MapViewScreen from '../screens/MapViewScreen';
import MapScreen2 from '../screens/MapScreen2';
import SettingsScreen from '../screens/SettingsScreen';

import { Animated } from "react-native";
import { SFSymbol, SFSymbolWeight, SFSymbolScale } from "react-native-sfsymbols";

//const AnimatedSFSymbol = Animated.createAnimatedComponent(SFSymbol);

const Tab = createBottomTabNavigator();

const Tabs = () => {
	return(
		<Tab.Navigator
			tabBarOptions={{
			showLabel: false,
			style: {
				position:'absolute',
				bottom:25,
				left:20,
				right:20,
				elevation:0,
				backgroundColor:'#ffffff',
				borderRadius: 15,
				height:90,
				...styles.shadow,
			},
		}}>
			<Tab.Screen 
				name="Home" 
				component={HomeScreen} 
				options={{
				tabBarIcon: ({focused}) => (
					<View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
					<Image 
						source={require('../assets/icon.png')}
						resizeMode='contain'
						style={{
							width:25,
							height:25,
							tintColor: focused ? '#E32F45' : '#748C94'
						}}
					/>
					<Text style={{color: focused ? '#E32F45' : '#748C94', fontSize: 12 }}>
						HOME
					</Text>
					</View>
				)
			}}/>

			<Tab.Screen 
				name="Map" 
				component={MapViewScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
							<Image
								source={require('../assets/icon.png')}
								resizeMode='contain'
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? '#E32F45' : '#748C94'
								}}
							/>
							<Text style={{ color: focused ? '#E32F45' : '#748C94', fontSize: 12 }}>
								MAP
							</Text>
						</View>
					)
				}} />

			<Tab.Screen 
				name="Settings" 
				component={SettingsScreen} 
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
							<Image
								source={require('../assets/icon.png')}
								resizeMode='contain'
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? '#E32F45' : '#748C94'
								}}
							/>
							<Text style={{ color: focused ? '#E32F45' : '#748C94', fontSize: 12 }}>
								SETTINGS
							</Text>
						</View>
					)
				}} />

		</Tab.Navigator>
	);
}

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

export default Tabs;