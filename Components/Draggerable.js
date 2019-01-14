import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	PanResponder,
	Animated,
	Dimensions,
	TextInput,
	Alert,
	Transforms,
	Text
} from 'react-native';
import MyInput from './MyInput';
import {COLOR_ACTIVE_TIPOFF} from './utils';

var {height, width} = Dimensions.get('window');

export default class Draggerable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showDraggable: true,
			pan: new Animated.ValueXY(),
		};
	}

	_saveCoor(y, x, id) {
		this.props.handleCoor(id, x, y);
	}

	componentDidMount(){
		this.currentPanValue = {x: 0, y: 0};
		this.panListener = this.state.pan.addListener((value) => this.currentPanValue = value);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.state === nextState &&
       this.props === nextProps
		) {
			return false;
		}
		return true;
	}

	componentWillUnmount(){
		this.state.pan.removeListener(this.panListener);
	}

	componentWillMount() {
		this._val = { x:0, y:0 };
		this.state.pan.addListener((value) => this._val = value);
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (e, gesture) => this.props.editable ? false : true,
			onPanResponderGrant: (e, gesture) => {
				this.state.pan.setOffset({
					x: this._val.x,
					y:this._val.y
				});
				this.state.pan.setValue({ x:0, y:0});
			},
			onPanResponderMove: Animated.event([
				null, { dx: this.state.pan.x, dy: this.state.pan.y }
			]),
			onPanResponderRelease: (e, gesture) => {
				this.state.pan.setOffset({x: this.currentPanValue.x, y: this.currentPanValue.y});
				this.state.pan.setValue({ x: 0, y:0});
				this.props.handleCoor(
					this.props.id,
					this.state.pan.x._offset / this.props.width,
					this.state.pan.y._offset / this.props.height
				);
			}
		});
	}
	isDropArea(gesture) {
		return gesture.moveY < height * 10 / 100;
	}

	render() {
		console.log('Draggerable');
		return (
			<View style={{position: 'absolute'}}>
				{this.renderDraggable()}
			</View>
		);
	}

	renderDraggable() {
		const panStyle = {
			transform: this.state.pan.getTranslateTransform()
		};

		if (this.state.showDraggable ) {
			return (
				<Animated.View
					{...this.panResponder.panHandlers}
					style={[panStyle, styles.circle, {
						backgroundColor: this.props.color,
						borderWidth: this.props.color === 'transparent' ? 1 : null}]}
				>
					<MyInput
						id={this.props.id}
						color={this.props.color}
    				placeholder={this.props.placeholder}
						editable={this.props.editable}
						handleResponse={this.props.handleResponse}
						handleShowFooter={this.props.handleShowFooter}
    			/>
				</Animated.View>
			);
		}
	}
}

let styles = StyleSheet.create({
	circle: {
		backgroundColor: COLOR_ACTIVE_TIPOFF,
		borderRadius: 10,
		alignItems: 'center',
	},
});
