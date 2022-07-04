import * as React from 'react';
import {Picker} from '@react-native-picker/picker';

import styles from './style';

import {UnitsPickerProps} from '../../types';

const UnitsPicker = ({setWeather, weather}: UnitsPickerProps) => {
  return (
    <Picker
      selectedValue={weather.units}
      onValueChange={itemValue => setWeather({...weather, units: itemValue})}
      mode="dropdown"
      testID="metric-picker"
      style={styles.picker}>
      <Picker.Item label="Celsius" value="metric" />
      <Picker.Item label="Kelvin" value="standard" />
      <Picker.Item label="Fahrenheit" value="imperial" />
    </Picker>
  );
};

export default UnitsPicker;
