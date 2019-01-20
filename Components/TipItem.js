import React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback,
} from 'react-native';
import ButtonAnswer from './ButtonAnswer';
import { signalOrDelete } from '../Components/utils';
import HeaderTipItem from './HeaderTipItem';
import FooterTipItem from './FooterTipItem';

import ProgressBar from 'react-native-progress/Bar';
import Image from 'react-native-image-progress';

export default class TipItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: true,
			myAnswerPoll: null,
			activeDetailTip: false,
		};
		this.handleActiveDetailTip = this.handleActiveDetailTip.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.visible === nextState.visible &&
			this.state.activeDetailTip === nextState.activeDetailTip &&
      this.props.item === nextProps.item &&
      this.props.picture === nextProps.picture &&
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
		if (myAnswerPoll.length !== 0){
			this.setState({myAnswerPoll, activeDetailTip: true}); // add tipPicture
		}
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
		const height = this.props.answer[0].sizePicture.height * width / this.props.answer[0].sizePicture.width;
				console.log('this.props',this.props);
		return (
			visible === true &&
			<View >
				<HeaderTipItem
					navigation={this.props.navigation}
					typeList={this.props.typeList}
					incognito={this.props.answer[0].incognito}
					username={this.props.username}
					createdAt={this.props.item.createdAt}
					question={this.props.question}
					avatar={this.props.avatar}
				/>
				<TouchableWithoutFeedback onLongPress={()=> this.deleteTip()}
				>
					<Image
						style={[styles.picture_tip, {height}]}
						indicator={ProgressBar}
						indicatorProps={{
							size: 80,
							borderWidth: 0,
							color: 'rgba(150, 150, 150, 1)',
							unfilledColor: 'rgba(200, 200, 200, 0.2)'
						}}
						source={{uri : this.props.picture}}
						overlayAlpha={0}
					>
						<ButtonAnswer
							height={height}
							width={width}
							item={this.props.item}
							answer={this.props.answer}
							user={this.props.user}
							userPoll={this.props.userPoll}
							loggin={this.props.loggin}
							color={this.props.answer[0].color}
							update={this.props.update}
							connexion={this.props.connexion}
							myAnswerPoll={this.state.myAnswerPoll !== null ? Number(this.state.myAnswerPoll[0].answerPoll) : -1}
							avatar={this.props.avatar}
							handleActiveDetailTip={this.handleActiveDetailTip}
						/>
					</Image>
				</TouchableWithoutFeedback>
				<FooterTipItem
					userPoll={this.props.userPoll}
					question={this.props.question}
					answer={this.props.answer}
					user={this.props.user}
					loggin={this.props.loggin}
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	picture_tip: {
		width: width,
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5,
		borderColor: 'grey',
		backgroundColor: 'black'
	}
});
