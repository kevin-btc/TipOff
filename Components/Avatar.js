import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ip from './ip';
import configPicture from './utils';


export default class Avatar extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			avatar: '',

		};
		this._avatarClicked = this._avatarClicked.bind(this);
	}

	_avatarClicked () {
		ImagePicker.showImagePicker(configPicture, (response) => {
			if (response.didCancel) {
				console.log('L\'utilisateur a annulé');
			}
			else if (response.error) {
				console.log('Erreur : ', response.error);
			}
			else {
				console.log('Photo : ', response.uri );
				let requireSource = response;
				this.setState({
					avatar: requireSource
				}, () => this._sendImage(requireSource));
			}
		});
	}

	_sendImage(picture) {
		if (picture) {
			const uri  = picture.uri;
			const type = picture.type;
			const name = `${this.props.user}.jpg`;

			const data = new FormData();
			data.append('fileData', {
				uri : uri,
				type: type,
				name: name,
			});
			const config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'multipart/form-data',
					'Authorization': 'Bearer ' + this.props.token
				},
				body: data,
			};
			fetch(`${ip.ip}/api/upload?avatar=true`, config)
				.then(responseData => {
					this.setState({
						disabled: false,
						picture: '',
					});
				})
				.catch(err => {
					console.log(err);
					this.setState({
						disabled: false,
					});
				});
		}
	}

	render() {
		console.log('avatar');
		return (
			<TouchableOpacity style={styles.touchableOpacity} disabled={this.props.user === undefined ? false : this.props.disable ? true : false} onPress={() => this._avatarClicked()}>
				<Image
					style={[styles.image, {width: this.props.size, height: this.props.size}]}
					source={this.state.avatar !== '' ? this.state.avatar  : {uri: `${ip.ip}/api/upload/${this.props.user}.jpg?avatar=true&${new Date().getHours()}`}}
				/>
			</TouchableOpacity>
		);
	}
}

const styles=StyleSheet.create({
	touchableOpacity: {
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: 'white'
	},
	image: {
		borderRadius: 50,
		borderColor: '#9B9B9B',
		borderWidth: 2
	}
});
