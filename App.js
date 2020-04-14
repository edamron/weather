import React, { useState } from 'react';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';
import {
  Text, 
  KeyboardAvoidingView, 
  ImageBackground, 
  StyleSheet, 
  Platform, 
  View,
  ActivityIndicator,
  StatusBar } from 'react-native';
import { 
  fetchLocationId, 
  fetchWeather,
  fetchWeatherFahrenheit } from './utils/api';

export default function App() {
  const [weatherInfo, setWeatherInfo] = useState({
    location: 'Where to?',
    weather: '',
    temperature: -99
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleUpdateLocation = async (city) => {
    if (!city)
      return;

    setLoading(true);
    setError(false);

    try {
      let woeid = await fetchLocationId(city);
      let info = await fetchWeather(woeid);

      setWeatherInfo(fetchWeatherFahrenheit(info));
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const renderError = () => {
    return (
      <Text style={ [styles.smallText, styles.textStyle] }>
        {`Couldn't load weather for that location.\nPlease try a different city.`}
      </Text>
    )
  }

  const renderLocationInfo = () => {
    return (
      <View>
        <Text style={ [styles.largeText, styles.textStyle] }>
          { weatherInfo.location }
        </Text>
        <Text style={ [styles.smallText, styles.textStyle] }>
          { weatherInfo.weather }
        </Text>
        <Text style={ [styles.largeText, styles.textStyle] }>
          { weatherInfo.temperature == -99 ? '' : `${weatherInfo.temperature}º` }
        </Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={ styles.container } behavior="height" >
      <StatusBar barStyle="light-content" />
      <ImageBackground source={ getImageForWeather(weatherInfo.weather) } style={styles.imageContainer} imageStyle={styles.image}>
        
        <View style={styles.detailsContainer}>
          {/* <ActivityIndicator animating={loading} color="white" size="large" /> */}

          {/* {!loading && ( */}
            <View>
              {error && renderError()}
              {!error && renderLocationInfo()}
              <SearchInput onSubmit={ handleUpdateLocation } />
              <ActivityIndicator style={{ paddingTop: 20 }} animating={loading} color="white" size="large" />
            </View>
          {/* )} */}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto', // 'ios' or 'android'
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  }
});
