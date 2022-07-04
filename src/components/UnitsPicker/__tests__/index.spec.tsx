import 'react-native';
import * as React from 'react';
import {render, screen} from '@testing-library/react-native';

import UnitsPicker from '../';

const setWeather = jest.fn();

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

describe('UnitsPicker is loaded', () => {
  it('renders correctly', () => {
    render(<UnitsPicker setWeather={setWeather} weather={weather} />);
    expect(screen.getByTestId('metric-picker')).toBeTruthy();
  });
});
