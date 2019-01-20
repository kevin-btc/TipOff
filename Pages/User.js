import React from 'react';
import { BackHandler, View} from 'react-native';

import { connect } from 'react-redux';

import UserInfos from './UserInfos';
import Friends from './Friends';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/variables';
import Connection from './Connection';

import OneSignal from 'react-native-onesignal';

import Loading from '../Components/Loading';

import {
	Container,
	Header,
	Title,
	Button,
	Icon,
	Tabs,
	Tab,
	Right,
	Body,
	ScrollableTab,
	StyleProvider,
	Text,
} from 'native-base';

class User extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
		};
		this._isLoggin = this._isLoggin.bind(this);
	}

	_isLoggin() {
		if (this.props.loggin === true) {
			OneSignal.sendTag('username', '');
			this.props.dispatch({ type: 'IS_LOGGIN', value: {loggin: false}});
			this.props.navigation.navigate('SwipeHome');
			this.setState({loading: false});
		}
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		this.props.navigation.navigate('SwipeHome');
		return true;
	}

	render(){
		if (this.state.loading) {
			return (
				<Loading
					isLoading={this.state.loading}
					animationChicken={false}
					size='large'
				/>
			);
		} else if (this.props.loggin) {
			return (
				<StyleProvider style={getTheme(material)}>
					<Container >
						<Header hasTabs>
							<Body>
								<Title>Tip Off</Title>
							</Body>
							<Right>
								<Button transparent onPress={() => {
									this.setState({loading: true}, () => setTimeout(() => this._isLoggin(), 500));
								}}>
									<Text>Deconnexion </Text>
									<Icon name="log-out" />
								</Button>
							</Right>
						</Header>
						<Tabs renderTabBar={() => <ScrollableTab/> }>
							<Tab heading="Mes infos">
								<UserInfos
									user={this.props.user}
									loggin={this.props.loggin}
									dispatch={this.props.dispatch}
									navigation={this.props.navigation}
								/>
							</Tab>
							<Tab heading="Mes Tip'r">
								<Friends
									user={this.props.user}
									loggin={this.props.loggin}
									navigation={this.props.navigation}
								/>
							</Tab>
						</Tabs>
					</Container>
				</StyleProvider>
			);
		} else {
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

export default connect(mapStateToProps)(User);
