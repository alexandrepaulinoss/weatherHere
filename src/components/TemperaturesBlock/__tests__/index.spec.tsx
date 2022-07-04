import 'react-native';
import * as React from 'react';
import {render, screen} from '@testing-library/react-native';

import TemperaturesBlock from '../';

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

describe('TemperaturesBlock is loaded', () => {
  it('renders correctly', () => {
    render(<TemperaturesBlock loadingTemperature={false} weather={weather} />);

    expect(screen.getByText('19ºC')).toBeTruthy();
    expect(screen.getByText('Real feel 17ºC')).toBeTruthy();
    expect(screen.getByText('Min 15ºC')).toBeTruthy();
    expect(screen.getByText('Max 20ºC')).toBeTruthy();
    expect(screen.getByText('Wind speed 3.75 meter/sec')).toBeTruthy();
    expect(screen.getByText('Humidity 61')).toBeTruthy();
  });
});
