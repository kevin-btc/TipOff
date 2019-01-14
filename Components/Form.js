import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	Keyboard,
	Alert,
} from 'react-native';

import { Icon } from 'react-native-elements';
import SpinnerButton from 'react-native-spinner-button';

export default class Form extends Component<{}> {

	constructor(props) {
		super(props);
		this.state = {
			mail: '',
			password: '',
			username: '',
			showPassword: true,
			defaultLoading: false
		};
		this.onPressVisiblePassword = this.onPressVisiblePassword.bind(this);
	}

	onPressVisiblePassword() {
		let isPasswordVisible = this.state.showPassword;
		this.setState({showPassword: !isPasswordVisible });

	}

	componentDidMount(){
		if (this.props.mail !== undefined)
			this.setState({mail: this.props.mail});
	}

	render(){
		const {mail, password, username} = this.state;
		console.log('Form');
		return(
			<View style={styles.container}>
				{this.props.type === '  Inscription  ' && <TextInput style={styles.inputBox}
					underlineColorAndroid='rgba(0,0,0,0)'
					placeholder="Pseudo"
					placeholderTextColor = "#ffffff"
					selectionColor="#fff"
					keyboardType="default"
					onChangeText={(username) => this.setState({username})}
					value={username}
					onSubmitEditing={()=> this.mail.focus()}
					autoCapitalize='none'
					maxLength={16}
				/>}
				<TextInput style={styles.inputBox}
					underlineColorAndroid='rgba(0,0,0,0)'
					placeholder="Email"
					placeholderTextColor = "#ffffff"
					selectionColor="#fff"
					keyboardType="email-address"
					onChangeText={(mail) => this.setState({mail})}
					value={mail}
					ref={(input) => this.mail = input}
					onSubmitEditing={()=> this.password.focus()}
					autoCapitalize='none'
					maxLength={40}
				/>
				<View style={[{flexDirection: 'row'}, styles.inputBox]}>
					<TextInput style={{    fontSize:16,
						color:'#ffffff', flex: 10}}
					underlineColorAndroid='rgba(0,0,0,0)'
					placeholder="Mot de passe"
					secureTextEntry={!this.state.showPassword}
					placeholderTextColor = "#ffffff"
					onChangeText={(password) => this.setState({password})}
					value={password}
					ref={(input1) => this.password = input1}
					autoCapitalize='none'
					maxLength={16}
					autoCorrect={false}
					/>
					<View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
						<Icon
							name={this.state.showPassword ? 'visibility' : 'visibility-off'}
							type='MaterialIcons'
							color='white'
							onPress={this.onPressVisiblePassword}
						/>
					</View>
				</View>
				<SpinnerButton
					buttonStyle={styles.button}
					spinnerType={'PacmanIndicator'}
					isLoading={this.props.loading}
					onPress={() => {
						this.props.handleLoading();
						Keyboard.dismiss();
						setTimeout(()=> this.props.onPress(mail, password, username), 1000)
					}}
				>
					<Text style={styles.buttonText}>{this.props.type}</Text>
				</SpinnerButton>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flexGrow: 1,
		justifyContent:'center',
		alignItems: 'center'
	},

	inputBox: {
		width: 300,
		backgroundColor:'rgba(255, 255,255,0.2)',
		borderRadius: 25,
		paddingHorizontal:16,
		fontSize:16,
		color:'#ffffff',
		marginVertical: 10
	},
	button: {
		width:300,
		backgroundColor:'#0077DB',
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 13
	},
	buttonText: {
		fontSize:16,
		fontWeight:'500',
		color:'#ffffff',
		textAlign:'center'
	}

});
