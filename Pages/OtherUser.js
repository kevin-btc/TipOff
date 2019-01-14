import React from 'react';
import { BackHandler, View, Keyboard} from 'react-native';

import { connect } from 'react-redux';

import OtherUserTip from './OtherUserTip';
import OtherUserTipPoll from './OtherUserTipPoll';
import OtherUserInfos from './OtherUserInfos';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/variables';
import Connection from './Connection';
import ip from '../Components/ip';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
	Container,
	Tabs,
	Tab,
	ScrollableTab,
	StyleProvider,
	Header,
	Button,
	Left,
	Right,
	Toast
} from 'native-base';



class OtherUser extends React.Component {

	constructor() {
		super();
		this.state = {
			isFollow: false
		};
	}

	handleFollow(stateFollow) {
		fetch(`${ip.ip}/api/users/me/follow`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.props.navigation.state.params.me.token
			},
			body: JSON.stringify({
				friend: this.props.navigation.state.params.otherUser.UserId,
			}),
		}).then((response) => response.json())
			.then((responseJson) => {
				this.setState({isFollow : !stateFollow});
				const action = { type: 'HANDLE_FRIENDS', value: responseJson.friends};
				this.props.dispatch(action);
				return responseJson;
			})
			.catch((error) => {
				console.error(error);
			});

	}

	componentDidMount() {
		const {me, otherUser } = this.props.navigation.state.params;
		const friends = me.friends !== undefined ? JSON.parse(me.friends) : [];
		if (friends !== null && friends.includes(otherUser.UserId)){
			this.setState({isFollow: true});
		}
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		if (this.props.navigation.state !== undefined)
			this.props.navigation.goBack();
		return true;
	}

	render(){
		console.log('OtherUser');
		const {me, otherUser} = this.props.navigation.state.params;
		const isFollow = this.state.isFollow;
		const isMe = me.username === otherUser.username ? false : true;
		if (this.props.loggin) {
			return (
				<StyleProvider style={getTheme(material)}>
					<Container >
						<Header span>
							<Left>
								<Button transparent onPress={() => {Keyboard.dismiss() ; this.props.navigation.goBack();}}>
									<IconMaterialIcons style={{marginBottom: 20}} name='arrow-back' type='MaterialIcons' size={25} color='white' />
								</Button>
							</Left>
							<Right>
								<Button transparent onPress={() => {
									if (isMe !== false){
										const follow = isFollow;
										this.handleFollow(isFollow);
										Toast.show({
											text: follow ? 'Retiré des personnes suivies' : 'Ajouté aux personnes suivies',
											type: follow ? 'warning' :'success',
											buttonText: 'Fermer',
											position: 'bottom',
											duration: 2000,
										});
									}
								}}
								>
									<SimpleLineIcons style={{marginBottom: 20, marginRight: 10}} name={!isMe || isFollow ? 'user-following' : 'user-follow'} color='white' size={20}/>
								</Button>
							</Right>
						</Header>
						<Tabs renderTabBar={() => <ScrollableTab/> }>
							<Tab heading="Ses infos">
								<OtherUserInfos user={otherUser} loggin={this.props.loggin} dispatch={this.props.dispatch} me={me} navigation={this.props.navigation}/>
							</Tab>
							<Tab heading="Ses Tips" >
								<OtherUserTip user={otherUser} loggin={this.props.loggin} token={this.props.user.token} me={me} navigation={this.props.navigation}/>
							</Tab>
							<Tab heading="Ses votes">
								<OtherUserTipPoll user={otherUser} loggin={this.props.loggin} token={this.props.user.token} me={me} navigation={this.props.navigation}/>
							</Tab>
						</Tabs>
					</Container>
				</StyleProvider>
			);
		} else if (!this.props.loggin){
			return (
				<View style={{flex: 1}}>
					<Connection noNavigate={true}/>
				</View>
			);
		}
	}
}

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(OtherUser);
