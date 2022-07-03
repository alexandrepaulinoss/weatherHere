import * as React from 'react';
import {StatusBar} from 'react-native';
import Home from './src/screens/home';

const App: () => React.Node = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Home />
    </>
  );
};

export default App;
