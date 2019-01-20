import React from 'react';
import {Alert, StyleSheet, View, Dimensions, Keyboard, BackHandler} from 'react-native';

import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageCrop from 'react-native-image-crop-picker';
import { NavigationEvents } from 'react-navigation';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';

import BarEditCreateTip from '../Components/BarEditCreateTip';
import TipMultiAnswer, { TipMultiImage } from '../Components/TipMultiAnswer';
import BottomInputQuestion from '../Components/BottomInputQuestion';
import ip from '../Components/ip';
import configPicture, { ShowCurrentDate, COLOR_INACTIVE_TIPOFF, INITIAL_STATE } from '../Components/utils';

import { Header, Left, Right, Button, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/variables';

class CreateTipAnswers extends React.Component {

	constructor(props) {
		super(props);
		this.state = INITIAL_STATE;
		this.photo = this.photo.bind(this);
		this.colorBubble = this.colorBubble.bind(this);
		this.saveQuestion = this.saveQuestion.bind(this);
		this.coorBubble = this.coorBubble.bind(this);
		this.responseBubble = this.responseBubble.bind(this);
		this.onCrop = this.onCrop.bind(this);
		this.onChoiceCrop = this.onChoiceCrop.bind(this);
		this.addBubbleAnswerOrPhoto = this.addBubbleAnswerOrPhoto.bind(this);
		this.removeBubbleAnswerOrPhoto = this.removeBubbleAnswerOrPhoto.bind(this);
		this.sendTipToServer = this.sendTipToServer.bind(this);
		this.newTip = this.newTip.bind(this);
		this.isIncognito = this.isIncognito.bind(this);
		this.isPublic = this.isPublic.bind(this);
		this.handleShowFooter = this.handleShowFooter.bind(this);
		this.handleAnimationNoEntry = this.handleAnimationNoEntry.bind(this);
		this.activeMoovBubble = this.activeMoovBubble.bind(this);
	}

	colorBubble(color) {
		let nextState;
		let prevState = this.state;
		nextState = { ...prevState,
			saveAnswer: prevState.saveAnswer.map((item, index) => {
				if (index === 0) {
					return {...prevState.saveAnswer[0],
						color: color};
				} else {
					return {...prevState.saveAnswer[item.id]};
				}
			})
		};
		this.setState(nextState);
	}

	isIncognito(prevStateIncognito) {
		let nextState;
		let prevState = this.state;
		nextState = { ...prevState,
			saveAnswer: prevState.saveAnswer.map((item, index) => {
				if (index === 0) {
					return {...prevState.saveAnswer[0],
						incognito: !prevStateIncognito};
				} else {
					return {...prevState.saveAnswer[item.id]};
				}
			})
		};
		this.setState(nextState);
	}

	isPublic(prevStatePublic) {
		let nextState;
		let prevState = this.state;
		nextState = { ...prevState,
			saveAnswer: prevState.saveAnswer.map((item, index) => {
				if (index === 0) {
					return {...prevState.saveAnswer[0],
						public: !prevStatePublic};
				} else {
					return {...prevState.saveAnswer[item.id]};
				}
			})
		};
		this.setState(nextState);
	}

	_saveSizePicture(height, width) {
		let nextState;
		let prevState = this.state;
		nextState = { ...prevState,
			saveAnswer: prevState.saveAnswer.map((item, index) => {
				if (index === 0) {
					return {...prevState.saveAnswer[0],
						sizePicture: {height, width}};
				} else {
					return {...prevState.saveAnswer[item.id]};
				}
			})
		};
		this.setState(nextState);
	}

	coorBubble(i, x, y) {
		let nextState;
		let prevState = this.state;
		nextState = { ...prevState,
			saveAnswer: prevState.saveAnswer.map((item, index) => {
				if (index === i) {
					return {...prevState.saveAnswer[index],
						dim: {x: x, y: y}};
				} else {
					return {...prevState.saveAnswer[item.id]};
				}
			})
		};
		this.setState(nextState);
	}

	responseBubble(id, text) {
		let nextState;
		let prevState = this.state;
		nextState = { ...prevState,
			saveAnswer: prevState.saveAnswer.map((item, index) => {
				if (index === id) {
					return {...prevState.saveAnswer[id],
						text: text};
				} else {
					return {...prevState.saveAnswer[item.id]};
				}
			})
		};
		this.setState(nextState);
	}

	saveQuestion(question) {
		this.setState({question});
	}

	_sendAnswer(question, content, answer, token, picture) {
		const answerVisible = answer.filter(oneAnswer => oneAnswer.visibilty === true);

		fetch(`${ip.ip}/api/messages/new/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify({
				title: question.trim(),
				content: content,
				attachment: JSON.stringify(answerVisible),
			}),
		}).then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.title && responseJson.content) {
					this._sendImage(picture, content, token);
				}
				else {
					Alert.alert(responseJson.error);
				}
				return responseJson;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	_sendChoicePicture(question, content1, content2, content3, content4, token, picture1, picture2, picture3, picture4, numberOfPicture){
		const heightImage = picture1.height > picture2.height ? picture1.height : picture2.height;
		const widthImage = picture1.height > picture2.height ? picture1.width : picture2.width;
		fetch(`${ip.ip}/api/messages/new/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify({
				title: question.trim(),
				content: JSON.stringify([content1, content2, content3, content4, heightImage, widthImage, this.state.numberOfPicture, {incognito: this.state.saveAnswer[0].incognito}]),
				attachment: JSON.stringify([{vote : 0}, {vote : 0}, {vote : 0}, {vote : 0}, {public: this.state.saveAnswer[0].public}])
			}),
		}).then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.title && responseJson.content) {
					this._sendImage(picture1, content1, token);
					this._sendImage(picture2, content2, token);
					if (numberOfPicture > 2)
						this._sendImage(picture3, content3, token);
					if (numberOfPicture > 3)
						this._sendImage(picture4, content4, token);
				}
				else {
					Alert.alert(responseJson.error);
				}
				return responseJson;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	_sendImage(picture,name, token) {
		if (picture) {

			const data = new FormData();
			data.append('fileData', {
				uri : picture.uri,
				type: 'image/rt7v4ffyqzx',
				name: name,
			});
			const config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'multipart/form-data',
					'Authorization': 'Bearer ' + token
				},
				body: data,
			};
			fetch(`${ip.ip}/api/upload`, config)
				.then(responseData => {
				})
				.catch(err => {
					console.log(err);
				});
		}
	}

	onCrop() {
		let prevState = this.state;
		let nextState;
		ImageCrop.openCropper({
			path: prevState.picture.uri,
			cropping: true,
			freeStyleCropEnabled: true,
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height - 136,
			enableRotationGesture: true,
		}).then(image => {
			this.setState({ activeAnswer: false});
			nextState = { ...prevState,
				height: image.height,
				activeAnswer: true,
				width: image.width,
				saveAnswer:  prevState.saveAnswer.map((item, index) => {
					if (index === 0) {
						return {...prevState.saveAnswer[0],
							sizePicture: {height : image.height, width: image.width}};
					} else {
						return {...prevState.saveAnswer[item.id]};
					}
				}),
				picture: { ...prevState.picture, uri: image.path, height : image.height, width: image.width },
			};
			this.setState(nextState);
		}).catch(err => {
			nextState = {
				...prevState,
				activeAnswer: true
			};
			this.setState(nextState);
		});
	}

	onChoiceCrop(picture, idPicture) {
		let prevState = this.state;
		if (picture === undefined){
			Alert.alert('Oups', 'insert dabord une photo avant de la redecouper');
			return;
		}
		ImageCrop.openCropper({
			path: picture,
			cropping: true,
			freeStyleCropEnabled: true,
			width: Dimensions.get('window').width / 2,
			height: (Dimensions.get('window').height - 136) / 2,
			enableRotationGesture: true,
		}).then(image => {
			if (idPicture === 1 ){
				this.setState({ ...prevState,
					height: image.height < prevState.height ? prevState.height : image.height,
					picture: { ...prevState.picture, uri: image.path, height : image.height, width: image.width }});
			} else if (idPicture === 2 ){
				this.setState({ ...prevState,
					height: image.height < prevState.height ? prevState.height : image.height,
					picture2: { ...prevState.picture2, uri: image.path, height : image.height, width: image.width }});
			} if (idPicture === 3 ){
				this.setState({ ...prevState,
					height: image.height < prevState.height ? prevState.height : image.height,
					picture3: { ...prevState.picture3, uri: image.path, height : image.height, width: image.width }});
			} if (idPicture === 4 ){
				this.setState({ ...prevState,
					height: image.height < prevState.height ? prevState.height : image.height,
					picture4: { ...prevState.picture4, uri: image.path, height : image.height, width: image.width }});
			}
		}).catch(err => {
			console.log(err);
			if (prevState.picture2 === '')
				Alert.alert('Oupss...','L\'image 2 Manquante');
		});
	}

	photo(index, changePicture) {
		let prevState = this.state;
		let nextState;
		ImagePicker.showImagePicker(configPicture, (response) => {
			let route = prevState.picture === '' ? 'SwipeHome' : 'CreateTipAnswers';
			if (response.didCancel) {
				if (index === 0){
					this.props.navigation.navigate(route);
				}
			} else if (response.error) {
				if (index === 0){
					this.props.navigation.navigate(route);
				}
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
				if (index === 0 || index === 1) {
					this.setState({ activeAnswer: false});
					nextState = {
						...prevState,
						picture: response,
						activeAnswer: true,
						saveAnswer: prevState.saveAnswer.map((item, index) => {
							if (index === 0) {
								return {...prevState.saveAnswer[0],
									sizePicture: {height : response.height, width: response.width}};
							} else {
								return {...prevState.saveAnswer[item.id]};
							}
						})
					};
				} else if (index === 2){
					nextState = {
						...prevState,
						picture2: response,
						numberOfPicture: changePicture && prevState.picture2 !== '' ? prevState.numberOfPicture : prevState.numberOfPicture + 1
					};
				}else if (index === 3){
					nextState = {
						...prevState,
						picture3: response,
						numberOfPicture: changePicture ? prevState.numberOfPicture : prevState.numberOfPicture + 1
					};
				}else if (index === 4){
					nextState = {
						...prevState,
						picture4: response,
						numberOfPicture: changePicture ? prevState.numberOfPicture : prevState.numberOfPicture + 1
					};
				}
				this.setState(nextState);
			}
		});
	}

	sendTipToServer() {
		let prevState = this.state;
		if (prevState.question === undefined || prevState.question.trim().length < 2) {
			let nextState;
			nextState = { ...prevState, animationAble: true};
			this.setState(nextState);
		} else if (this.props.loggin && this.props.user.isAdmin){
			this.setState({animationSend: true});
			let prevProps = this.props;
			if (prevState.index === 0) {
				this._sendAnswer(
					prevState.question,
					`${ShowCurrentDate()}_${this.state.saveAnswer[0].incognito === true ? 'incognito' : this.props.user.username}_0`.toLowerCase(),
					prevState.saveAnswer,
					prevProps.user.token,
					prevState.picture,
				);}else if (prevState.index === 1) {
				this._sendChoicePicture(
					prevState.question,
					`${ShowCurrentDate()}_${this.state.saveAnswer[0].incognito === true ? 'incognito' : this.props.user.username}_1`.toLowerCase(),
					`${ShowCurrentDate()}_${this.state.saveAnswer[0].incognito === true ? 'incognito' : this.props.user.username}_2`.toLowerCase(),
					`${ShowCurrentDate()}_${this.state.saveAnswer[0].incognito === true ? 'incognito' : this.props.user.username}_3`.toLowerCase(),
					`${ShowCurrentDate()}_${this.state.saveAnswer[0].incognito === true ? 'incognito' : this.props.user.username}_4`.toLowerCase(),
					prevProps.user.token,
					prevState.picture,
					prevState.picture2,
					prevState.picture3,
					prevState.picture4,
					this.state.numberOfPicture,
				);}
			setTimeout(() => prevProps.navigation.navigate('SwipeHome', {loading : true}), 6000);
		} else {
			this.props.navigation.navigate('Connection', {route: 'CreateTipAnswers'});
		}
	}

	handleAnimationNoEntry() {
		const prevStateAnimationAble = this.state.animationAble;
		this.setState({
			animationAble: !prevStateAnimationAble
		});
	}

	handleShowFooter() {
		const prevStateFooter = this.state.showFooter;
		this.setState({
			showFooter: !prevStateFooter
		});
	}

	activeMoovBubble() {
		const prevStateEditable = this.state.editable;
		this.setState({
			editable: !prevStateEditable
		});
	}

	removeBubbleAnswerOrPhoto() {
		let prevState = this.state;
		let nextState;

		if (prevState.index === 0) {
			let found= -1;
			for (var index = 5 ; index > 0; index--) {
				if (prevState.saveAnswer[index].visibilty === true) {
					found = index;
					break;
				}
			}
			let nextState;
			nextState = { ...prevState,
				saveAnswer: prevState.saveAnswer.map((item, index) => {
					if (index === found) {
						return {...prevState.saveAnswer[found],
							visibilty: false};
					} else {
						return {...prevState.saveAnswer[item.id]};
					}
				})
			};
			this.setState(nextState);
		} if (prevState.index === 1 && prevState.numberOfPicture > 2) {
			nextState = { ...prevState,
				numberOfPicture: prevState.numberOfPicture - 1
			};
			this.setState(nextState);
		}
	}


	addBubbleAnswerOrPhoto() {
		let prevState = this.state;
		let nextState;

		if (prevState.index === 0) {
			let found= 0;
			for (var index = 0 ; index <= 5; index++) {
				if (prevState.saveAnswer[index].visibilty === false) {
					found = index;
					break;
				}
			}
			nextState = { ...prevState,
				saveAnswer: prevState.saveAnswer.map((item, index) => {
					if (index === found) {
						return {...prevState.saveAnswer[found],
							visibilty: true};
					} else {
						return {...prevState.saveAnswer[item.id]};
					}
				})
			};
			this.setState(nextState);
		} if (prevState.index === 1 && prevState.numberOfPicture < 4) {
			this.photo(prevState.numberOfPicture + 1);
		}
	}

	async newTip (index) {
		if (this.state.animationSend) {
			this.setState(INITIAL_STATE, () => {this.photo(0);});
		} else if (this.state.picture === '') {
			this.photo(index);
		} else if (!this.state.animationSend && this.state.picture !== '' && index !== -1){
			console.log('reload tip ');
		} else {
			this.setState({tipClear: true});
			setTimeout(() => this.setState(INITIAL_STATE, () => this.props.navigation.navigate('SwipeHome')), 3000);
		}
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componenDidUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		this.props.navigation.navigate('SwipeHome');
		return true;
	}

	shouldComponentUpdate(nextProps, nextState) {
  	if(this.state.picture === nextState.picture &&
       this.state.saveAnswer === nextState.saveAnswer &&
       this.state.picture2 === nextState.picture2 &&
       this.state.picture3 === nextState.picture3 &&
       this.state.picture4 === nextState.picture4 &&
       this.state.index === nextState.index &&
       this.state.animationSend === nextState.animationSend &&
       this.state.animationAble === nextState.animationAble &&
       this.state.numberOfPicture === nextState.numberOfPicture &&
       this.state.question === nextState.question &&
       this.state.showFooter === nextState.showFooter &&
       this.state.activeAnswer === nextState.activeAnswer &&
       this.state.tipClear === nextState.tipClear &&
       this.state.editable === nextState.editable
  	) {
  		return false;
  	}
  	return true;
	}

	render() {
  	console.log('CreateTipAnswers');
  	return (
  		<View style={[styles.main_container, {backgroundColor: COLOR_INACTIVE_TIPOFF}]}>
  			<StyleProvider style={getTheme(material)}>
  				<Header span>
  					<Left>
  						<Button transparent onPress={() => {Keyboard.dismiss() ; this.props.navigation.navigate('SwipeHome');}}>
  							<IconMaterialIcons style={{marginBottom: 20}} name='arrow-back' type='MaterialIcons' size={25} color='white' />
  						</Button>
  					</Left>
  					<Right>
  						<Button transparent onPress={() => this.isIncognito(this.state.saveAnswer[0].incognito)}>
  							<IconEntypo style={{marginBottom: 20, marginRight: 10}} type='Entypo' name='mask' color={this.state.saveAnswer[0].incognito ? 'white' : 'black'} size={this.state.saveAnswer[0].incognito ? 25 : 20}/>
  						</Button>
  						<Button transparent onPress={() => this.isPublic(this.state.saveAnswer[0].public)}>
  							<IconEntypo style={{marginBottom: 20, marginRight: 10}} type='Entypo' name='globe' color={this.state.saveAnswer[0].public && !this.state.saveAnswer[0].incognito ? 'white' : 'black'} size={this.state.saveAnswer[0].public && !this.state.saveAnswer[0].incognito ? 25 : 20}/>
  						</Button>
  						<Button transparent onPress={() => this.newTip(-1)} >
  							<IconEntypo style={{marginBottom: 20}} name='trash' color='white' size={25}/>
  						</Button>
  					</Right>
  				</Header>
  			</StyleProvider>

  			<NavigationEvents
  				onWillFocus={payload =>{
  					this.newTip(this.state.index);
  				}}
  			/>
  			{this.state.showFooter && this.state.picture !== '' &&
            <BarEditCreateTip
            	removeBubbleAnswerOrPhoto={this.removeBubbleAnswerOrPhoto}
            	addBubbleAnswerOrPhoto={this.addBubbleAnswerOrPhoto}
            	index={this.state.index}
            	onCrop={this.onCrop}
            	activeMoovBubble={this.activeMoovBubble}
            	editable={this.state.editable}
            />}
  			{this.state.animationSend &&
        <View style={styles.animationSend}>
        	<LottieView
        		resizeMode='contain'
        		source={require('../animations/sendTip.json')}
        		autoPlay
        		loop
        	/>
        </View>}
  			{this.state.tipClear &&
        <View style={styles.animationSend}>
        	<LottieView
        		resizeMode='contain'
        		source={require('../animations/clear.json')}
        		autoPlay
        		loop
        	/>
        </View>}
  			{this.state.picture !== '' &&
        <View style={{flex: 1}}>
        	<Swiper
        		loop={false}
        		showsButtons={true}
        		ref="swiper"
        		onIndexChanged={(index) => {this.setState({index});}}
        		activeDotColor={!this.state.showFooter ? 'transparent' : 'red'}
        		dotColor={!this.state.showFooter ? 'transparent' : 'white'}
        		showsButtons={false}
        		scrollEnabled={!this.state.showFooter ? false : true}
        	>
        		{this.state.activeAnswer &&
            <View>
            	<View style={[styles.menuPhoto, {marginLeft: d.width - 40 }]}>
            	</View>
            	<TipMultiAnswer
            		picture={this.state.picture}
            		widthScreen={d.width}
            		saveAnswer={this.state.saveAnswer}
            		color={this.state.saveAnswer[0].color}
            		handleColor={this.colorBubble}
            		handleCoor={this.coorBubble}
            		handleResponse={this.responseBubble}
            		takePhoto={this.photo}
            		editable={this.state.editable}
            		handleShowFooter={this.handleShowFooter}
            	/>
            </View>}
        		{this.state.index === 1 &&
            <TipMultiImage
            	picture1={this.state.picture}
            	picture2={this.state.picture2}
            	picture3={this.state.picture3}
            	picture4={this.state.picture4}
            	numberOfPicture={this.state.numberOfPicture}
            	layout={d.width}
            	takePhoto={this.photo}
            	cropPhoto={this.onChoiceCrop}
            />}
        	</Swiper>
        </View>
  			}
  			{this.state.picture !== '' && this.state.showFooter &&
          <BottomInputQuestion
          	handleQuestion={this.saveQuestion}
          	question={this.state.question}
          	sendTipToServer={this.sendTipToServer}
          	animationSend={this.state.animationSend}
          	handleAnimationNoEntry={this.handleAnimationNoEntry}
          	animationAble={this.state.animationAble}
          	showFooter={this.state.showFooter}
          />
  			}
  		</View>
  	);
	}
}

const d = Dimensions.get('window');

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
	},
	menuPhoto: {
		position: 'absolute',
		alignItems: 'flex-end',
		marginRight: 5,
		marginTop:10,
		zIndex: 1,
	},
	animationSend: {
		height: 200,
		width: 200,
		position: 'absolute',
		marginLeft: d.width / 2 - 100,
		marginTop: d.height / 2 - 100,
		borderRadius: 100,
		backgroundColor: 'white',
		zIndex: 2
	}
});

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(CreateTipAnswers);
