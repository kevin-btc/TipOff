/* @flow */

import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Share,
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
		console.log('this.props.activeDetailTip',this.props.activeDetailTip);
		return (
			<Animatable.View style={styles.row} animation={this.props.activeDetailTip ? 'zoomIn' : null }>
				<TouchableOpacity
					onPress={this.props.detailTip}
					style={{flexDirection: 'row'}}
					disabled={this.props.username === 'tip-off' ? false : !this.props.activeDetailTip }
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
//
// export class HiddenTip extends Component {
//   _HiddenTip() {
//     Alert.alert(
//       '🗑 Attention 🗑',
//       'Souhaites tu ne plus voir ce tip ?',
//       [
//         {text: 'Annuler', onPress: () => {}},
//         {text: 'Ne plus voir', onPress: () => {
//           if (deleteTip(user.id, myUser.token, update) === false){
//             return false
//           } else return true
//         }},
//       ],
//       { cancelable: false }
//     )
//   }
//
//   render() {
//     return (
//       <View style={{marginRight: 20}}>
//         <TouchableOpacity
//           onPress={() => this._HiddenTip()}
//         >
//         <View style={{flexDirection: 'row'}}>
//           <Icon
//             style={styles.share_image}
//             name='thumb-down'
//             color='black'
//             size={20}
//           />
//         </View>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }


export default class FooterTipItem extends React.Component {

	render() {
		return (
			<View style={styles.main_container}>
				<AvatarsUsersPoll
					userPoll={this.props.userPoll}
					detailTip={this.props.detailTip}
					loggin={this.props.loggin}
					username={this.props.user.username}
					activeDetailTip={this.props.activeDetailTip}
				/>
				{/*<HiddenTip
            user={this.props.user}
            answer={this.props.answer}
          />*/}
				<ShareTip
					numberOfPicture={this.props.numberOfPicture}
					question={this.props.question}
					answer={this.props.answer}
					user={this.props.user}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main_container: {
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5,
		borderColor: 'grey',
		alignItems: 'center',
		flexDirection: 'row',
		height: 50,
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
