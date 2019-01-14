/* @flow */

import React from 'react';
import {
	View,
	StyleSheet,
	Alert,
	Vibration,
} from 'react-native';

import RenderChoice from './RenderChoice';
import { voteToPercent } from './utils';
import ip from './ip';

import PromptModal from './PromptModal/index';


export default class RenderAllChoice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPoll: [0,0,0,0],
			result: ['','','','','',''],
			answer: null,
			alreadyPoll: false,
			answerPress: null,
			visiblePrompt: false,
			value: undefined
		};
		this.didPoll = this.didPoll.bind(this);
		this.onPress = this.onPress.bind(this);
		this.handlePrompt = this.handlePrompt.bind(this);
		this.handlePrecision = this.handlePrecision.bind(this);
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
		this.setState(nextState);
		this.props.handleActiveDetailTip();
	}

	handlePrompt(answerId){
		var alreadyPoll = this.props.userPoll.filter((e) => { return e.username === this.props.user.username; }).length > 0;
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
			fetch(`${ip.ip}/api/messages/vote/${this.props.idTip}?answerPoll=${this.state.answerPress}&user=${this.props.user.username}&comment=${this.state.value}&i=${incognito}`, {
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

	handlePrecision(text) {
		this.setState({value: text});
	}

	update(responseUpdate) {
  	let arrayResult = [0,0,0,0];
  	for (var i = 0; i < this.props.picture[6]; i++) {
  		arrayResult[i] = voteToPercent(responseUpdate[i].vote, responseUpdate, this.props.picture[6], true);
  	}
  	return arrayResult;
	}

	componentDidUpdate(prevProps, prevState){
  	if(prevState.answer !== this.props.answer){
  		this.setState({result: this.update(this.props.answer), answer: this.props.answer});
  	}
	}

	componentWillMount(){
  	this.setState({
  		result: this.update(this.props.answer),
  		answer: this.props.answer,
  		alreadyPoll: this.props.userPoll.filter((e) => { return e.username === this.props.user.username; }).length > 0
  	});
	}

	shouldComponentUpdate(nextProps, nextState) {
  	if(this.state === nextState &&
       this.props === nextProps
  	) {
  		return false;
  	}
  	return true;
	}

	render() {
  	return (
  		<View style={styles.container}>
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
  			<View style={styles.row}>
  				<RenderChoice
  					id={0}
  					picture={this.props.picture[0]}
  					result={this.state.result[0]}
  					onPressVote={this.handlePrompt}
  					deleteTip={this.props.deleteTip}
  					loggin={this.props.loggin}
  					username={this.props.user.username}
  					isPoll={this.state.isPoll}
  					myAnswerPoll={this.props.myAnswerPoll}
  					alreadyPoll={this.state.alreadyPoll}
  				/>
  				<RenderChoice
  					id={1}
  					picture={this.props.picture[1]}
  					result={this.state.result[1]}
  					onPressVote={this.handlePrompt}
  					deleteTip={this.props.deleteTip}
  					loggin={this.props.loggin}
  					username={this.props.user.username}
  					isPoll={this.state.isPoll}
  					myAnswerPoll={this.props.myAnswerPoll}
  					alreadyPoll={this.state.alreadyPoll}
  				/>
  			</View>
  			{this.props.picture[6] > 2 &&
        <View style={styles.row}>
        	<RenderChoice
        		id={2}
        		picture={this.props.picture[2]}
        		result={this.state.result[2]}
        		onPressVote={this.handlePrompt}
        		deleteTip={this.props.deleteTip}
        		loggin={this.props.loggin}
        		username={this.props.user.username}
        		isPoll={this.state.isPoll}
        		myAnswerPoll={this.props.myAnswerPoll}
        		alreadyPoll={this.state.alreadyPoll}
        	/>
        	{this.props.picture[6] > 3 &&
          <RenderChoice
          	id={3}
          	picture={this.props.picture[3]}
          	result={this.state.result[3]}
          	onPressVote={this.handlePrompt}
          	deleteTip={this.props.deleteTip}
          	loggin={this.props.loggin}
          	username={this.props.user.username}
          	isPoll={this.state.isPoll}
          	myAnswerPoll={this.props.myAnswerPoll}
          	alreadyPoll={this.state.alreadyPoll}
          />}
        </View>}
  		</View>
  	);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	row: {
		flexDirection: 'row',
		flex: 1
	}
});
