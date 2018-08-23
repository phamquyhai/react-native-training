import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import weatherSelector from '~/domain/selectors/weather';

import { doFetchData } from '~/domain/actions/weather';

@connect(
  state => ({
    currentData: weatherSelector.getCurrentData(state),
  }),
  { doFetchData },
)
export default class Home extends Component {
  componentDidMount() {
    this.props.doFetchData();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Current Temp: {this.props.currentData && this.props.currentData.temp}</Text>
      </View>
    );
  }
}
