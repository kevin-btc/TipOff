import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
} from 'react-native';

export default class TipItem extends Component {
	render() {
		const { height, width } = Dimensions.get('window');
		console.log('TipItemEmpty');

		return (
			<View style={{backgroundColor: 'white'}}>
				<View style={styles.container_user}>
					<View>
						<Image
							source={require('../images/icones/avatarEmpty.jpg')}
							style={styles.avatar}
						/>
					</View>
					<View style={{width: '80%', marginLeft: 10}}>
						<View style={{flexDirection: 'row'}}>
							<Text style={{flex: 1, textAlign: 'left'}}>{'Tip\'off'}</Text>
							<Text style={{flex: 1, textAlign: 'right'}}>{'à l\'instant'}</Text>
						</View>
						<Text style={[styles.text, {color: 'red'}]} >{this.props.typeList + '😜'}</Text>
					</View>
				</View>
				<Image
					style={{
						width: width - 5,
						height: 350,
						borderTopWidth: 0.5,
						borderBottomWidth: 0.5,
						borderColor: 'grey'
					}}
					source={require('../images/icones/EmptyList.png')}
					overlayAlpha={0}
				/>
				<View>
					<View style={{
						borderTopWidth: 0.5,
						borderBottomWidth: 0.5,
						borderColor: 'grey',
						alignItems: 'center',
						flexDirection: 'row',
						height: 50,
						flex: 1}}
					>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	text: {
		color: 'black',
		fontSize: 17,
		textAlign: 'left',
	},
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
});
