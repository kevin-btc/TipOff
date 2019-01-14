import React from 'react';
import { SearchBar } from 'react-native-elements';
import {StyleSheet, View, Plateform, Keyboard, Alert, Platform, TouchableOpacity} from 'react-native';
import {COLOR_ACTIVE_TIPOFF} from './utils';

import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import EmojiSelector from 'react-native-emoji-selector';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';



// <EmojiSelector
//     onEmojiSelected={emoji => console.log(emoji)}
// />

const IsIOS = Platform.OS === 'ios';

export default class BottomInputQuestion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			question: '',
			onFocus: false,
		};
		this._saveQuestion = this._saveQuestion.bind(this);
		this.sendOrDismissKeyboard = this.sendOrDismissKeyboard.bind(this);
		this.handleOnFocus = this.handleOnFocus.bind(this);
	}
	_saveQuestion(question) {
		this.setState({
			question
		});
	}

	componentDidMount(){
		if (this.props.question !== undefined){
			this.setState({
				question: this.props.question
			});
		}
	}

	sendOrDismissKeyboard() {
		const prevState = this.state;
		if (prevState.onFocus === false){
			return (
				<View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', flex:1 }}>
					<TouchableOpacity onPress={()=> {this.props.sendTipToServer();}} disabled={this.props.animationSend}>
						<MaterialCommunityIcons
							type='MaterialCommunityIcons'
							name='send'
							color={COLOR_ACTIVE_TIPOFF}
							size={40}
							style={{backgroundColor: 'white'}}
						/>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', flex:1 }}>
					<TouchableOpacity onPress={()=> Keyboard.dismiss()} >
						<MaterialCommunityIcons
							type='MaterialCommunityIcons'
							name='keyboard-close'
							color={COLOR_ACTIVE_TIPOFF}
							size={40}
							style={{backgroundColor: 'white'}}
						/>
					</TouchableOpacity>
				</View>
			);
		}
	}

	handleOnFocus() {
		const prevStateOnFocus = this.state.onFocus;
		this.setState({
			onFocus: !prevStateOnFocus,
		});
	}

	render() {
		console.log('BottomInputQuestion');
		const {question} = this.state;
		return (
			<View style={{flexDirection: 'row', zIndex: 3}}>
				<Animatable.View
					style={{width: '85%', backgroundColor: 'white',flexDirection: 'row'}}
					animation={this.props.animationAble ? 'flash' : undefined}
					iterationDelay={1000}
					iterationCount={3}
					duration={1000}
					onAnimationEnd={() => this.props.handleAnimationNoEntry()}
				>
					<AutoGrowingTextInput
						style={styles.textInput}
						onEndEditing={() => {
							this.props.handleQuestion(question);
							Keyboard.dismiss();
						}}
						onChangeText={(question) => this._saveQuestion(question)}
						value={this.state.question}
						placeholder=' 👉     Exprime toi ici...     👈'
						placeholderTextColor='rgba(0,0,0,1)'
						textShadowColor='black'
						maxLength = {100}
						autoCorrect= {true}
						blurOnSubmit={true}
						maxHeight={200}
						minHeight={45}
						onFocus={() => this.handleOnFocus()}
						onBlur={() => this.handleOnFocus()}
					/>
				</Animatable.View>
				{this.sendOrDismissKeyboard()}

			</View>
		);
	}
}

const styles = StyleSheet.create({
	textInput: {
		width: '95%',
		elevation: 1,
		marginLeft: 10,
		marginVertical: 4,
		fontSize: 17,
		textAlign: 'center',
		borderWidth: 3,
		borderColor: COLOR_ACTIVE_TIPOFF,
		borderWidth: 0,
		borderRadius: IsIOS ? 4 : 30,
	},
});
