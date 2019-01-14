/* @flow */

import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Dimensions
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {COLOR_ACTIVE_TIPOFF, COLOR_INACTIVE_TIPOFF} from '../Components/utils';
const {height, width} = Dimensions.get('window');

export default class BarEditCreateTip extends Component {

  renderButton = (onPressFunction, iconButton) => {
  	return (
  		<TouchableOpacity
  			style={[styles.buttonAdd]}
  			onPress={onPressFunction}
  		>
  			<MaterialCommunityIcons
  				type='MaterialCommunityIcons'
  				name={iconButton}
  				color='white'
  				size={25}
  			/>
  		</TouchableOpacity>
  	);
  }

  render() {
  	console.log('BarEditCreateTip');
  	return (
  		<View style={[styles.container_button, {left: width - 50, top: height - 340}]} >
  			{this.props.index === 0 && this.renderButton(this.props.activeMoovBubble, !this.props.editable ? 'pen' : 'cursor-move')}
  			{this.props.index === 0 && this.renderButton(this.props.onCrop, 'crop')}
  			{this.renderButton(this.props.addBubbleAnswerOrPhoto, 'plus-circle-outline')}
  			{this.renderButton(this.props.removeBubbleAnswerOrPhoto, 'minus-circle-outline')}
  		</View>
  	);
  }
}

const styles = StyleSheet.create({
	container_button: {
		position: 'absolute',
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		zIndex: 1,
		height: 220,
		backgroundColor: 'rgba(0,0,0,0.5)',
		borderRadius: 50,
	},
	buttonAdd: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 7,
		bottom: 0,

	},
	images: {
		width: 25,
		height: 25
	},
});
