/* @flow */

import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	ImageBackground,
	Image,
} from 'react-native';

import ProgressBar from 'react-native-progress/Bar';
import ImageProgress from 'react-native-image-progress';

import * as Animatable from 'react-native-animatable';

import ip from './ip';

export default class MyComponent extends Component {
	render() {
		const result = this.props.result;
		return (
			<TouchableWithoutFeedback
				onPress={() => this.props.onPressVote(this.props.id)}
				onLongPress={this.props.deleteTip}
			>
				<View style={{flex: 1, borderRadius: 20}}>
					<ImageProgress
						style={{flex: 1, backgroundColor: 'black', margin: 1}}
						source={{uri: `${ip.ip}/api/upload/${this.props.picture}`}}
						resizeMode='contain'
						indicator={ProgressBar}
						indicatorProps={{
							size: 80,
							borderWidth: 0,
							color: 'rgba(150, 150, 150, 1)',
							unfilledColor: 'rgba(200, 200, 200, 0.2)'
						}}
					>
						{this.props.alreadyPoll &&
				<View style={{bottom: '-85%'}}>
					<Text
						style={{
							textAlign: 'center',
							margin: 1,
							fontWeight: 'bold',
							bottom: 0,
							backgroundColor: 'rgba(0,0,0,0.6)',
							color: 'white' }}
					>
						{result}
					</Text>
				</View>}
						<View style={{position: 'absolute', right: '12%', top: '2%'}}>
							{(this.props.myAnswerPoll === this.props.id || this.props.isPoll[this.props.id] === true) && this.props.loggin &&
						<Image
							key={this.props.id}
							source={{uri: `${ip.ip}/api/upload/${this.props.username}.jpg?avatar=true&${new Date().getHours()}`}}
							style={styles.smallAvatar}
						/>
							}
						</View>
					</ImageProgress>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	smallAvatar: {
		position: 'absolute',
		marginLeft: 0,
		width: 20,
		height: 20,
		borderRadius: 50,
		borderWidth: 0.5,
		borderColor: 'grey',
		zIndex: 2,
	},
});
