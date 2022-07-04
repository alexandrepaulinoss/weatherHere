import 'react-native';
import * as React from 'react';
import {render, screen} from '@testing-library/react-native';

import CityBlock from '../';

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

describe('CityBlock is loaded', () => {
  it('renders correctly', () => {
    render(
      <CityBlock address={address} loadingCity={false} location={location} />,
    );

    expect(screen.getByText('Paranavaí')).toBeTruthy();
    expect(
      screen.getByText(
        'R. Minas Gerais, 528 - Centro, Paranavaí - PR, 87701-070, Brazil',
      ),
    ).toBeTruthy();
    expect(screen.getByText('01:02AM - Monday, 04 July 2022')).toBeTruthy();
  });
});
