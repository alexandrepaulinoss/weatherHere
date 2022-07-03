import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  address: {
    color: '#ffffffc8',
    fontSize: 12,
  },
  cityName: {
    color: '#fffffff6',
    fontSize: 30,
    fontWeight: 'bold',
  },
  dateTime: {
    color: '#fff',
    fontSize: 16,
    marginTop: 30,
  },
  picker: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 300,
  },
  refreshButtonContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 50,
  },
  refreshButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(230,230,230,0.7)',
    borderRadius: 10,
    marginTop: 16,
    padding: 10,
    width: 300,
  },
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
  topBlock: {
    marginTop: 30,
    padding: 10,
  },
  unitBlock: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 30,
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
