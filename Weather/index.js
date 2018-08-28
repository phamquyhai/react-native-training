/** @format */

import { AppRegistry } from 'react-native';
import App from './app/index';
import { name as appName } from './app.json';

console.disableYellowBox = true; // eslint-disable-line

AppRegistry.registerComponent(appName, () => App);
