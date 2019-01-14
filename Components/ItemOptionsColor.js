import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLOR_ACTIVE_TIPOFF, RED_TIFOFF, PURPLE_TIFOFF, GREEN_TIFOFF, YELLOW_TIFOFF } from '../Components/utils';
import * as Animatable from 'react-native-animatable';

export default class ItemOptions extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			color: COLOR_ACTIVE_TIPOFF,
			showPaletteColor: false,
		};
		this._changeColor = this._changeColor.bind(this);
	}

	_onPressForChangeColor(){
		const prevStateShowPalette = this.state.showPaletteColor;
		this.setState({showPaletteColor : !prevStateShowPalette});
	}

	_changeColor(color) {
		this.setState({color});
		this.props.toggleColor(color);
	}
	render() {
		return (
			<View style={styles.main_container}>
				<TouchableOpacity onPress={() => this._onPressForChangeColor()}>
					<View style={[styles.openChoiceColor, {backgroundColor: this.state.color}]} />
				</TouchableOpacity>
				{this.state.showPaletteColor && <Animatable.View animation="bounceInLeft" style={styles.option}>
					<TouchableOpacity onPress={() => this._changeColor(RED_TIFOFF)}>
						<View style={[styles.choiceColor, {backgroundColor: RED_TIFOFF}]} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this._changeColor(PURPLE_TIFOFF)}>
						<View style={[styles.choiceColor, {backgroundColor: PURPLE_TIFOFF}]} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this._changeColor(GREEN_TIFOFF)}>
						<View style={[styles.choiceColor, {backgroundColor: GREEN_TIFOFF}]} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this._changeColor(YELLOW_TIFOFF)}>
						<View style={[styles.choiceColor, {backgroundColor: YELLOW_TIFOFF}]} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this._changeColor(COLOR_ACTIVE_TIPOFF)}>
						<View style={[styles.choiceColor, {backgroundColor: COLOR_ACTIVE_TIPOFF}]} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this._changeColor('blue')}>
						<View style={[styles.choiceColor, {backgroundColor: 'blue'}]} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this._changeColor('black')}>
						<View style={[styles.choiceColor, {backgroundColor: 'black'}]} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this._changeColor('transparent')}>
						<View style={[styles.choiceColor, {overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.2)'}]} />
					</TouchableOpacity>
				</Animatable.View>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main_container: {
		position: 'absolute',
		flex: 1,
		flexDirection: 'row',
		margin: 5,
	},
	option: {
		flexDirection: 'row',
	},
	openChoiceColor: {
		marginVertical: 5,
		marginHorizontal: 4,
		justifyContent: 'center',
		alignItems: 'center',
		height: 35,
		width: 35,
		borderRadius: 50,
		borderColor: 'white',
		borderWidth: 1,
	},
	choiceColor: {
		marginVertical: 10,
		marginHorizontal: '1.5%',
		justifyContent: 'center',
		alignItems: 'center',
		height: 25,
		width: 25,
		borderRadius: 50,
		borderColor: 'white',
		borderWidth: 1,
	},
	colorText: {
		marginVertical: 10,
		flex: 1,
		color: 'white',
		fontWeight: 'bold',
		margin: 7,
		fontSize: 15,
	},
});
