/* @flow */

import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Share,
	Alert,
} from 'react-native';

import ip from './ip';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

export class AvatarsUsersPoll extends React.Component {
	constructor() {
		super();
		this.state = {
			activeDetailTip: false,
		};
	}
	render() {
		let translate = 5;
		return (
			<Animatable.View style={styles.row} animation={this.props.activeDetailTip ? 'zoomIn' : null }>
				<TouchableOpacity
					onPress={this.props.detailTip}
					style={{flexDirection: 'row'}}
					disabled={this.props.username === 'tip-off' || this.props.creatorTip === this.props.username ? false : !this.props.activeDetailTip }
				>
					{ this.props.userPoll && this.props.userPoll.map((a, i) => {
						translate -= 8;
						const username = a.incognito === 'true' ? 'incognito' : a.username;
						if (i < 10){
							return (
								<Image
									key={i}
									source={{uri: `${ip.ip}/api/upload/${username}.jpg?avatar=true&${new Date().getHours()}`}}
									style={[styles.smallAvatar, {transform:[{translateX: translate}]}]}
								/>
							);
						} else if (i === 10) {
							return (
								<View key={i} style={{transform:[{translateX: translate}]}}>
									<Text
										style={[styles.text, {marginTop: 4}]}
									>
										{`   + ${this.props.userPoll.length - 10} autres...`}
									</Text>
								</View>
							);
						} else {
							return null;
						}
					})}
				</TouchableOpacity>
			</Animatable.View>
		);
	}
}

export class ShareTip extends React.Component {
	_shareTip(nbrPicture) {
		const {question, answer} = this.props;
		const choice1 = answer[0].text === undefined || answer[0].text === '' ? answer[0].placeholder : answer[0].text;
		let choice2 = '...';
		if (answer.length === 2) {
			choice2 = answer[1].text === undefined || answer[1].text === '' ? answer[1].placeholder : answer[1].text;
		}
		const username = this.props.user.username === undefined ? 'un ami a toi' : this.props.user.username;
		var shareImage;
		if (nbrPicture === undefined) {
			shareImage = {
				title: `Partagé par ${username}`,
				message: `${username} t'invite à répondre à :\n\n${question}\nChoix 1: ${choice1}\nChoix 2: ${choice2}\nChoix 3: ...\n\nRejoins nous egalement pour répondre à (ou poser) des milliers de questions et avis en images interactives sur l'app https://tip-off.fr 😄`.trim(),
			};
		} else {
			shareImage = {
				title: `Partagé par ${username}`,
				message: `${username} t'invite à répondre à :\n\n${question}\nViens vite y repondre en cliquant sur l'une des ${nbrPicture} images interactives...\n\nRejoins nous egalement pour répondre à (ou poser) des milliers de questions et avis en images interactives sur l'app https://tip-off.fr 😄`.trim(),
			};
		}
		Share.share(shareImage).catch(err => console.log(err));
	}

	render() {
		return (
			<View style={styles.container_share}>
				<TouchableOpacity
					onPress={() => this._shareTip(this.props.numberOfPicture)}
				>
					<View style={{flexDirection: 'row'}}>
						<Text style={styles.text}>Partager  </Text>
						<Image
							style={styles.share_image}
							source={require('../images/icones/ic_share.png')}
						/>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

export class HidenTip extends React.Component {

	constructor() {
		super();
		this.state = {
			textButtonHidenTip: 'Ne plus voir ce tip'
		};
	}

	reqHidenTip(){
		fetch(`${ip.ip}/api/messages/hidenTipForUser/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.props.user.token,
			},
			body: JSON.stringify({
				'idTip': this.props.idTip
			})
		}).then((response) => {
			this.setState({
				textButtonHidenTip: 'Ce Tip ne te sera plus proposé',
			})
		})
			.catch((error) => {
				console.error(error);
			});
	}

	_hidenTip() {
		Alert.alert(
			'🗑 Attention 🗑',
			'Souhaites tu vraiment ne plus voir ce tip ?',
			[
				{text: 'Annuler', onPress: () => {}},
				{text: 'Ne plus voir', onPress: () => {
					this.reqHidenTip();
				}},
			],
			{ cancelable: true }
		);
	}

	render() {
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Icon.Button
					name="eye-off-outline"
					backgroundColor="transparent"
					iconStyle={{color:'black', textAlign: 'center'}}
					onPress={() => this._hidenTip()}
				>
					<Text style={{fontFamily: 'Arial', fontSize: 13, color:'black'}}>{this.state.textButtonHidenTip}</Text>
				</Icon.Button>
			</View>
		);
	}
}

export default class FooterTipItem extends React.Component {
	render() {
		console.log('props', this.props);
		return (
			<View>
				<View style={styles.hidenTip}>
					<HidenTip
						user={this.props.user}
						answer={this.props.answer}
						idTip={this.props.idTip}
					/>
				</View>
				<View style={styles.action_user}>
					<AvatarsUsersPoll
						userPoll={this.props.userPoll}
						detailTip={this.props.detailTip}
						loggin={this.props.loggin}
						username={this.props.user.username}
						activeDetailTip={this.props.activeDetailTip}
						creatorTip={this.props.creatorTip}
					/>
					<ShareTip
						numberOfPicture={this.props.numberOfPicture}
						question={this.props.question}
						answer={this.props.answer}
						user={this.props.user}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main_container: {

	},
	hidenTip: {
		height: 30,
	},
	action_user: {
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5,
		borderColor: 'grey',
		alignItems: 'center',
		flexDirection: 'row',
		height: 40,
	},
	row: {
		marginLeft: 10,
		flex: 5,
		flexDirection: 'row'
	},
	container_share: {
		flex: 1,
		marginRight: 10,
		alignItems: 'center'
	},
	share_image: {
		width: 20,
		height: 20
	},
	smallAvatar: {
		width: 25,
		height: 25,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: 'white',
	},
	text: {
		fontSize: 10,
		marginTop: 2
	}
});
