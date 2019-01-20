import React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
} from 'react-native';
import RenderAllChoice from './RenderAllChoice';
import { signalOrDelete } from '../Components/utils';
import HeaderTipItem from './HeaderTipItem';
import FooterTipItem from './FooterTipItem';


export default class TipItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: true,
			myAnswerPoll: null,
			activeDetailTip: false,
		};
		this.deleteTip = this.deleteTip.bind(this);
		this.handleActiveDetailTip = this.handleActiveDetailTip.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.visible === nextState.visible &&
      this.props.item === nextProps.item &&
			this.state.activeDetailTip === nextState.activeDetailTip &&
      this.props.username === nextProps.username &&
      this.props.question === nextProps.question &&
      this.props.update === nextProps.update &&
      this.props.user === nextProps.user &&
      this.props.loggin === nextProps.loggin &&
      this.props.answer === nextProps.answer
		) {
			return false;
		}
		return true;
	}

	componentWillMount() {
		const myAnswerPoll = this.props.userPoll.filter((e) => {return e.username === this.props.user.username;});
		if (myAnswerPoll.length !== 0)
			this.setState({myAnswerPoll, activeDetailTip: true});
	}

	deleteTip() {
		if (signalOrDelete(this.props.user, this.props.item, this.props.update, this.props.user.token) === false)
			this.setState({visible: false});
	}

	handleActiveDetailTip() {
		const prevStateActiveDetailTip = this.state.activeDetailTip;
		if (prevStateActiveDetailTip === false) {
			this.setState({
				activeDetailTip: true
			});
		}
	}

	render() {
		const visible = this.state.visible;
		const picture = JSON.parse(this.props.item.content);
		const heightTip = picture[6] < 3 ? (width / 2) / picture[5] * picture[4]: height - 200;
		return (
			visible === true &&
			<View >
				<HeaderTipItem
					navigation={this.props.navigation}
					typeList={this.props.typeList}
					incognito={picture[7].incognito}
					username={this.props.username}
					createdAt={this.props.item.createdAt}
					question={this.props.question}
					avatar={this.props.avatar}
				/>
				<View style={[styles.container_all_choice, { height: heightTip}]} >
					<RenderAllChoice
						onPress={this.onPress}
						picture={picture}
						connexion={this.props.connexion}
						answer={this.props.answer}
						deleteTip={this.deleteTip}
						userPoll={this.props.userPoll}
						loggin={this.props.loggin}
						user={this.props.user}
						idTip={this.props.item.id}
						myAnswerPoll={this.state.myAnswerPoll !== null ? Number(this.state.myAnswerPoll[0].answerPoll) : -1}
						handleActiveDetailTip={this.handleActiveDetailTip}
					/>
				</View>
				<FooterTipItem
					userPoll={this.props.userPoll}
					question={this.props.question}
					answer={this.props.answer}
					user={this.props.user}
					loggin={this.props.loggin}
					numberOfPicture={picture[6]}
					avatar={this.props.avatar}
					detailTip={this.props.detailTip}
					activeDetailTip={this.state.activeDetailTip}
					creatorTip={this.props.username}
					idTip={this.props.item.id}
				/>
			</View>
		);
	}
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container_all_choice: {
		width: '100%',
	}
});
