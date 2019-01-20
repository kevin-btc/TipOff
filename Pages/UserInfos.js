import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

import ip from '../Components/ip';
import Avatar from '../Components/Avatar';
import {COLOR_ACTIVE_TIPOFF, COLOR_INACTIVE_TIPOFF} from '../Components/utils';


export default class UserTip extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: props.user.bio,
		};
	}

	_saveBio(bio, token) {
		fetch(`${ip.ip}/api/users/me/`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify({
				bio: bio,
			}),
		}).then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					text: bio
				},() => this.props.dispatch({ type: 'BIO_UPDATE', value: bio}));
				return responseJson;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		console.log('userInfo');
		var regex = /\s{2,}/gi;
		return (
			<ScrollView style={styles.main_container}>
				<View style={styles.avatar_container}>
					<Avatar
						user={this.props.user.username}
						size={100}
						token={this.props.user.token}

					/>
					<Text
						style={{
							fontWeight: 'bold',
							fontStyle: 'italic',
							textAlign: 'center',
							marginTop: 10,
							color: COLOR_ACTIVE_TIPOFF,
						}}
					>
						{this.props.user.username}
					</Text>
				</View>
				<View style={{marginHorizontal: 10, marginTop: 20}}>
					<Text style={styles.titleTextInput}>Utilisateur :</Text>
					<AutoGrowingTextInput
						style={[styles.textInput, {color: 'grey'}]}
						autoCapitalize={'none'}
						autoCorrect={false}
						editable={false}
						value={this.props.user.username }
					/>
					<Text style={styles.titleTextInput}>MiniBio :</Text>
					<AutoGrowingTextInput
						style={styles.textInput}
						placeholder={'Ecris un petit resumé de toi ici...'}
						placeholderTextColor={COLOR_ACTIVE_TIPOFF}
						numberOfLines={4}
						multiline={true}
						maxLength={200}
						autoCapitalize={'none'}
						editable={this.props.loggin ? true : false}
						onChangeText={(text) => this.setState({text})}
						value={this.state.text === null ? 'Entre ta mini biographie ici' : this.state.text }
						onBlur={()=> {this._saveBio(this.state.text.replace(regex, ' '), this.props.user.token);}}
						onEndEditing={()=> {
							if (this.state.text !== null && this.state.text !== undefined && this.state.text !== ''){
								this._saveBio(this.state.text.replace(regex, ' '), this.props.user.token);
							}
						}}
					/>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		backgroundColor: 'white',
	},
	avatar_container: {
		marginTop: 20
	},
	titleTextInput: {
		color: COLOR_INACTIVE_TIPOFF,
		marginTop: 20,
	},
	textInput: {
		color: COLOR_ACTIVE_TIPOFF,
		fontSize: 18,
		borderBottomWidth: 2,
		borderColor: COLOR_ACTIVE_TIPOFF,
		marginLeft: 0,
	}
});
