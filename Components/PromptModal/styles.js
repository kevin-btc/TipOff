import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
	title: {
		fontSize: 17,
		textAlign: 'center',
	},
	textInput: {
		margin: 5,
		padding: 10,
		borderBottomWidth: Platform.OS === 'ios' ? 1.5 : 0,
	},
	button: {
		marginTop: 20,
	},
});

export default styles;
