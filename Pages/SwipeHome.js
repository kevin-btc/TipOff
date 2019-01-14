import React from 'react';
import { Container, Tab, Tabs, ScrollableTab, StyleProvider } from 'native-base';
import Home from './Home';
import UserTip from './UserTip';
import UserTipPoll from './UserTipPoll';

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/variables';

import { connect } from 'react-redux';

class SwipeHome extends React.Component {
	constructor() {
		super();
		this.state={
			activeTab: 0,
		};
	}
	render() {
		console.log('SwipeHome');
		return (
			<StyleProvider style={getTheme(material)}>
				<Container>
					<Tabs renderTabBar={()=> <ScrollableTab />}
						locked={!this.props.loggin}
						onChangeTab={(number) => {
							console.log(number.i);
							this.setState({activeTab: number.i});
						}}
					>
						<Tab heading="New" >
							<Home {...this.props} activeTab={this.state.activeTab}/>
						</Tab>
						<Tab heading="Mes Tips">
							<UserTip {...this.props} activeTab={this.state.activeTab}/>
						</Tab>
						<Tab heading="Mes votes">
							<UserTipPoll {...this.props} activeTab={this.state.activeTab}/>
						</Tab>
					</Tabs>
				</Container>
			</StyleProvider>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(SwipeHome);
