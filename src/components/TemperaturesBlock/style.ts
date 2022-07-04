import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  temperature: {
    color: '#fff',
    fontSize: 64,
    resizeMode: 'contain',
  },
  temperatureAditional: {
    color: '#ffffffc8',
    fontSize: 14,
    marginTop: 2,
  },
  temperatureBlock: {
    padding: 10,
    marginTop: 10,
  },
  temperatureLine: {
    flexDirection: 'row',
  },
  temperaturesColumn: {
    width: '45%',
  },
  weatherAditional: {
    color: '#ffffffc8',
    fontSize: 12,
    marginTop: 2,
  },
  weatherIcon: {
    height: '100%',
    marginLeft: 10,
    width: '30%',
  },
});

export default styles;
