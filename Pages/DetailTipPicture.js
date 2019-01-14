/* @flow */

import React from 'react';
import {
	View,
	Text,
	Image,
	FlatList,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	BackHandler
} from 'react-native';

import { Tooltip } from 'react-native-elements';

import ip from '../Components/ip';
import { layoutScreen } from '../Components/utils';

export default class DetailTipPicture extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isActiveList: null,
			imagesColor: [null,null,null,null]
		};
		// this.getColor = this.getColor.bind(this);
	}

	title(response, color) {
		return response.text === undefined || response.text === '' ? color === 'transparent' ? '' : response.placeholder : response.text;
	}

	getListEmpty(usersPollPerAnswer) {
		let activeList = usersPollPerAnswer.map((oneAnswer) => {
			if (oneAnswer.length === 0){
				return false;
			}
			return true;
		});
		return activeList;
	}

	componentWillMount(){
		this.setState({isActiveList: this.getListEmpty(this.sortUsersPerPoll(JSON.parse(this.props.navigation.state.params.item.attachment),JSON.parse(this.props.navigation.state.params.item.usersPoll)))});
	}

	sortUsersPerPoll(answer, usersPoll) {
		return answer.map((oneAnswer, index) => {
			const nbrUsersPoll = usersPoll.length;
			let usersPerPoll = [];
			for (var i = 0; i < nbrUsersPoll; i++) {
				if (index === Number(usersPoll[i].answerPoll)){
					usersPerPoll.push({username: usersPoll[i].username, comment: usersPoll[i].comment, incognito: usersPoll[i].incognito});
				}
				if (i === nbrUsersPoll - 1){
					return usersPerPoll;
				}
			}
		});
	}

	didHidden(id) {
		let nextState;
		let prevState = this.state;
		nextState = { ...prevState,
			isActiveList: prevState.isActiveList.map((item, index) => {
				if (index === id) {
					return !prevState.isActiveList[id];
				} else {
					return prevState.isActiveList[index];
				}
			})
		};
		this.setState(nextState);
	}

	componentDidMount() {
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

	// getColor(image , index) {
	// 	console.log('this.state.imagesColor[index]', this.state.imagesColor[index]);
	// 	if(this.state.imagesColor[index] === null){
	// 		colorsFromUrl(`${ip.ip}/api/upload/${image}`, (err, colors) => {
	// 			if(!err) {
	// 				let nextState;
	// 				let prevState = this.state;
	// 				nextState = { ...prevState,
	// 					imagesColor: prevState.imagesColor.map((imageColor, id) => {
	// 						if (index === id) {
	// 							return colors.averageColor;
	// 						} else {
	// 							return prevState.imageColor;
	// 						}
	// 					})
	// 				};
	// 				this.setState(nextState);
	// 			}
	// 		});
	// 	}
	// }

	render() {
		const {item} = this.props.navigation.state.params;
		const answer = JSON.parse(item.attachment);
		const pictures = JSON.parse(item.content);
		const usersPoll = JSON.parse(item.usersPoll);
		const usersPollPerAnswer = this.sortUsersPerPoll(answer, usersPoll);

		console.log('DetailTipPicture');
		return (
			<ScrollView>
				{answer.map((oneAnswer, index) => {
					return (
						<FlatList
							data={usersPollPerAnswer[index]}
							style={{height: 'auto'}}
							keyExtractor={item => item.id}
							key={index}
							ListEmptyComponent={
								this.state.isActiveList[index] && <View style={{margins: 30}}>
									<Text style={{textAlign: 'center', marginVertical: 20}}>
										{'🙈Pas encore de vote 🙈'}
									</Text>
								</View>
							}
							ListHeaderComponent={
								usersPollPerAnswer[index].length !== 0 && <TouchableOpacity onPress={()=> this.didHidden(index)}>
									<View style={{flex: 1, backgroundColor: 'lightgrey', shadowColor: 'grey', elevation: 5, marginBottom: 7}}>
										<Image
											style={{height: 50}}
											source={{uri: `${ip.ip}/api/upload/${pictures[index]}`}}
											resizeMode={'contain'}
										>
											{this.title(oneAnswer, answer[0].color)}
										</Image>
									</View>
								</TouchableOpacity>
							}
							numColumns={Math.floor(layoutScreen.width / 45)}
							renderItem={({ item }) => {
								const resultWidth = item.comment !== undefined ? Math.floor(item.comment.length * 150 / 30) : 0;
								const username = item.incognito === 'true' ? 'incognito' : item.username;
								return(
									this.state.isActiveList[index] &&
                  <Tooltip
                  	containerStyle={{flex: 1}}
                  	width={resultWidth > layoutScreen.width - 40 ? layoutScreen.width - 40 : resultWidth < 150 ? 150 : resultWidth}
                  	height={60}
                  	popover={
                  		item.comment === 'undefined' ||  item.comment === undefined ?
                  			<Text style={[{fontSize: 10}, styles.text]}>{username} {'n\'a pas ajouté de précision'} </Text>
                  			:
                  			<View>
                  				<Text style={[{fontSize: 10}, styles.text]}>{username} dit:</Text>
                  				<Text style={styles.text}>{item.comment}</Text>
                  			</View>
                  	}
                  	toggleOnPress={true}>
                  	<View style={{alignItems: 'center', flexWrap: 'nowrap', marginLeft: 5}}>
                  		<Image
                  			backgroundColor={'black'}
                  			source={{ uri: `${ip.ip}/api/upload/${username}.jpg?avatar=true&${new Date().getHours()}`}}
                  			style={{
                  				height: 40,
                  				width: 40,
                  				borderRadius: 50,
                  				padding: 5,
													borderWidth: 2,
													borderColor: item.comment !== 'undefined' &&  item.comment !== undefined ? '#2eff00' : null,
                  			}}
                  		/>
                  		<Text style={{fontSize: 10}}>{username.length > 7 ? username.slice(0, 5) + '...': username}</Text>
                  	</View>
                  </Tooltip>
								);}}
						/>
					);

				})}
			</ScrollView>
		);
	}
}


const styles = StyleSheet.create({
	text: {
		color: 'white',
	},
});
