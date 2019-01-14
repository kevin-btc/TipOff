import React from 'react';
import { StyleSheet, View} from 'react-native';

import { NavigationEvents } from 'react-navigation';

import ip from '../Components/ip';
import TipList from '../Components/TipList';
import Loading from '../Components/Loading';
import {COLOR_ACTIVE_TIPOFF} from '../Components/utils';


export default class UserTip extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: '',
			data: [],
			loading: true,
		};
		this._getAnswerById = this._getAnswerById.bind(this);
	}

	_getAnswerById() {
		fetch(`${ip.ip}/api/messages/${this.props.user.UserId}?rejectIncognito=true`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' +  this.props.token
			},
		}).then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					data : responseJson,
					loading: false,
				});
				return responseJson;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	componentDidMount(){
		this._getAnswerById(this.props.user.UserId);
	}

	render() {
		console.log('MyTipById');
		if (this.state.loading) {
			return (
				<Loading
					isLoading={this.state.loading}
					size='large'
				/>
			);
		} else {
			return (
				<View style={styles.main_container}>
					<NavigationEvents
						onWillFocus={() => {
							this._getAnswerById();
						}}
					/>
					<TipList
						data={this.state.data}
						update={this._getAnswerById}
						typeList='Pas de tip! Crées en vite !'
						loggin={this.props.loggin}
						user={this.props.me}
						navigation={this.props.navigation}
					/>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		backgroundColor: COLOR_ACTIVE_TIPOFF,
	},
});
