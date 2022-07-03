# weatherHere

A React Native app to show the weather at current location.

Use the selector to choose the temperature and wind speed unity, also the `Refresh info` to fetch new data.

On the right side of the temperature you can see an icon indicating the weather condition (provided by OpenWeather), also the background is updated depending the hour and weather condition😜.

Let some `console.log` so you track what is happening😱. But you can easily enable/disable it changing the variable `showLogInfo` to `true` or `false` on `src/screens/home/index.tsx:25` 😊

# What was used?

React Native, react-native-get-location (sorry, but you will need to permit location 😊), date-fns, lodash, Google Maps API and OpenWeather API

# Some Screenshots

- Clear day

- Clear night

- Cloudy day

- Cloudy night

- Rainy day

- Rainy night

- Snow day

- Snow night

# Steps

- Create your OpenWeather API key

  - Go to https://openweathermap.org/api/one-call-api to get an API key (used to get the weather information).

- Create your Google API key

  - Go to https://developers.google.com/maps/documentation/geocoding/overview to get a GEOCODING API key (used to get the address information using the coordinates).

- Clone the repository: `git clone https://github.com/alexandrepaulinoss/weatherHere.git`

- Enter the directory: `cd weatherHere`

- Install package dependencies: `yarn`

- Create your `.env` file in the root folder to store your keys (tip: you can use the file `.env.sample` as base)

```
GOOGLE_KEY=YourGoogleKeyHere
OPEN_WEATHER_KEY=YourOpenWeatherKeyHere
```

`You don't need to use '' or "" to store your strings`

# Run it!

    react-native start
    react-native run-android
