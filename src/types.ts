import {ImageSourcePropType} from 'react-native';

export type AddressProps = {
  cityName: string;
  completeAddress: string;
  countryCode: string;
  lastUpdate: Date | null;
  stateName: string;
};

export type CityBlockProps = {
  address: AddressProps;
  loadingCity: boolean;
  location: LocationProps;
};

export type GeneralContextProps = {
  address: AddressProps;
  loadingTemperature: boolean;
  loadingCity: boolean;
  location: LocationProps;
  setLastUpdate: React.Dispatch<React.SetStateAction<Date>>;
  setWeather: React.Dispatch<React.SetStateAction<WeatherProps>>;
  weather: WeatherProps;
};

export type HomeProps = {
  showLogInfo: boolean;
};

export type LocationProps = {
  formattedCurrentDateTime: string;
  latitude: number;
  longitude: number;
  time: number;
};

export type RefreshButtonProps = {
  setLastUpdate: GeneralContextProps['setLastUpdate'];
};

export type TemperaturesBlockProps = {
  loadingTemperature: boolean;
  weather: WeatherProps;
};

export type UnitsPickerProps = {
  setWeather: GeneralContextProps['setWeather'];
  weather: GeneralContextProps['weather'];
};

export type WeatherProps = {
  backGroundImageFile: ImageSourcePropType;
  currentTemperature: number;
  currentTemperatureFeel: number;
  humidity: number;
  maxTemperature: number;
  minTemperature: number;
  units: string;
  weather: string;
  weatherIcon: string;
  windSpeed: number;
};
