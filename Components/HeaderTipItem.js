/* @flow */

import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native';

import {delay} from './utils';

export default class HeaderTipItem extends React.Component {
	render() {
		return (
			<View style={styles.container_user}>
				<TouchableOpacity
					onPress={this.props.navigation}
					disabled={
						this.props.incognito === true ? true : false
					}
				>
					<View>
						<Image
							backgroundColor={'black'}
							source={this.props.incognito ? require('../images/icones/avatarIncognito.png') : {uri: this.props.avatar}}
							style={styles.avatar}
						/>
					</View>
				</TouchableOpacity>
				<View style={{width: '80%', marginLeft: 10}}>
					<View style={{flexDirection: 'row'}}>
						<Text style={{flex: 1, textAlign: 'left'}}>{this.props.incognito ? 'Incognito' : this.props.username}</Text>
						<Text style={{flex: 1, textAlign: 'right'}}>{delay(this.props.createdAt)}</Text>
					</View>
					<Text style={styles.text} >{this.props.question}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container_user: {
		margin: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 50,
		borderWidth: 0.5,
		borderColor: 'grey',
	},
	text: {
		color: 'black',
		fontSize: 17,
		textAlign: 'left',
		fontWeight:'normal'
	},
});
