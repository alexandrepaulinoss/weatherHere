import * as React from 'react';
import GetLocation from 'react-native-get-location';
import {Picker} from '@react-native-picker/picker';
import {lowerCase, round} from 'lodash';
import {format} from 'date-fns';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import styles from './style';

import {GOOGLE_KEY, OPEN_WEATHER_KEY} from '@env';

const Home: () => React.Node = () => {
  const showLogInfo = false;

  showLogInfo && console.log('START HOME');

  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  const [loadingCity, setLoadingCity] = React.useState<boolean>(true);
  const [loadingTemperature, setLoadingTemperature] =
    React.useState<boolean>(true);

  const [lastUpdate, setLastUpdate] = React.useState<Date>(new Date());
  const [latitude, setLatitude] = React.useState<number>(0);
  const [longitude, setLongitude] = React.useState<number>(0);
  const [time, setTime] = React.useState<number>(0);

  const [cityName, setCityName] = React.useState('');
  const [stateName, setStateName] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('');
  const [completeAddress, setCompleteAddress] = React.useState('');
  const [units, setUnits] = React.useState('metric');

  const [weather, setWeather] = React.useState<string>('clear');
  const [weatherIcon, setWeatherIcon] = React.useState<string>('');
  const [currentTemperature, setCurrentTemperature] = React.useState<number>(0);
  const [currentTemperatureFeel, setCurrentTemperatureFeel] =
    React.useState<number>(0);
  const [minTemperature, setMinTemperature] = React.useState<number>(0);
  const [maxTemperature, setMaxTemperature] = React.useState<number>(0);
  const [formattedCurrentDateTime, setFormattedCurrentDateTime] =
    React.useState<string>('');
  const [humidity, setHumidity] = React.useState<number>(0);
  const [windSpeed, setWindSpeed] = React.useState<number>(0);

  const [backGroundImageFile, setBackGroundImageFile] =
    React.useState<ImageSourcePropType>(
      require('../../../assets/images/background_clear_day.jpg'),
    );

  React.useEffect(() => {
    showLogInfo && console.log('GET CURRENT DEVICE POSITION');
    // Uses react-native-get-location to get the current device latitude, longitude and time (permission needed)
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        setTime(location.time);
        showLogInfo &&
          console.log('CURRENT POSITION: ', latitude, longitude, time);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, [lastUpdate]);

  React.useEffect(() => {
    if (latitude) {
      const apiUri = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${GOOGLE_KEY}`;

      showLogInfo && console.log('GOOGLE API URI: ', apiUri);

      setLoadingCity(true);
      fetch(apiUri)
        .then(response => response.json())
        .then(responseJson => {
          setLoadingCity(false);
          const addressNode = responseJson?.results?.[0];

          if (addressNode) {
            const addressCount = addressNode.address_components.length;

            setCityName(
              addressNode.address_components[addressCount - 4]?.short_name,
            );
            setStateName(
              addressNode.address_components[addressCount - 3]?.short_name,
            );
            setCountryCode(
              addressNode.address_components[addressCount - 2]?.short_name,
            );
            setCompleteAddress(addressNode.formatted_address);
          }
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    }
  }, [time]);

  React.useEffect(() => {
    if (cityName) {
      const apiUri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},${countryCode}&APPID=${OPEN_WEATHER_KEY}&units=${units}`;

      showLogInfo && console.log('OPEN WEATHER API URI: ', apiUri, time);

      setLoadingTemperature(true);
      fetch(apiUri)
        .then(data => data.json())
        .then(results => {
          setLoadingTemperature(false);
          setWeather(results?.weather[0]?.main);
          setCurrentTemperature(round(results.main?.temp));
          setCurrentTemperatureFeel(round(results.main?.feels_like));
          setMinTemperature(round(results.main?.temp_min));
          setMaxTemperature(round(results.main?.temp_max));
          setWeatherIcon(
            `http://openweathermap.org/img/wn/${results?.weather[0]?.icon}@2x.png`,
          );
          setWindSpeed(results.wind?.speed);
          setHumidity(results.main?.humidity);

          const hours = new Date(time).getHours();
          const period = hours > 6 && hours < 18 ? 'day' : 'night';

          setBackGroundImageFile(getBackgroundImage({period, weather}));
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    }
  }, [completeAddress, lastUpdate, units]);

  React.useEffect(() => {
    setFormattedCurrentDateTime(
      format(new Date(time), 'HH:mma - cccc, dd MMMM yyyy'),
    );
    showLogInfo && console.log('UPDATE TIME: ', formattedCurrentDateTime);
  }, [time]);

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
          <ImageBackground source={backGroundImageFile} style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                flex: 1,
                padding: 20,
              }}>
              <View style={styles.topBlock}>
                {loadingCity ? (
                  <ActivityIndicator size="large" color="#000" />
                ) : (
                  <>
                    <Text style={styles.cityName}>{cityName}</Text>
                    <Text style={styles.address}>{completeAddress}</Text>
                  </>
                )}
                <Text style={styles.dateTime}>{formattedCurrentDateTime}</Text>
              </View>
              <View style={styles.temperatureBlock}>
                {loadingTemperature ? (
                  <ActivityIndicator size="large" color="#000" />
                ) : (
                  <>
                    <View style={styles.temperatureLine}>
                      <Text style={styles.temperature}>
                        {currentTemperature}º{unitSymbol[units]}
                      </Text>
                      {weatherIcon ? (
                        <Image
                          style={styles.weatherIcon}
                          source={{uri: weatherIcon}}
                        />
                      ) : null}
                    </View>
                    <View style={styles.temperatureLine}>
                      <View style={styles.temperaturesColumn}>
                        <Text style={styles.temperatureAditional}>
                          Real feel {currentTemperatureFeel}º{unitSymbol[units]}
                        </Text>
                        <Text style={styles.temperatureAditional}>
                          Min {minTemperature}º{unitSymbol[units]}
                        </Text>
                        <Text style={styles.temperatureAditional}>
                          Max {maxTemperature}º{unitSymbol[units]}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.weatherAditional}>
                          Wind speed {windSpeed} {speedUnity[units]}
                        </Text>
                        <Text style={styles.weatherAditional}>
                          Humidity {humidity}
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
              <View style={styles.refreshButtonContainer}>
                <TouchableOpacity
                  style={styles.refreshButton}
                  onPress={() => {
                    setLastUpdate(new Date());
                  }}>
                  <Text>Refresh info</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.unitBlock}>
                <Picker
                  selectedValue={units}
                  onValueChange={itemValue => setUnits(itemValue)}
                  mode="dropdown"
                  style={styles.picker}>
                  <Picker.Item label="Celsius" value="metric" />
                  <Picker.Item label="Kelvin" value="standard" />
                  <Picker.Item label="Fahrenheit" value="imperial" />
                </Picker>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </>
  );

  showLogInfo && console.log('END HOME');
};

