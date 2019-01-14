import { Alert, TextInput, StyleSheet, Keyboard } from 'react-native';
import React from 'react';

export default class MyInput extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			value: '',
			minWidth: this.props.placeholder.length * 17,
			width: 0,
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
		if (value.length < 11) {
			return 20;
		} else if (value.length > 10 && value.length < 15) {
			return 15;
		} else {
			return 10;
		}
	}

	render () {
		console.log('myinput');
		const {value, minWidth, width} = this.state;
		var handleToUpdate  =   this.props.handleToUpdate;
		let newStyle = {
			minWidth,
		};

		return (
			<TextInput
				editable={this.props.editable}
				onEndEditing={() => {
					this.props.handleResponse(this.props.id ,value);
					setTimeout(() => { this.props.widthBubble(this.props.id, width); }, 1000);
				}}
				id={this.props.id}
				placeholder={this.props.placeholder}
				onChangeText={(value) => this.setState({value})}
				style={[newStyle, styles.answer ]}
				maxLength={this.props.maxLength}
				placeholderTextColor={this.props.color === 'transparent' ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,1)'}
				maxLength = {21}
				fontSize={value !== '' ? this.handleSizeValue(value) : 25 }
				autoCorrect= {false}
				value={value}
				onLayout={(e) => {
					if(this.props.editable) {
						this.setState({width: e.nativeEvent.layout.width}, ()=> handleToUpdate(width));
					}
				}}

			/>
		);
	}

}
const styles = StyleSheet.create({
	answer: {
		height: 50,
		maxWidth: 220,
		borderRadius: 30,
		color: 'white',
		fontSize: 23,
		fontWeight: 'bold',
	}
});
