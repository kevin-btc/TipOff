/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Require cycle:',
  'ListView is deprecated',
])

AppRegistry.registerComponent(appName, () => App);