const unitSymbol: {[key: string]: string} = {
  imperial: 'F',
  metric: 'C',
  standard: 'K',
};

const speedUnity: {[key: string]: string} = {
  imperial: 'miles/hour',
  metric: 'meter/sec',
  standard: 'meter/sec',
};

type GetBackgroundImageProps = {
  period: 'day' | 'night';
  weather: string;
};

const getBackgroundImage = ({period, weather}: GetBackgroundImageProps) => {
  switch (lowerCase(weather)) {
    case 'clouds':
      return period === 'night'
        ? require('../../../assets/images/background_cloudy_night.jpg')
        : require('../../../assets/images/background_cloudy_day.jpg');

    case 'drizzle':
      return period === 'night'
        ? require('../../../assets/images/background_rainy_night.jpg')
        : require('../../../assets/images/background_rainy_day.jpg');

    case 'thunderstorm':
      return period === 'night'
        ? require('../../../assets/images/background_rainy_night.jpg')
        : require('../../../assets/images/background_rainy_day.jpg');

    case 'rain':
      return period === 'night'
        ? require('../../../assets/images/background_rainy_night.jpg')
        : require('../../../assets/images/background_rainy_day.jpg');

    case 'snow':
      return period === 'night'
        ? require('../../../assets/images/background_snow_night.jpg')
        : require('../../../assets/images/background_snow_day.jpg');

    default:
      return period === 'night'
        ? require('../../../assets/images/background_clear_night.jpg')
        : require('../../../assets/images/background_clear_day.jpg');
  }
};

export default Home;
