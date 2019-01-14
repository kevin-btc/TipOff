import ip from './ip';
import { Alert, Dimensions } from 'react-native';

export const layoutScreen = Dimensions.get('window');

export default {
	quality: 1,
	title: 'Insérer une image a partir de ...',
	maxWidth: layoutScreen.width, //600
	maxHeight: layoutScreen.height - 136, //500
	takePhotoButtonTitle: 'Mon appareil photo ? 📷',
	chooseFromLibraryButtonTitle: 'Mon album photo ? 📚',
	cancelButtonTitle: 'ANNULER',
	cameraType: 'front',
	allowsEditing: true,
	storageOptions: {
		skipBackup: true
	}
};

export const COLOR_ACTIVE_TIPOFF = '#00B7FF';
export const COLOR_INACTIVE_TIPOFF = '#009DDB';
export const RED_TIFOFF = '#B02796';
export const PURPLE_TIFOFF = '#21069A';
export const GREEN_TIFOFF = '#0AC44A';
export const YELLOW_TIFOFF = '#BDDB5F';

export const INITIAL_TIP =
  [
  	{placeholder: '👍', text: undefined, visibilty: true, id: 0, dim: {x: 0, y: 0}, vote: 0, sizePicture: {height: 0, width: 0}, color: COLOR_ACTIVE_TIPOFF, incognito: false, public: true},
  	{placeholder: '👎', text: undefined, visibilty: true, id: 1, dim: {x: 0, y: 0}, vote: 0, color: COLOR_ACTIVE_TIPOFF},
  	{placeholder: '👌', text: undefined, visibilty: false, id: 2, dim: {x: 0, y: 0}, vote: 0, color: COLOR_ACTIVE_TIPOFF},
  	{placeholder: '😂', text: undefined, visibilty: false, id: 3, dim: {x: 0, y: 0}, vote: 0, color: COLOR_ACTIVE_TIPOFF},
  	{placeholder: '👊', text: undefined, visibilty: false, id: 4, dim: {x: 0, y: 0}, vote: 0, color: COLOR_ACTIVE_TIPOFF},
  	{placeholder: '😅', text: undefined, visibilty: false, id: 5, dim: {x: 0, y: 0}, vote: 0, color: COLOR_ACTIVE_TIPOFF},
  ];

export const INITIAL_STATE =
{
	picture: '',
	picture2: '',
	picture3: '',
	picture4: '',
	index: 0,
	numberOfPicture: 1,
	showFooter: true,
	animationAble: false,
	question: undefined,
	saveAnswer: INITIAL_TIP,
	tipClear: false,
	activeAnswer: true,
	animationSend: false,
	editable: true,
};

export function ShowCurrentDate(){
	var date = new Date().getDate();
	var month = new Date().getMonth() + 1;
	var year = new Date().getFullYear();
	var hours = new Date().getHours() ;
	var minutes = new Date().getMinutes();
	var seconds = new Date().getSeconds();

	return `${date}${month}${year}${hours + 2}${minutes}${seconds}`;
}

export function delay(createdAt) {
	const d = {
		year: createdAt.substr(0, 4),
		month: createdAt.substr(5, 2),
		day: createdAt.substr(8, 2),
		hour: createdAt.substr(11, 2),
		minute: createdAt.substr(14, 2),
	};
	const diff = new Date().getTime() - new Date(d.year+'/'+d.month+'/'+d.day+' '+ d.hour + ':' + d.minute).getTime() - 60 * 60 * 1000;
	const sec = parseInt(diff / 1000);
	const minute = parseInt(sec / 60);
	const hour = parseInt(minute / 60);
	const day = parseInt(hour / 24);
	const week = parseInt(day / 7);
	if (hour < 1) {
		if(minute === 0)
			return 'a l\'instant';
		return String(minute).concat(' min. ');
	}
	else if (hour < 24) {
		return String(hour).concat(' h. ');
	} else if (day < 7) {
		return String(day).concat(' j. ');
	} else {
		return String(week).concat(' sem. ');
	}
}

