import * as React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import styles from './style';

import {CityBlockProps} from '../../types';

const CityBlock = ({address, loadingCity, location}: CityBlockProps) => {
  return (
    <View style={styles.topBlock}>
      {loadingCity ? (
        <>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.addressLoading}>Loading address</Text>
        </>
      ) : (
        <>
          <Text style={styles.cityName}>{address.cityName}</Text>
          <Text style={styles.address}>{address.completeAddress}</Text>
        </>
      )}
      <Text style={styles.dateTime}>{location.formattedCurrentDateTime}</Text>
    </View>
  );
};

export default CityBlock;
