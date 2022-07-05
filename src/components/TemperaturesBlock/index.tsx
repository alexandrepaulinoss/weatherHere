import * as React from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';

import {speedUnity, unitSymbol} from '../../helpers';

import styles from './style';

import {TemperaturesBlockProps} from '../../types';

const TemperaturesBlock = ({
  loadingTemperature,
  weather,
}: TemperaturesBlockProps) => {
  return (
    <View style={styles.temperatureBlock}>
      {loadingTemperature ? (
        <>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.temperatureLoading}>Loading temperatures</Text>
        </>
      ) : (
        <>
          <View style={styles.temperatureLine}>
            <Text style={styles.temperature}>
              {weather.currentTemperature}º{unitSymbol[weather.units]}
            </Text>
            {weather.weatherIcon ? (
              <Image
                style={styles.weatherIcon}
                source={{uri: weather.weatherIcon}}
              />
            ) : null}
          </View>
          <View style={styles.temperatureLine}>
            <View style={styles.temperaturesColumn}>
              <Text style={styles.temperatureAditional}>
                Real feel {weather.currentTemperatureFeel}º
                {unitSymbol[weather.units]}
              </Text>
              <Text style={styles.temperatureAditional}>
                Min {weather.minTemperature}º{unitSymbol[weather.units]}
              </Text>
              <Text style={styles.temperatureAditional}>
                Max {weather.maxTemperature}º{unitSymbol[weather.units]}
              </Text>
            </View>
            <View>
              <Text style={styles.weatherAditional}>
                Wind speed {weather.windSpeed} {speedUnity[weather.units]}
              </Text>
              <Text style={styles.weatherAditional}>
                Humidity {weather.humidity}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default TemperaturesBlock;
