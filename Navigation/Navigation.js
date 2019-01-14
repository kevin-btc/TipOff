import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import React from 'react';
import { tabBarIcon, StyleSheet, Image, View} from 'react-native';
import CreateTipAnswers from '../Pages/CreateTipAnswers';
import Connection from '../Pages/Connection';
import SwipeHome from '../Pages/SwipeHome';
import DetailTip from '../Pages/DetailTip';
import DetailTipPicture from '../Pages/DetailTipPicture';
import User from '../Pages/User';
import OtherUser from '../Pages/OtherUser';
import {COLOR_ACTIVE_TIPOFF, COLOR_INACTIVE_TIPOFF} from '../Components/utils';

const TipStackNavigator = createStackNavigator({

	CreateTipAnswers: {
		screen: CreateTipAnswers,
		navigationOptions: {
			header: null,
			tabBarVisible: false,
			headerStyle: {
				backgroundColor: COLOR_ACTIVE_TIPOFF,
			},
			headerTitleStyle: {
				color: 'white',
			},
			backBehavior: 'none'
		},
	},
	Connection: {
		screen: Connection,
		navigationOptions: {
			headerLeft: null,
			statusBarHidden: true,
			header: null,
			tabBarVisible: false,
			headerTitleStyle: {
				color: 'white',
			},
			headerStyle: {
				backgroundColor: 'COLOR_ACTIVE_TIPOFF',
			}
		},
	},
},   {
	initialRouteName: 'CreateTipAnswers',
});

const HomeStackNavigator = createStackNavigator({
	SwipeHome : {
		screen: SwipeHome,
		navigationOptions: {
			// title: 'Tip\'Off',
			// headerLeft: null,
			header: null,
			headerTitleStyle: {
				color: 'white',
			},
			headerStyle: {
				backgroundColor: COLOR_ACTIVE_TIPOFF,
			}
		}
	},
	DetailTip : {
		screen: DetailTip,
		navigationOptions: {
			title: 'Detail des votes',
			headerTitleStyle: {
				color: 'white',
			},
			headerStyle: {
				backgroundColor: COLOR_ACTIVE_TIPOFF,
			}
		}
	},
	DetailTipPicture : {
		screen: DetailTipPicture,
		navigationOptions: {
			title: 'Detail des votes',
			headerTitleStyle: {
				color: 'white',
			},
			headerStyle: {
				backgroundColor: COLOR_ACTIVE_TIPOFF,
			}
		}
	},
	OtherUser : {
		screen: OtherUser,
		navigationOptions: {
			header: null,
		}
	},
});

const UserStackNavigator = createStackNavigator({
	User : {
		screen: User,
		navigationOptions: {
			header: null,
			tabBarVisible: true,
		}
	},
	DetailTip : {
		screen: DetailTip,
		navigationOptions: {
			title: 'Detail des votes',
			headerTitleStyle: {
				color: 'white',
			},
			headerStyle: {
				backgroundColor: COLOR_ACTIVE_TIPOFF,
			}
		}
	},
	DetailTipPicture : {
		screen: DetailTipPicture,
		navigationOptions: {
			title: 'Detail des votes',
			headerTitleStyle: {
				color: 'white',
			},
			headerStyle: {
				backgroundColor: COLOR_ACTIVE_TIPOFF,
			}
		}
	},
	OtherUser : {
		screen: OtherUser,
		navigationOptions: {
			header: null,
		}
	},
});

UserStackNavigator.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.index > 0) {
		tabBarVisible = false;
	}
	return {
		tabBarVisible,
	};
};


const TipTabNavigator = createBottomTabNavigator(
	{
		SwipeHome: {
			screen: HomeStackNavigator,
			navigationOptions: {
				headerLeft: null,
				tabBarVisible: true,
				tabBarIcon: () => {
					return <Image
						source={require('../images/icones/question_answer.png')}
						style={styles.icon}/>;
				}
			}
		},
		CreateTipAnswers: {
			screen: TipStackNavigator,
			navigationOptions: {
				tabBarVisible: false,
				// gesturesEnabled:true,
				// swipeEnabled: true,
				// animationEnabled: true,
				tabBarIcon: () => {
					return <Image
						source={require('../images/icones/add_comment_white_24dp.png')}
						style={styles.icon}/>;
				}
			}
		},
		User: {
			screen: UserStackNavigator,
			navigationOptions: {
				// gesturesEnabled:true,
				// swipeEnabled: true,
				// animationEnabled: true,
				tabBarIcon: () => {
					return <Image
						source={require('../images/icones/account_circle_white_24dp.png')}
						style={styles.icon}/>;
				}
			}
		},
	},
	{
		initialRouteName: 'SwipeHome',
		tabBarOptions: {
			activeBackgroundColor: COLOR_ACTIVE_TIPOFF,
			inactiveBackgroundColor: COLOR_INACTIVE_TIPOFF,
			showLabel: false,
			showIcon: true,
			style: { borderTopWidth: 0, elevation: 8, shadowColor: 'pink' },
		},
	}
);

const styles = StyleSheet.create({
	icon: {
		width: 30,
		height: 30
	},
});

export default TipTabNavigator;
