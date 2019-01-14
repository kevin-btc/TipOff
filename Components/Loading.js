/* @flow */

import React from 'react';
import {
	View,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

import LottieView from 'lottie-react-native';

import PropTypes from 'prop-types';

import { COLOR_ACTIVE_TIPOFF} from '../Components/utils';

export default class Loading extends React.Component {
	render() {
		return (
			this.props.isLoading &&
			<View style={styles.container}>
				<ActivityIndicator size={this.props.size} color={this.props.color} style={{zIndex: 2}}/>
				{this.props.animationChicken &&
				<LottieView
					resizeMode='contain'
					source={require('../animations/funky_chicken-loading.json')}
					autoPlay
					loop
				/>}
			</View>
		);
	}
}

Loading.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	size: PropTypes.string.isRequired,
	color: PropTypes.string,
	animationChicken: PropTypes.bool,
};

Loading.defaultProps = {
	color: COLOR_ACTIVE_TIPOFF,
	animationChicken: true,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
});
