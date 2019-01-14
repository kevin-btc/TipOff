import React from 'react';
import Navigation from './Navigation/Navigation';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import Store from './Store/configurationStore';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import SplashScreen from 'react-native-splash-screen';
import { MenuProvider } from 'react-native-popup-menu';
import { COLOR_ACTIVE_TIPOFF } from './Components/utils';
import OneSignal from 'react-native-onesignal';
import { Root } from 'native-base';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		OneSignal.init('5a048b8e-10e7-4f43-98cf-ff441b1de039');
		OneSignal.addEventListener('received', this.onReceived);
		OneSignal.addEventListener('opened', this.onOpened);
		OneSignal.addEventListener('ids', this.onIds);
	}

	componentWillUnmount() {
		OneSignal.removeEventListener('received', this.onReceived);
		OneSignal.removeEventListener('opened', this.onOpened);
		OneSignal.removeEventListener('ids', this.onIds);
	}

	onReceived(notification) {
		console.log('Notification received: ', notification);
	}

	onOpened(openResult) {
		console.log('Message: ', openResult.notification.payload.body);
		console.log('Data: ', openResult.notification.payload.additionalData);
		console.log('isActive: ', openResult.notification.isAppInFocus);
		console.log('openResult: ', openResult);
	}

	onIds(device) {
		console.log('Device info: ', device);
	}

	componentDidMount() {
		SplashScreen.hide();
	}
	render() {
		let persistor = persistStore(Store);
		return (
			<SafeAreaView style={{flex: 1, backgroundColor: COLOR_ACTIVE_TIPOFF}}>
				<MenuProvider>
					<Provider store={Store}>
						<PersistGate persistor={persistor}>
							<Root>
								<Navigation />
							</Root>
						</PersistGate>
					</Provider>
				</MenuProvider>
			</SafeAreaView>
		);
	}
}
