import 'react-native';
import * as React from 'react';
import {render} from '@testing-library/react-native';

import App from '../App';

jest.mock('../src/contexts/GeneralContext', () => ({
  GeneralProvider: () => 'GeneralProvider',
}));

jest.mock('../src/screens/home', () => 'Home');

describe('App is loaded', () => {
  it('renders correctly', () => {
    expect(render(<App />).toJSON()).toMatch('GeneralProvider');
  });
});
