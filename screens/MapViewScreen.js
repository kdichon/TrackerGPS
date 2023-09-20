import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import PropTypes from 'prop-types';

// import screens styles
//import styles from './styles';

class Pharmacy extends Component {
	/**
	 * Construct component class
	 * @param {object} props
	 */
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			dataSource: []
		};
	}

	componentDidMount() {
		fetch('https://flespi.io/mqtt/messages/flespi%2Fstate%2Fgw%2Fdevices%2F1455485%2Ftelemetry%2Fposition')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isloading: false,
					dataSource: responseJson.map(item => item.ReadyForPickups).reduce((acc, currValue) => { return acc.concat(currValue); }, [])
				});
			});
	}

renderItem = ({item, index}) => {

  return (
  <View style={styles.itemBlock}>
    <View style={styles.itemMeta}>
      <Text style={styles.itemName}>{item.RxDrugName}</Text>
      <Text style={styles.itemLastMessage}>{item.RxNumber}</Text>
    </View>

    <View style={styles.footerStyle}>
      <View style={{ paddingVertical: 10 }}>
        <Text style={styles.status}>{item.StoreNumber }</Text>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/icon_ori.png')} />
      </View>

    </View>
  </View>
  );
}
	keyExtractor = (item, index) => {
		return index.toString();
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={this.state.dataSource}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderItem}
				/>
			</View>
		);
	}
}

export default Pharmacy;

