import 'react-native';
import * as React from 'react';
import {render, screen} from '@testing-library/react-native';

import RefreshButton from '../';

const setLastUpdate = jest.fn();

describe('RefreshButton is loaded', () => {
  it('renders correctly', () => {
    render(<RefreshButton setLastUpdate={setLastUpdate} />);
    expect(screen.getByText('Refresh info')).toBeTruthy();
  });
});
