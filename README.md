# weatherHere

A React Native app to show the weather at current location.

Use the selector to choose the temperature and wind speed unity, also the `Refresh info` to fetch new data.

On the right side of the temperature you can see an icon indicating the weather condition (provided by OpenWeather), also the background is updated depending the hour and weather condition😜.

Let some `console.log` so you track what is happening😱. But you can easily enable/disable it changing the variable `showLogInfo` to `true` or `false` on `App.tsx:8` 😊

# What was used?

React Native, react-native-get-location (sorry, but you will need to permit location 😊), date-fns, lodash, Google Maps API and OpenWeather API

# Some Screenshots

- Clear day

![screenshot_clear_day](https://user-images.githubusercontent.com/20016457/177051612-b242a748-2ca3-45f1-8065-e56d9336af4d.png)

- Clear night

![screenshot_clear_night](https://user-images.githubusercontent.com/20016457/177051633-ea4d9a2f-e342-4056-8871-ede47d698a2a.png)

- Cloudy day

![screenshot_cloudy_day](https://user-images.githubusercontent.com/20016457/177051636-7ba858f7-c672-47ab-a249-64c3682acd8e.png)

- Cloudy night

![screenshot_cloudy_night](https://user-images.githubusercontent.com/20016457/177051640-be848546-b31b-400d-9a6f-0f4b13bce6ec.png)

- Rainy day

![screenshot_rainy_day](https://user-images.githubusercontent.com/20016457/177051642-4c242852-e457-4ce8-a886-06747f5db9f7.png)

- Rainy night

![screenshot_rainy_night](https://user-images.githubusercontent.com/20016457/177051643-3f3d2f11-1d60-4750-92a5-0b7749cde2d0.png)

- Snow day

![screenshot_snow_day](https://user-images.githubusercontent.com/20016457/177051645-9383634b-1d14-4730-a545-40983ea6401b.png)

- Snow night

![screenshot_snow_night](https://user-images.githubusercontent.com/20016457/177051647-bbe0acf4-fc83-4130-83a4-3fe3e213960d.png)

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
