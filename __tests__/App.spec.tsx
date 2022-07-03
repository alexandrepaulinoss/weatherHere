import 'react-native';
import * as React from 'react';
import App from '../App';

import {render, screen} from '@testing-library/react-native';

jest.mock('../src/screens/home', () => 'Home');

describe('App is loaded', () => {
  it('renders correctly', () => {
    const tree = render(<App />).toJSON();
    expect(tree).toMatchObject({type: 'Home', props: {}, children: null});
  });
});
