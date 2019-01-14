import React from 'react';
import { FlatList, StyleSheet, View, RefreshControl, ActivityIndicator } from 'react-native';
import TipItemPicture from './TipItemPicture';
import TipItem from './TipItem';
import TipItemEmpty from './TipItemEmpty';
import ip from './ip';
import {COLOR_ACTIVE_TIPOFF} from './utils';

export default class TipList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			footerloading:false,
		};
		this._onRefresh = this._onRefresh.bind(this);
	}

	_onRefresh = () => {
		this.setState({refreshing: true}, () => {
			this.props.update();
			this.setState({refreshing: false});
		});
	}
	shouldComponentUpdate(nextProps, nextState) {
		if( this.props === nextProps) {
			return false;
		}
		return true;
	}

	renderFooter = () => {
		if (!this.state.footerloading) return null;

		return (
			<View
				style={{
					paddingVertical: 20,
					borderTopWidth: 1,
					borderColor: '#CED0CE'
				}}
			>
				<ActivityIndicator animating size="large" />
			</View>
		);
	};

	render() {
		console.log('TipList');
		return (
			<View style={styles.list}>
				<View style={{flex: 1}}>
					<FlatList
						style={styles.list}
						ListHeaderComponent={this.props.ListHeaderComponent === undefined ? null : this.props.ListHeaderComponent}
						initialNumToRender={50}
						progressViewOffset={50}
						data={this.props.data}
						ListEmptyComponent={<TipItemEmpty typeList={this.props.typeList}/>}
						getItemLayout={(data, index) => (
							{length: 300, offset: 20 * index, index}
						)}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({item}) =>
						{
							const paramNavigationUser = {
								otherUser: {
									UserId: item.UserId,
									username: item.User.username,
									bio: item.User.bio
								},
								me: {
									username: this.props.user.username,
									userId: this.props.user.userId,
									token: this.props.user.token,
									friends: this.props.user.friends
								}
							};
							if (item.attachment.length < 100) {
								return (
									<View style={styles.item}>
										<TipItemPicture
											item={item}
											answer={JSON.parse(item.attachment)}
											avatar={`${ip.ip}/api/upload/${item.User.username}.jpg?avatar=true&${new Date().getHours()}`}
											username={item.User.username}
											question={item.title}
											update={this.props.update}
											typeList={this.props.typeList}
											connexion={() => this.props.navigation.navigate('Connection', {register: false, route: 'SwipeHome'})}
											detailTip={() => this.props.navigation.navigate('DetailTipPicture', {item, user: this.props.user, paramNavigationUser})}
											navigation={() => this.props.navigation.navigate('OtherUser', paramNavigationUser)}
											userPoll={item.usersPoll !== null ? JSON.parse(item.usersPoll) : []}
											user={this.props.user}
											loggin={this.props.loggin}
										/>
									</View>
								);
							} else
								return (
									<View style={styles.item}>
										<TipItem
											item={item}
											answer={JSON.parse(item.attachment)}
											picture={`${ip.ip}/api/upload/${item.content}`}
											avatar={`${ip.ip}/api/upload/${item.User.username}.jpg?avatar=true&${new Date().getHours()}`}
											username={item.User.username}
											question={item.title}
											update={this.props.update}
											typeList={this.props.typeList}
											connexion={()=> this.props.navigation.navigate('Connection', {register: false, route: 'SwipeHome'})}
											detailTip={() => this.props.navigation.navigate('DetailTip', {item, user: this.props.user, paramNavigationUser})}
											navigation={()=>this.props.navigation.navigate('OtherUser', paramNavigationUser)}
											userPoll={item.usersPoll !== null ? JSON.parse(item.usersPoll) : []}
											user={this.props.user}
											loggin={this.props.loggin}
										/>
									</View>
								);
						}
						}
						ListFooterComponent={this.renderFooter}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={() => this._onRefresh()}
							/>
						}
					/>
				</View>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	list: {
		flex: 1,
		backgroundColor: COLOR_ACTIVE_TIPOFF,
	},
	item: {
		marginLeft: 0,
		marginRight: 0,
		marginBottom: 5,
		backgroundColor: 'white',
		borderTopWidth: .5,
		borderBottomWidth: .5,
		borderRightWidth: .5,
		borderLeftWidth: .5,
		borderColor: 'grey',
	}
});