export function voteToPercent(nbrVoteElement, nbrVoteTotal, nb, isTipPicture) {
	const prevNbrVoteTotal = nbrVoteTotal;

	if (isTipPicture === true)
	{
		var nbrVoteTotal = {
			vote : [
				prevNbrVoteTotal[0].vote,
				prevNbrVoteTotal[1].vote,
				prevNbrVoteTotal[2].vote,
				prevNbrVoteTotal[3].vote,
			]};
	} else if (isTipPicture === false) {
		var nbrVoteTotal = {
			vote : [
				prevNbrVoteTotal[0] !== undefined ? prevNbrVoteTotal[0].vote : 0,
				prevNbrVoteTotal[1] !== undefined ? prevNbrVoteTotal[1].vote : 0,
				prevNbrVoteTotal[2] !== undefined ? prevNbrVoteTotal[2].vote : 0,
				prevNbrVoteTotal[3] !== undefined ? prevNbrVoteTotal[3].vote : 0,
				prevNbrVoteTotal[4] !== undefined ? prevNbrVoteTotal[4].vote : 0,
				prevNbrVoteTotal[5] !== undefined ? prevNbrVoteTotal[5].vote : 0,
			]};
	}
	let toFixed = 1;
	let resultVoteTotal = 0;
	let result = 0;
	let sortVote = [
		nbrVoteTotal.vote[0],
		nbrVoteTotal.vote[1],
		nbrVoteTotal.vote[2],
		nbrVoteTotal.vote[3],
		nbrVoteTotal.vote[4],
		nbrVoteTotal.vote[5]
	];
	sortVote.sort(function(a, b) {
		return b - a;
	});
	for (let i = 0; i < nb; i++) {
		if (nbrVoteTotal.vote[i] !== undefined || nbrVoteTotal.vote[i] !== 0){
			resultVoteTotal += nbrVoteTotal.vote[i];
		}
	}
	result = nbrVoteElement * 100 / resultVoteTotal;
	if (parseInt(result) == parseFloat(result)){
		toFixed = 0;
	}
	if (nbrVoteElement === sortVote[0] && nbrVoteElement !== 0 ) {
		return '🏆 ' + result.toFixed(toFixed)  + '%' + ' 🏆';
	} else if (nbrVoteElement === sortVote[1] && nbrVoteElement !== 0){
		return '🥈 ' + result.toFixed(toFixed)  + '%' + ' 🥈';
	}else if (nbrVoteElement === sortVote[2] && nbrVoteElement !== 0){
		return '🥉 ' + result.toFixed(toFixed)  + '%' + ' 🥉';
	}else if (nbrVoteElement === sortVote[nb - 1] && nbrVoteElement !== 0){
		return '🍅 ' + result.toFixed(toFixed)  + '%' + ' 🍅';
	}
	if(isNaN(result) || result === 0)
		return '💩 Pas encore de vote 💩';
	return result.toFixed(toFixed)  + '%';
}

export function deleteTip(id, token, update){
	fetch(`${ip.ip}/api/messages/erase/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		},
	}).then((response) => response.json())
		.then((responseJson) => {
			update();
			return false;
		})
		.catch((error) => {
			console.error(error);
		});
}

export function signalTip(id, token, username){
	fetch(`${ip.ip}/api/signalTip`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: JSON.stringify({
			idTip: JSON.stringify(id),
			username: JSON.stringify(username),
		}),
	}).then((responseJson) => {
		return true;
	})
		.catch((error) => {
			console.error(error);
		});
}

export function signalOrDelete(myUser, user, update , token) {
	if (myUser.userId === user.UserId) {
		Alert.alert(
			'🗑 Attention 🗑',
			'Souhaites tu vraiment supprimer ce tip ?',
			[
				{text: 'Annuler', onPress: () => {}},
				{text: 'Supprimer', onPress: () => {
					if (deleteTip(user.id, myUser.token, update) === false){
						return false;
					} else return true;
				}},
			],
			{ cancelable: false }
		);
	} else {
		Alert.alert(
			'⚠️ Attention ⚠️',
			'Souhaites tu vraiment signaler ce tip pour contenu inaproprié interdit par notre reglement ?',
			[
				{text: 'Annuler', onPress: () => {}},
				{text: 'Signaler', onPress: () => {return signalTip(user.id, myUser.token, myUser.username);}},
			],
			{ cancelable: false }
		);
	}
}
