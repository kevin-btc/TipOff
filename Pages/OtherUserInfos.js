import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

import Avatar from '../Components/Avatar';
import {COLOR_ACTIVE_TIPOFF, COLOR_INACTIVE_TIPOFF} from '../Components/utils';


export default class UserTip extends React.Component {

	render() {
		console.log('OtheruserInfo');
		return (
			<ScrollView style={styles.main_container}>
				<View style={styles.avatar_container}>
					<Avatar
						user={this.props.user.username}
						size={100}
						token={this.props.user.token}
						disable={true}
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
						style={styles.textInput}
						autoCapitalize={'none'}
						autoCorrect={false}
						editable={false}
						value={this.props.user.username }
					/>
					<Text style={styles.titleTextInput}>MiniBio :</Text>
					<AutoGrowingTextInput
						style={styles.textInput}
						multiline={true}
						autoCapitalize={'none'}
						editable={false}
						value={this.props.user.bio === null ? this.props.user.username + ' n\'a pas encore rédigé de bio.' : this.props.user.bio}
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
		color: 'grey',
		fontSize: 18,
		borderBottomWidth: 2,
		borderColor: COLOR_ACTIVE_TIPOFF,
		marginLeft: 0,
	}
});
