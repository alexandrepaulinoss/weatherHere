import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './style';

import {RefreshButtonProps} from '../../types';

const RefreshButton = ({setLastUpdate}: RefreshButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.refreshButton}
      onPress={() => {
        setLastUpdate(new Date());
      }}>
      <Text>Refresh info</Text>
    </TouchableOpacity>
  );
};

export default RefreshButton;
