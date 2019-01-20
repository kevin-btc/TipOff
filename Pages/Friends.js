/* @flow */

import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

import { Card, ListItem} from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import ip from '../Components/ip';
import { COLOR_ACTIVE_TIPOFF, COLOR_INACTIVE_TIPOFF } from '../Components/utils';

export default class Friends extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			friendsInfos: []
		};
		this.getAllfriends === this.getAllfriends.bind(this);
	}

	_getProfileById(id, token, i) {
		fetch(`${ip.ip}/api/users/${id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		}).then((response) => response.json())
			.then((responseJson) => {
				let listFriends = this.state.friendsInfos;
				if (listFriends === undefined || i === 0)
					listFriends = new Array(0);
				listFriends.push(responseJson);

				this.setState({friendsInfos: listFriends});
				console.log('_getProfileById', responseJson);
				return responseJson;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getAllfriends(){
		const friends = this.props.user.friends !== null ? JSON.parse(this.props.user.friends) : [];
		if (friends.length !== this.state.friendsInfos.length){
			friends.map((item, i) => {
				this._getProfileById(item, this.props.user.token, i);
			});
		}
		if(friends.length === 0)
			this.setState({friendsInfos: []});
	}

	componentWillMount(){
		this.getAllfriends();
	}

	render() {

		return (
			<View style={styles.container}>
        <NavigationEvents onDidFocus={() => {this.getAllfriends(); alert(String(this.state.friendsInfos.length)) ;console.log('Mise a jour de Liste Amis');}} />
				{!this.state.friendsInfos.length && <Text style={styles.titleTextInput}>{'Liste vide ! ajoutes des Tip\'r a suivre'}</Text>}
				<Card containerStyle={{marginHorizontal: 5, padding: 0}} >
					{
						this.state.friendsInfos.length !== 0 && this.state.friendsInfos.map((item, i) => {
							return (
								<ListItem
									key={i}
									bottomDivider={true}
									title={item.username}
									leftAvatar={{ rounded: true, source: { uri: `${ip.ip}/api/upload/${item.username}.jpg?avatar=true` } }}
									chevronColor={COLOR_ACTIVE_TIPOFF}
									chevron
									onPress={() => this.props.navigation.navigate('OtherUser', {
										me: {
											username: this.props.user.username,
											userId: this.props.user.userId,
											token: this.props.user.token,
											friends: this.props.user.friends

										},
										otherUser: {
											UserId: item.id,
											username: item.username,
											bio: item.bio
										}
									})}
								/>
							);
						})
					}
				</Card>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleTextInput: {
		textAlign: 'center',
    fontSize: 15,
    color: COLOR_INACTIVE_TIPOFF,
    marginVertical: 30,
	}
});
