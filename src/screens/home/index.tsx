import * as React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  View,
} from 'react-native';

import {useGeneralContext} from '../../hooks/useGeneralContext';

import TemperaturesBlock from '../../components/TemperaturesBlock';
import RefreshButton from '../../components/RefreshButton';
import UnitsPicker from '../../components/UnitsPicker';
import CityBlock from '../../components/CityBlock';

import styles from './style';

import {HomeProps} from '../../types';

const Home = ({showLogInfo}: HomeProps) => {
  showLogInfo && console.log('START HOME');

  const {
    address,
    loadingCity,
    loadingTemperature,
    location,
    setLastUpdate,
    setWeather,
    weather,
  } = useGeneralContext();

  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  showLogInfo && console.log('START RENDERING HOME');

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View
          style={{
            width: windowWidth,
            height: windowHeight,
            backgroundColor: 'white',
          }}>
          <ImageBackground
            source={weather.backGroundImageFile}
            style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                flex: 1,
                padding: 20,
              }}>
              <CityBlock
                address={address}
                loadingCity={loadingCity}
                location={location}
              />

              <TemperaturesBlock
                loadingTemperature={loadingTemperature}
                weather={weather}
              />

              <View style={styles.refreshButtonContainer}>
                <RefreshButton setLastUpdate={setLastUpdate} />
              </View>

              <View style={styles.unitBlock}>
                <UnitsPicker setWeather={setWeather} weather={weather} />
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
