import { Alert, Text, StyleSheet, View, TouchableOpacity, BackHandler} from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import ip from '../Components/ip';
import {COLOR_ACTIVE_TIPOFF} from '../Components/utils';
import Logo from '../Components/Logo';
import Form from '../Components/Form';

import OneSignal from 'react-native-onesignal';


class Connection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mail: '',
			password: '',
			signup: false,
			messageError: '',
			messageValidation: '',
			userId: null,
			loading: false,
		};
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.signup = this.signup.bind(this);
		this.handleLoading = this.handleLoading.bind(this);
	}

	_isLoggin(user, mail) {
		const action = { type: 'IS_LOGGIN', value: {loggin: true, user, mail}};
		this.props.dispatch(action);
	}

	sendMailVerifyAccount(userId, mail) {
		fetch(`${ip.ip}/api/send?idUser=${userId}&to=${mail}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then((responseJson) => {
			if (this.state.messageValidation === '')
				this.setState({ messageError: 'Comfirme ton adresse dans le mail reçu'});
			return responseJson;
		}).catch((error) => {
			this.setState({ messageError: 'Mail de comfirmation non envoyé. Re éssayes stp !'});

			console.error(error);
		});
	}

	register (mail, password, username) {
		let newUsername = username.trim().toLowerCase();
		if (newUsername === 'incognito' || newUsername === 'anonyme') {
			Alert.alert('Oups...', 'Tu es futé... trés futé mais ce nom d\'utilisateur est reservé');
			return;
		}
		fetch(`${ip.ip}/api/users/register/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: mail.trim(),
				password: password.trim(),
				username: newUsername,
			}),
		}).then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.error === undefined) {
					this.signup();
					this.setState({
						messageValidation: 'Merci... 👌 Pour terminer la création de ton compte, je t\'invite à cliquer sur le lien 🔗 dans le mail que tu as recu ☺️',
						loading: false,
					});
				}
				else {
					this.setState({
						messageError: responseJson.error,
						loading: false,
					});
				}
				if (responseJson.userId !== undefined){
					this.setState({
						userId: responseJson.userId,
						loading: false,	
					});
					this.sendMailVerifyAccount(responseJson.userId, mail.trim());
				}
				return false;
			}).catch((error) => {
				this.handleLoading();
				console.error(error);
				return false;
			});
	}

	handleLoading(){
		const prevState = this.state;
		const nextState = {
			...prevState,
			loading: !prevState.loading
		};
		this.setState(nextState);
	}

	login (mail, password) {
		fetch(`${ip.ip}/api/users/login/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: mail.trim(),
				password: password,
			}),
		}).then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.token && responseJson.userId && responseJson.isAdmin == 1) {
					this._isLoggin(responseJson, mail);
					OneSignal.sendTag('username', responseJson.username);
					if (this.props.noNavigate !== true){
						this.props.navigation.navigate(this.props.navigation.state.params.route);
					}
				} else if (responseJson.isAdmin == 0){
					this.setState({
						messageError: 'Oups... 🤔\nTu n\'as pas validé ton compte. Un mail viens de t\'etre renvoyé ! Il reste valide 1h...',
						loading: false,
				});
					this.sendMailVerifyAccount(this.state.userId, mail.trim());

				} else
					this.setState({
						messageError: 'Oups... 🤔 ' + responseJson.error,
						loading: false,
					});
				return false;
			})
			.catch((error) => {
				this.handleLoading();
				this.setState({
					messageError: 'Oups... 🤔 Une erreur est survenu notre équipe y travaille'});
				console.error(error);
				return false;
			});
	}

	signup() {
		let signUp = this.state.signup;
		this.setState({
			signup: !signUp,
			messageError: '',
			messageValidation: '',
		});
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentWillUnmount() {
		this.handleLoading();
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

  handleBackPress = () => {
  	if (this.props.noNavigate !== true && this.props.navigation.state.params.register === undefined )
  		this.props.navigation.goBack();
  	else if (this.props.navigation.state.params.register !== undefined)
  		this.props.navigation.navigate('SwipeHome');
  	return true;
  }

  render() {
  	console.log('Connection');
  	return(
  		<View style={styles.container}>
  			<Logo/>
  			<Form
  				type={this.state.signup ? '  Inscription  ' : '  Connexion  '}
  				mail={this.props.mail}
  				onPress={this.state.signup ? this.register : this.login}
  				error={this.state.messageError}
					handleLoading={this.handleLoading}
					loading={this.state.loading}
  			/>
  			<Text
  				disabled={this.state.messageError === '' ? true : false}
  				style={[styles.message, {color: 'yellow'}]}
  			>
  				{this.state.messageError}
  			</Text>
  			<Text
  				disabled={this.state.messageValidation === '' ? true : false}
  				style={[styles.message, {color: 'white'}]}
  			>
  				{this.state.messageValidation}
  			</Text>
  			<View style={styles.TextCont}>
  				<Text style={styles.Text}>{ this.state.signup ? 'J\'ai déjà mon compte !' : 'Je veux mon compte !' }</Text>
  				<TouchableOpacity onPress={this.signup}>
  					<Text style={styles.Button}> {this.state.signup ? ' Me connecter  ' : ' M\'inscrire  '}</Text>
  				</TouchableOpacity>
  			</View>
  		</View>
  	);
  }
}

const styles = StyleSheet.create({
	container : {
		backgroundColor: COLOR_ACTIVE_TIPOFF,
		flex: 1,
		alignItems:'center',
		justifyContent :'center'
	},
	TextCont : {
		flexGrow: 1,
		alignItems:'flex-end',
		justifyContent :'center',
		paddingVertical:16,
		flexDirection:'row'
	},
	Text: {
		color:'rgba(255,255,255,0.6)',
		fontSize:16
	},
	message: {
		marginVertical: 10,
		width: 300,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	Button: {
		color:'#ffffff',
		fontSize:16,
		fontWeight:'500'
	}
});

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(Connection);
