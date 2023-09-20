import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

export default function MapScreen2 () {
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();

	const getLocation = async () => {
		try {
			const response = Location.requestPermissionsAsync();
			const location = await Location.getCurrentPositionAsync();
			const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();

			setLatitude({ latitude });
			setLongitude({ longitude });
			print("check: ", latitude, longitude);
		} catch (error) {
			Alert.alert("Cannot find where you are.");
		}
	}

	useEffect(() => {
		getLocation()
	}, [])

	return (
		<View style={styles.container}>
			<Text>{latitude}- {longitude} </Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});