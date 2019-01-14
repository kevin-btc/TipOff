import { Alert, TextInput, StyleSheet, Keyboard, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';

var {height, width} = Dimensions.get('window');


export default class MyInput extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			value: '',
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.state === nextState &&
       this.props === nextProps
		) {
			return false;
		}
		return true;
	}

	handleSizeValue(value){
		if (value.length < 10) {
			return 20;
		} else if (value.length > 9 && value.length < 14) {
			return 15;
		} else {
			return 10;
		}
	}

	render () {
		console.log('myinput');
		const { value } = this.state;

		return (
			<TextInput
				editable={ this.props.editable }
				onEndEditing={() => {
					this.props.handleResponse(this.props.id ,value);
				}}
				onSubmitEditing={() => Keyboard.dismiss()}
				id={this.props.id}
				placeholder={this.props.placeholder}
				onChangeText={(value) => this.setState({value})}
				style={styles.answer}
				placeholderTextColor={this.props.color === 'transparent' ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,1)'}
				maxLength = {20}
				fontSize={value !== '' ? this.handleSizeValue(value) : 20 }
				autoCorrect= {false}
				value={value}
				allowFontScaling={true}
				onFocus={() => this.props.handleShowFooter()}
				onBlur={() => this.props.handleShowFooter()}
				blurOnSubmit={true}
			/>

		);
	}

}
const styles = StyleSheet.create({
	answer: {
		textAlign: 'center',
		minWidth: 65,
		maxWidth: width / 2,
		borderRadius: 30,
		color: 'white',
		fontWeight: 'bold',
	}
});
