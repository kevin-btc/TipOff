/* @flow */

import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableNativeFeedback,
} from 'react-native';

import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from 'react-native-popup-menu';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class MenuPhotos extends Component {

	constructor(props) {
		super(props);
		this._changePicture = this._changePicture.bind(this);
		this._cropPicture = this._cropPicture.bind(this);
	}

	_changePicture(){
		this.props.takePhoto(this.props.idPicture, true);
	}

	_cropPicture(){
		this.props.cropPhoto(this.props.picture, this.props.idPicture);
	}

	render() {
		return (
			<View style={styles.container}>
				<Menu>
					<MenuTrigger>
						<MaterialCommunityIcons
							type='MaterialCommunityIcons'
							name='menu'
							color='white'
							size={30}
						/>
					</MenuTrigger>
					<MenuOptions>
						<MenuOption onSelect={this._changePicture}  text={'Changer d\'image'} />
						<MenuOption onSelect={this._cropPicture}  text={'Decouper l\'image'} />
					</MenuOptions>
				</Menu>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		borderRadius: 50,

	},
});
