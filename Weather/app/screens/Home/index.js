import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Image,
  FlatList,
} from 'react-native';
import moment from 'moment';

import weatherSelector from '~/domain/selectors/weather';

import { doFetchData, repeatUnit } from '~/domain/actions/weather';
import { getTempFromUnit } from '~/utils';
import WeatherIcon from '~/assets/images/weather';

@connect(
  state => ({
    weather: weatherSelector.getWeather(state),
  }),
  { doFetchData, repeatUnit },
)
export default class Home extends Component {
  componentDidMount() {
    this.props.doFetchData();
  }

  onRefresh() {
    this.props.doFetchData({ isForceUpdate: true });
  }

  changeUnit(unit) {
    const { weather } = this.props;
    if (weather.unit !== unit) {
      this.props.repeatUnit(unit);
    }
  }

  renderController() {
    const { weather } = this.props;
    return (
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.changeUnit('C');
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: weather.unit === 'C' ? '#F44336' : '#999999',
              padding: 16,
            }}
          >
            °C
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: 1,
            backgroundColor: '#E5E5E5',
            height: 16,
            margin: 15,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.changeUnit('F');
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: weather.unit === 'F' ? '#F44336' : '#999999',
              padding: 16,
            }}
          >
            °F
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderCurrentData() {
    const { weather } = this.props;

    const currentUnit = weather.unit;
    const currentTemp = getTempFromUnit(weather.currentData.temp, currentUnit);
    const currentTempMin = getTempFromUnit(weather.currentData.tempMin, currentUnit);
    const currentTempMax = getTempFromUnit(weather.currentData.tempMax, currentUnit);
    const currentText = weather.currentData.text || '--';
    const currentCityName = weather.cityName || '--';
    const currentIconUri = WeatherIcon[weather.currentData.icon];

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#222222', marginTop: 16 }}>{currentCityName}</Text>
        <Text style={{
          fontSize: 99, color: '#F44336', marginTop: 10, marginBottom: 8,
        }}>
          {currentTemp}°{currentUnit}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 4, marginLeft: 0 }}>
            <Text style={{ fontSize: 14, color: 'red', paddingRight: 2 }}>↓</Text>
            <Text style={{ fontSize: 14, color: '#222222' }}>
              {currentTempMin}°
            </Text>
          </View>

          <View style={{ flexDirection: 'row', paddingHorizontal: 4, marginLeft: 16 }}>
            <Text style={{ fontSize: 14, color: 'red', paddingRight: 2 }}>↑</Text>
            <Text style={{ fontSize: 14, color: '#222222' }}>
              {currentTempMax}°
            </Text>
          </View>

          <View style={{
            flexDirection: 'row', paddingHorizontal: 4, marginLeft: 16, justifyContent: 'center',
          }}>
            <Image resizeMode="contain" style={{ width: 24, height: 24 }} source={currentIconUri} />
            <Text style={{ fontSize: 14, color: '#222222', paddingLeft: 8 }}>
              {currentText}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  renderDailyForecastItem(item, unit) {
    const { currentLanguage } = this.props;

    moment.locale(currentLanguage, require('moment/locale/vi'));

    const tempMin = getTempFromUnit(item.tempMin, unit);
    const tempMax = getTempFromUnit(item.tempMax, unit);
    const dayName = this.capitalize(moment(item.day).format('dddd'));
    const currentHour = 12;
    const iconUri = currentHour >= 17 || currentHour <= 6
      ? WeatherIcon[item.iconNight]
      : WeatherIcon[item.iconDay];

    return (
      <View style={{ flexDirection: 'row', marginVertical: 16 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Image resizeMode="contain" style={{ width: 29, height: 29 }} source={iconUri} />
          <Text style={{ fontSize: 14, color: '#222222', marginLeft: 8 }}>
            {dayName}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
        <Text style={{ fontSize: 14, color: 'red', paddingRight: 2 }}>↓</Text>
          <Text style={{ fontSize: 14, color: '#222222' }}>
            {tempMin}°
          </Text>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
        <Text style={{ fontSize: 14, color: 'red', paddingRight: 2 }}>↑</Text>
          <Text style={{ fontSize: 14, color: '#222222' }}>
            {tempMax}°
          </Text>
        </View>
      </View>
    );
  }

  renderDailyForecast() {
    const { forecastData, unit } = this.props.weather;
    return (
      <FlatList
      data={forecastData}
      style={{ paddingHorizontal: 16, marginTop: 16, flex: 1 }}
      keyExtractor={item => item.day}
      renderItem={({ item }) => this.renderDailyForecastItem(item, unit)}
       />
    );
  }

  render() {
    const { weather } = this.props;
    // console.log('weather ', weather);
    const textRefresh = weather.lastUpdate && weather.lastUpdate > 0
      ? `Last update: ${moment
        .unix(weather.lastUpdate)
        .startOf('minute')
        .fromNow()}`
      : '';
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'} />
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={weather.isFetching}
              onRefresh={() => this.onRefresh()}
              title={textRefresh}
            />
          }
        >
          {this.renderController()}
          {this.renderCurrentData()}
          {this.renderDailyForecast()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
