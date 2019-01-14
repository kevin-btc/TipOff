import React from 'react';
import { Alert, View, StyleSheet, Text, TouchableOpacity, Vibration, Keyboard, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import ip from './ip';
import {voteToPercent, COLOR_ACTIVE_TIPOFF} from './utils';

import PromptModal from './PromptModal/index';

export default class ButtonAnswer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPoll: [0,0,0,0,0,0],
			result: ['','','','','',''],
			answer: null,
			onPressDisabled: false,
			value: undefined,
			visiblePrompt: false,
			alreadyPoll: false,
			answerPress: null,
			initialPosition: [
				{x: props.width * 1 / 100, y: props.height * 72 / 100},
				{x: props.width * 51 / 100, y: props.height * 72 / 100},
				{x: props.width * 1 / 100, y: props.height * 50 / 100},
				{x: props.width * 51 / 100, y: props.height * 50 / 100},
				{x: props.width * 1 / 100, y: props.height * 28 / 100},
				{x: props.width * 51 / 100, y: props.height * 28/ 100}]
		};
		this.handlePrompt = this.handlePrompt.bind(this);
		this.handlePrecision = this.handlePrecision.bind(this);
	}

	handlePrompt(item, answerId, answer, userPoll){
		var alreadyPoll = userPoll.filter((e) => { return e.username === this.props.user.username; }).length > 0;

		if (!alreadyPoll && this.props.user.username !== undefined && !this.state.isPoll.includes(true)) {
			const prevStatePrompt = this.state.visiblePrompt;
			this.setState({
				visiblePrompt: !prevStatePrompt,
				answerPress: answerId,
			});
		} else if (!this.props.loggin){
			Alert.alert(
				'😁 Connexion Requise... 😁',
				'\nConnectes toi pour répondre a ce Tip.',
				[
					{text: 'Me connecter', onPress: this.props.connexion},
					{text: 'Retour', onPress: () => {}},
				],
				{ cancelable: true }
			);
			Vibration.vibrate([0,10,100,10]);
		} else {
			Alert.alert('Vote : ', 'Mince ! Ce tip ne permet pas de donner ton avis plusieurs fois.');
			Vibration.vibrate([0,10,100,10,100,10]);
		}
	}

onPress = (incognito) => {
	if (incognito === undefined)
		incognito = false;
	this.setState({onPressDisabled: true});
	Vibration.vibrate(10);
	if (this.props.comment !== '') {
		fetch(`${ip.ip}/api/messages/vote/${this.props.item.id}?answerPoll=${this.state.answerPress}&user=${this.props.user.username}&comment=${this.state.value}&i=${incognito}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.props.user.token
			}
		}).then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					result: this.update(JSON.parse(responseJson.attachment)),
					alreadyPoll: true,
				},
				() => this.didPoll(this.state.answerPress)
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}
}

didPoll(id) {
	let nextState;
	let prevState = this.state;
	nextState = { ...prevState,
		isPoll: prevState.isPoll.map((item, index) => {
			if (index === id) {
				return true;
			} else {
				return 0;
			}
		})
	};
	this.props.handleActiveDetailTip();
	this.setState(nextState);
}

update(responseUpdate) {
	let arrayResult = [0,0,0,0,0,0];
	const nb = responseUpdate.length;
	for (var i = 0; i < nb; i++) {
		arrayResult[i] = voteToPercent(responseUpdate[i].vote, responseUpdate, nb , false);
	}
	return arrayResult;
}

shouldComponentUpdate(nextProps, nextState) {
	if(this.state === nextState &&
     this.props === nextProps
	) {
		return false;
	}
	return true;
}


componentDidUpdate(prevProps, prevState){
	if(prevState.answer !== this.props.answer){
		this.setState({result: this.update(this.props.answer), answer: this.props.answer});
	}
}

handleSizeValue(value){
	if (value.length < 10) {
		return 20;
	} else if (value.length > 9 && value.length < 14) {
		return 15;
	} else {
		return 10;
	}
}

componentWillMount(){
	this.setState({
		result: this.update(this.props.answer),
		answer: this.props.answer,
		alreadyPoll: this.props.userPoll.filter((e) => { return e.username === this.props.user.username; }).length > 0
	});
}

handlePrecision(text) {
	this.setState({value: text});
}
////////////////////////////////////////////////////////////////////////////
render() {
	return (
		<View>
			<PromptModal
				visible={this.state.visiblePrompt}
				close={() => {
					this.setState({
						visiblePrompt: false,
					});
				}}
				title="Ajoutes une precision"
				placeholder="Max 130 caract."
				value={this.state.value}
				handlePrecision={this.handlePrecision}
				buttonText="Je vote"
				onSubmit={(incognito) => {
					this.setState({
						visiblePrompt: false,
					});
					this.onPress(incognito);
				}}
			/>
			{this.props.answer.map((a, i) => {
				if (a.visibilty) {
					return (
						<TouchableOpacity style={{
							position: 'absolute',
							top: this.state.initialPosition[i].y + (a.dim.y * this.props.height) ,
							left: this.state.initialPosition[i].x + (a.dim.x  * this.props.width)}}
						key={i} activeOpacity={0.1}
						onPress={() => {this.handlePrompt(this.props.item, a.id, this.props.answer, this.props.userPoll);}}
						disabled={this.state.onPressDisabled}
						>
							<Animatable.View animation="tada"
								iterationDelay={30000}
								iterationCount="infinite"
								useNativeDriver={true}
								duration={3000} >
								<View  style={[
									styles.circle,
									{backgroundColor: this.props.color, minWidth: 65}]}
								>
									<Text
										style={[
											styles.answer,
											{fontSize: a.text ? this.handleSizeValue(a.text) : 25}]}
									>
										{a.text === undefined || a.text === '' ? this.props.answer[0].color === 'transparent' ? '' : a.placeholder : a.text}
									</Text>
									<View style={{position: 'absolute', right: '10%', top: '35%'}}>
										{(this.props.myAnswerPoll === i || this.state.isPoll[i] === true) && this.props.loggin &&
                      <Image
                      	key={i}
                      	source={{uri: `${ip.ip}/api/upload/${this.props.user.username}.jpg?avatar=true&${new Date().getHours()}`}}
                      	style={styles.smallAvatar}
                      />
										}
									</View>
									{(a.vote !== 0 || this.state.isPoll[i] === true) && this.state.alreadyPoll === true &&
                  <View style={styles.container_score}>
                  	<Text style={styles.score}> {this.state.result[i]} </Text>
                  </View>}
								</View>
							</Animatable.View>
						</TouchableOpacity>
					);
				} else return null;
			})}
		</View>
	);
}
}

const styles = StyleSheet.create({
	container_score: {
		alignSelf: 'stretch',
	},
	score: {
		alignSelf: 'stretch',
		overflow: 'hidden',
		textAlign: 'center',
		borderBottomLeftRadius: 7,
		borderBottomRightRadius: 7,
		fontWeight: '100',
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.6)',
		color: 'white'
	},
	circle: {
		borderRadius: 10,
		zIndex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		textAlign: 'center',

	},
	answer: {
		color: 'white',
		marginHorizontal: 5,
	},
	smallAvatar: {
		position: 'absolute',
		marginLeft: 0,
		width: 20,
		height: 20,
		borderRadius: 50,
		borderWidth: 0.5,
		borderColor: 'grey',
		zIndex: 2,
	},
});
