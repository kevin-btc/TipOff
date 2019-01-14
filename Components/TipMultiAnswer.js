import React from 'react';
import {ImageBackground, Image, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, View, Text, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Answer from './Answer';
import ItemOptionsColor from './ItemOptionsColor';
import MenuPhotos from './MenuPhotos';


export default class TipMultiAnswer extends React.Component {
	constructor(props) {
		super(props);
	}

	toggleColor = (color) => {
		this.props.handleColor(color);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.state === nextState &&
			this.props === nextProps
		) {
			return false;
		}
		return true;
	}

	render(){
		console.log('TipMultiAnswer');
		return (
			<KeyboardAwareScrollView >
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<ImageBackground
						style={{height: this.props.picture.height * this.props.widthScreen / this.props.picture.width, flex:3}}
						source={{uri: this.props.picture.uri}}
						overlayAlpha={0}
						resizeMode='contain'
					>
						{
							this.props.picture !== '' &&
				<Answer
					saveAnswer={this.props.saveAnswer}
					color={this.props.color}
					size={{height: this.props.picture.height * this.props.widthScreen / this.props.picture.width, width: this.props.widthScreen}}
					handleCoor={this.props.handleCoor}
					handleResponse={this.props.handleResponse}
					editable={this.props.editable}
					handleShowFooter={this.props.handleShowFooter}
				/>
						}
					</ImageBackground>
				</TouchableWithoutFeedback>
				<ItemOptionsColor
					titleOption='Couleur bulles'
					toggleColor={this.toggleColor}
					noColor={this.props.picture.uri}
				/>
			</ KeyboardAwareScrollView>
		);
	}
}

export class TipMultiImage extends React.Component {

	constructor(props){
		super(props);
		this.state = {
		};
	}

	renderChoice = (id, picture) => {
		return (
			<View style={[styles.container, {backgroundColor: 'black', margin: 1}]}>
				<View style={[styles.menuPhoto, {marginRight: 5 , flex: 1}]}>
					<MenuPhotos picture={picture} idPicture={id} takePhoto={this.props.takePhoto} cropPhoto={this.props.cropPhoto} />
				</View>
				<Image
					style={styles.images}
					source={{uri: picture}}
					resizeMode='contain'
				/>
			</View>
		);
	}

	componentWillMount(){
		if (this.props.picture2 === '')
			this.props.takePhoto(2);
	}

	render() {
		return (
			<View
				style={[styles.container, {marginBottom: 50}]}
			>
				<View style={{flexDirection: 'row', flex: 1}}>
					{this.renderChoice(1, this.props.picture1.uri)}
					{this.renderChoice(2, this.props.picture2.uri)}
				</View>
				{this.props.numberOfPicture > 2 &&
				<View style={{flexDirection: 'row', flex: 1}}>
					{this.renderChoice(3, this.props.picture3.uri)}
					{this.props.numberOfPicture > 3 && this.renderChoice(4, this.props.picture4.uri)}
				</View>}

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	menuPhoto: {
		position: 'absolute',
		alignItems: 'flex-start',
		marginRight: 5,
		marginTop:10,
		zIndex: 1,
	},
	images: {
		flex: 1,
	},
	titleOption: {
		margin: 10,
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
	ItemOptions: {
		flex: 1,
		margin: 10,
	}
});
