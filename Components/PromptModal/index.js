import React from 'react';
import {
	Text, TextInput, View
} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import BeemlyModal from '../BeemlyModal';
import styles from './styles';
import { COLOR_ACTIVE_TIPOFF } from '../utils';

export default class PromptModal extends React.Component {
	constructor(props) {
		super(props);
		const { defaultValue } = this.props;
		this.state = {
			inputValue: defaultValue,
			maxLengthReached: false,
			ckecked: false,
		};
		this.handleCheckBox = this.handleCheckBox.bind(this);
	}

	handleCheckBox(stateChecked) {
		this.setState({checked: !stateChecked});
	}

	render() {
		const {
			title, placeholder, buttonText, defaultValue, onSubmit, close,
			color, colorTextButton, keyboardType, value
		} = this.props;
		const { checked } = this.state;
		return (
			<BeemlyModal
				{...this.props}
				close={() => {
					this.setState({ inputValue: defaultValue });
					close();
				}}
			>
				<Text style={styles.title}>
					{title}
				</Text>
				{value.length > 0 && <Text
					style={{color: value.length < 100 ? 'black' : value.length < 130 ? 'orange' : 'red' , textAlign: 'center'}}
				>
					{`${value.length}/130`}
				</Text>}
				<TextInput
					style={{ ...styles.textInput, borderBottomColor: color }}
					placeholder={placeholder}
					onChangeText={value => {
						if (value.length < 131) {
							this.props.handlePrecision(value);
							if (this.state.maxLengthReached){
								this.setState({
									maxLengthReached: false,
								});
							}
						} else {
							this.setState({
								maxLengthReached: true,
							});
						}
					}}
					value={value}
					underlineColorAndroid={color}
					keyboardType={keyboardType}
				/>
				{this.state.maxLengthReached &&
				<Text style={{color: 'red', textAlign: 'center'}}>
					Nombre de caractères max atteind.
				</Text>}
				<CheckBox
					title={checked ? 'Incognito activé.\n0/3 restant ce mois.' : 'Souhaites tu voter en anonyme ?'}
					checked={checked}
					onPress={()=> this.handleCheckBox(checked)}
				/>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
					<Button
						onPress={() => {
							close();
						}}
						rounded
						color={colorTextButton}
						buttonStyle={{ ...styles.button, backgroundColor: color, width: 100}}
						title={'J\'annule'}
						fontSize={16}
					/>
					<Button
						onPress={() => {
							onSubmit(checked);
							close();
						}}
						rounded
						color={colorTextButton}
						buttonStyle={{ ...styles.button, backgroundColor: color, width: 100}}
						title={buttonText}
						fontSize={16}
					/>

				</View>
			</BeemlyModal>
		);
	}
}

PromptModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	defaultValue: PropTypes.string,
	value: PropTypes.string,
	color: PropTypes.string,
	colorTextButton: PropTypes.string,
	keyboardType: PropTypes.string,
};

PromptModal.defaultProps = {
	defaultValue: '',
	color: COLOR_ACTIVE_TIPOFF,
	colorTextButton: 'white',
	keyboardType: 'default',
	value: '',
};
