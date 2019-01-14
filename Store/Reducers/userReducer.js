const initialState = {
	user: {},
	loggin: false,
	cacheTip: [],
	isPictureUpdated: false,
	tipIncognito: 0,
	pollIncognito: 0,
	dateMounth: '',
	mail: '',
};
export default function userReducer(state = initialState, action) {
	let nextState;
	switch (action.type) {
	case 'IS_LOGGIN':
		console.log('IS_LOGGIN');
		if (action.value.loggin) {
			nextState = {
				...state,
				loggin: true,
				user: action.value.user,
				mail: action.value.mail,
			};
		} else {
			nextState = {
				...state,
				loggin: false,
				token: '',
				user: {},
			};
		}
		return nextState || state;

	case 'BIO_UPDATE':
		console.log('BIO_UPDATE');
		nextState = {
			...state,
			user: { ...state.user, bio: action.value}
		};
		return nextState || state;

	case 'CACHE_TIP':
		console.log('CACHE_TIP');
		nextState = {
			...state,
			cacheTip: action.value
		};
		return nextState || state;

	case 'UPDATE_PICTURE':
		console.log('UPDATE_PICTURE');
		nextState = {
			...state,
			isPictureUpdated: action.value
		};
		return nextState || state;

	case 'HANDLE_FRIENDS':
		console.log('HANDLE_FRIENDS');
		nextState = {
			...state,
			user: { ...state.user, friends: action.value}
		};
		return nextState || state;

	case 'TIP_INCOGNITO':
		console.log('TIP_INCOGNITO');
		const dateMonth = new Date().getMonth();
		nextState = {
			...state,
			tipIncognito: action.value
		};
		if (dateMonth !== state.dateMounth && action.value > 3){
			nextState = {
				...state,
				dateMounth: dateMonth,
				tipIncognito: 0,
			};
		}
		return nextState || state;

	case 'POLL_INCOGNITO':
		console.log('POLL_INCOGNITO');
		nextState = {
			...state,
			tipIncognito: action.value
		};
		return nextState || state;

	default:
		return state;
	}
}
