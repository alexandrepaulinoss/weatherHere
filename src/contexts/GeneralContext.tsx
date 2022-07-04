import * as React from 'react';
import GetLocation from 'react-native-get-location';
import {lowerCase, round} from 'lodash';
import {format} from 'date-fns';

import {GOOGLE_KEY, OPEN_WEATHER_KEY} from '@env';

import {
  AddressProps,
  GeneralContextProps,
  LocationProps,
  WeatherProps,
} from '../types';

const GeneralContext = React.createContext({} as GeneralContextProps);

export const GeneralProvider: React.FC = ({showLogInfo, children}: any) => {
  const [loadingCity, setLoadingCity] = React.useState<boolean>(true);
  const [loadingTemperature, setLoadingTemperature] =
    React.useState<boolean>(true);

  const [lastUpdate, setLastUpdate] = React.useState<Date>(new Date());

  const [location, setLocation] = React.useState<LocationProps>({
    formattedCurrentDateTime: '',
    latitude: 0,
    longitude: 0,
    time: 0,
  });

  const [address, setAddress] = React.useState<AddressProps>({
    cityName: '',
    completeAddress: '',
    countryCode: '',
    stateName: '',
  });

  const [weather, setWeather] = React.useState<WeatherProps>({
    backGroundImageFile: require('../../assets/images/background_clear_day.jpg'),
    currentTemperature: 0,
    currentTemperatureFeel: 0,
    humidity: 0,
    maxTemperature: 0,
    minTemperature: 0,
    units: 'metric',
    weather: 'clear',
    weatherIcon: '',
    windSpeed: 0,
  });

  React.useEffect(() => {
    showLogInfo && console.log('GET CURRENT DEVICE POSITION');
    // Uses react-native-get-location to get the current device latitude, longitude and time (permission needed)
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(response => {
        setLocation({
          ...location,
          formattedCurrentDateTime: format(
            new Date(response.time),
            'HH:mma - cccc, dd MMMM yyyy',
          ),
          latitude: response.latitude,
          longitude: response.longitude,
          time: response.time,
        });

        showLogInfo &&
          console.log(
            'CURRENT POSITION: ',
            location.latitude,
            location.longitude,
            location.time,
          );
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, [lastUpdate]);

  React.useEffect(() => {
    if (location.latitude) {
      const apiUri = `https://maps.googleapis.com/maps/api/geocode/json?address=${location.latitude},${location.longitude}&key=${GOOGLE_KEY}`;

      showLogInfo && console.log('GOOGLE API URI: ', apiUri);

      setLoadingCity(true);
      fetch(apiUri)
        .then(response => response.json())
        .then(responseJson => {
          const addressNode = responseJson?.results?.[0];

          if (addressNode) {
            const addressCount = addressNode.address_components.length;

            setAddress({
              ...address,
              cityName:
                addressNode.address_components[addressCount - 4]?.short_name,
              completeAddress: addressNode.formatted_address,
              countryCode:
                addressNode.address_components[addressCount - 2]?.short_name,
              stateName:
                addressNode.address_components[addressCount - 3]?.short_name,
            });
          }
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        })
        .finally(() => setLoadingCity(false));
    }
  }, [location.time]);

  React.useEffect(() => {
    if (address.cityName) {
      const apiUri = `https://api.openweathermap.org/data/2.5/weather?q=${address.cityName},${address.stateName},${address.countryCode}&APPID=${OPEN_WEATHER_KEY}&units=${weather.units}`;

      showLogInfo &&
        console.log('OPEN WEATHER API URI: ', apiUri, location.time);

      setLoadingTemperature(true);
      fetch(apiUri)
        .then(data => data.json())
        .then(results => {
          const hours = new Date(location.time).getHours();
          const period = hours > 6 && hours < 18 ? 'day' : 'night';

          setWeather({
            ...weather,
            backGroundImageFile: getBackgroundImage({
              period,
              weather: results?.weather[0]?.main,
            }),
            currentTemperature: round(results.main?.temp),
            currentTemperatureFeel: round(results.main?.feels_like),
            humidity: results.main?.humidity,
            maxTemperature: round(results.main?.temp_max),
            minTemperature: round(results.main?.temp_min),
            weather: results?.weather[0]?.main,
            weatherIcon: `http://openweathermap.org/img/wn/${results?.weather[0]?.icon}@2x.png`,
            windSpeed: results.wind?.speed,
          });
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        })
        .finally(() => setLoadingTemperature(false));
    }
  }, [address.completeAddress, lastUpdate, weather.units]);

  return (
    <GeneralContext.Provider
      value={{
        address,
        loadingCity,
        loadingTemperature,
        location,
        setLastUpdate,
        setWeather,
        weather,
      }}>
      {children}
    </GeneralContext.Provider>
  );
};

type GetBackgroundImageProps = {
  period: 'day' | 'night';
  weather: string;
};

const getBackgroundImage = ({period, weather}: GetBackgroundImageProps) => {
  switch (lowerCase(weather)) {
    case 'clouds':
      return period === 'night'
        ? require('../../assets/images/background_cloudy_night.jpg')
        : require('../../assets/images/background_cloudy_day.jpg');

    case 'drizzle':
      return period === 'night'
        ? require('../../assets/images/background_rainy_night.jpg')
        : require('../../assets/images/background_rainy_day.jpg');

    case 'thunderstorm':
      return period === 'night'
        ? require('../../assets/images/background_rainy_night.jpg')
        : require('../../assets/images/background_rainy_day.jpg');

    case 'rain':
      return period === 'night'
        ? require('../../assets/images/background_rainy_night.jpg')
        : require('../../assets/images/background_rainy_day.jpg');

    case 'snow':
      return period === 'night'
        ? require('../../assets/images/background_snow_night.jpg')
        : require('../../assets/images/background_snow_day.jpg');

    default:
      return period === 'night'
        ? require('../../assets/images/background_clear_night.jpg')
        : require('../../assets/images/background_clear_day.jpg');
  }
};

export default GeneralContext;
