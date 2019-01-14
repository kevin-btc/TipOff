/* @flow */

import React from 'react';
import {
	View,
	StyleSheet,
	NetInfo,
	Alert
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import OneSignal from 'react-native-onesignal';

import ip from '../Components/ip';
import TipList from '../Components/TipList';
import Loading from '../Components/Loading';


export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			tip: [],
			refreshing: false,
			loading: true,
		};
		this._getAnswer = this._getAnswer.bind(this);

		if (this.props.user.username !== undefined){
			alert(String(this.props.user.username));
			OneSignal.sendTag("username", this.props.user.username);
		}
	}

	_getAnswer() {
		NetInfo.isConnected.fetch().then(isConnected => {
			if (isConnected === false){
				Alert.alert('No connect');
				this.setState({
					tip : this.props.cacheTip,
					refreshing: false,
					loading: false,
				});
				return ;
			}
		});
		fetch(`${ip.ip}/api/messages?for=${this.props.user.username}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					tip : responseJson,
					refreshing: false,
					loading: false,
				}, () => {
					if (String(responseJson) !== String(this.props.cacheTip)){
						this.props.dispatch({ type: 'CACHE_TIP', value: responseJson});
					}
					if (JSON.stringify(responseJson) === '[]' && !this.state.isEmptyLIst){
						this.setState({
							isEmptyLIst : true,
						});
						Alert.alert('Tu es trés actif, Merci 😌😌','Reviens un peu plus tard pour de nouveau Tip.\nEn attendant, va voir ce que les autres ont repondu dans ton profil.');
					} else if (JSON.stringify(responseJson) !== '[]'){
						if (this.state.isEmptyLIst === true)
							this.setState({
								isEmptyLIst: false
							});
					}
				});
				return responseJson;
			})
			.catch((error) => {
				console.error(error);
			});
	}
	componentDidMount(){
		this._getAnswer();
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.tip === nextState.tip &&
       this.props.user === nextProps.user &&
			 this.props.cacheTip === nextProps.cacheTip &&
       this.props.loggin === nextProps.loggin
		) {
			return false;
		}
		return true;
	}

	render() {
		console.log('Home');
		if (this.state.loading) {
			return (
				<Loading
					isLoading={this.state.loading}
					size='large'
				/>
			);
		} else {
			return (
				<View style={styles.container}>
					<NavigationEvents onDidFocus={() => {
						if(this.props.activeTab === '0') {
							this._getAnswer();
							console.log('Mise a jour de Home');
						}
					}} />
					<TipList
						data={this.state.tip}
						update={this._getAnswer}
						loggin={this.props.loggin}
						user={this.props.user}
						navigation={this.props.navigation}
						typeList='Tu as voté à tout 😍'
					/>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
