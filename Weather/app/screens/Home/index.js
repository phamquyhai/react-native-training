import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import weatherSelectors from '~/domain/selectors/weather';

@connect(
  state => ({
    currentData: weatherSelectors.getCurrentData(state),
  }),
  {},
)
export default class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Current Temp: {this.props.currentData.temp}</Text>
      </View>
    );
  }
}
