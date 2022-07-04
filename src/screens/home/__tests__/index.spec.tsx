import 'react-native';
import * as React from 'react';
import {render, screen} from '@testing-library/react-native';

import Home from '../';

jest.mock('react-native-get-location', () => 'GetLocation');

jest.mock('../../../hooks/useGeneralContext', () => ({
  useGeneralContext: jest.fn().mockImplementation(() => ({
    address,
    loadingCity: false,
    loadingTemperature: false,
    location,
    setLastUpdate: jest.fn(),
    setWeather: jest.fn(),
    weather,
  })),
}));

const address = {
  cityName: 'Paranavaí',
  completeAddress:
    'R. Minas Gerais, 528 - Centro, Paranavaí - PR, 87701-070, Brazil',
  countryCode: 'BR',
  stateName: 'PR',
};

const location = {
  formattedCurrentDateTime: '01:02AM - Monday, 04 July 2022',
  latitude: -23.0818933,
  longitude: -52.46244,
  time: 1656902888000,
};

const weather = {
  backGroundImageFile: null,
  currentTemperature: 19,
  currentTemperatureFeel: 17,
  humidity: 61,
  maxTemperature: 20,
  minTemperature: 15,
  units: 'metric',
  weather: 'clear',
  weatherIcon: '01.png',
  windSpeed: 3.75,
};

describe('Home is loaded', () => {
  it('renders correctly', () => {
    render(<Home showLogInfo={false} />);

    //Address block
    expect(screen.getByText('Paranavaí')).toBeTruthy();
    expect(
      screen.getByText(
        'R. Minas Gerais, 528 - Centro, Paranavaí - PR, 87701-070, Brazil',
      ),
    ).toBeTruthy();
    expect(screen.getByText('01:02AM - Monday, 04 July 2022')).toBeTruthy();

    //Temperatures block
    expect(screen.getByText('19ºC')).toBeTruthy();
    expect(screen.getByText('Real feel 17ºC')).toBeTruthy();
    expect(screen.getByText('Min 15ºC')).toBeTruthy();
    expect(screen.getByText('Max 20ºC')).toBeTruthy();
    expect(screen.getByText('Wind speed 3.75 meter/sec')).toBeTruthy();
    expect(screen.getByText('Humidity 61')).toBeTruthy();

    //Refresh button
    expect(screen.getByText('Refresh info')).toBeTruthy();

    //Units picker
    expect(screen.getByTestId('metric-picker')).toBeTruthy();
  });
});
