import React from 'react';
import { View, Dimensions } from 'react-native';
import Draggerable from './Draggerable';

export default class Answer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			initialPosition: [
				{x: props.size.width * 1 / 100, y: props.size.height * 72 / 100},
				{x: props.size.width * 51 / 100, y: props.size.height * 72 / 100},
				{x: props.size.width * 1 / 100, y: props.size.height * 50 / 100},
				{x: props.size.width * 51 / 100, y: props.size.height * 50 / 100},
				{x: props.size.width * 1 / 100, y: props.size.height * 28 / 100},
				{x: props.size.width * 51 / 100, y: props.size.height * 28 / 100}],
		};
	}

	render() {
		console.log('Answer');
		return (
			<View style={{height: this.props.size.height}}>
				{this.props.saveAnswer.map((a, i) => {
					if (a.visibilty) {
						return (
							<View key={i} style={{top: this.state.initialPosition[i].y , left: this.state.initialPosition[i].x}} >
								<Draggerable
									editable={this.props.editable}
									placeholder={a.placeholder}
									height={this.props.size.height}
									width={this.props.size.width}
									id={a.id}
									color={this.props.color}
									handleCoor={this.props.handleCoor}
									handleResponse={this.props.handleResponse}
									handleShowFooter={this.props.handleShowFooter}
								/>
							</View>
						);
					} else return null;
				})}
			</View>
		);
	}
}
