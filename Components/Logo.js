import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Animated
} from 'react-native';

export default class Logo extends Component<{}> {

	componentWillMount() {
		this.animatedValue = new Animated.Value(0);
	}
	componentDidMount() {
		Animated.timing(this.animatedValue, {
			toValue: 1.885,
			duration: 1500
		}).start();
	}

	render(){
		const interpolateRotation = this.animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0rad', '10rad'],
		});
		const animatedStyle = {
			transform: [
				{ rotate: interpolateRotation }
			]
		};
		return(
			<View style={styles.container}>
				<Animated.Image
					style={[{width: 50, height: 43}, animatedStyle]}
					source={require('../images/icones/TipOff.png')}
				/>
				<Text style={styles.logoText}>{'Tip\'off'}</Text>
  			</View>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flexGrow: 1,
		justifyContent:'flex-end',
		alignItems: 'center'
	},
	logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'rgba(255, 255, 255, 0.7)'
	}
});
