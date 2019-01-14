import React from 'react';
import { StyleSheet, View} from 'react-native';

import { NavigationEvents } from 'react-navigation';

import ip from '../Components/ip';
import TipList from '../Components/TipList';
import { COLOR_ACTIVE_TIPOFF} from '../Components/utils';
import Loading from '../Components/Loading';

export default class UserTipPoll extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: '',
			data: '',
			loading: true,
		};
		this._getAnswerByIdPoll = this._getAnswerByIdPoll.bind(this);
	}

	_getAnswerByIdPoll() {
		fetch(`${ip.ip}/api/messages/${this.props.user.username}/poll`, {
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

	componentWillMount () {
		this._getAnswerByIdPoll();
	}

	render() {
		console.log('UserTipPoll');
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
							this._getAnswerByIdPoll(this.props.user.username);
						}}
					/>
					<TipList
						data={this.state.data}
						update={this._getAnswerByIdPoll}
						typeList={` ${this.props.user.username} n'a pas encore donné son avis.`}
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
