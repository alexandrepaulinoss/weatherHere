import * as React from 'react';
import {StatusBar} from 'react-native';

import {GeneralProvider} from './src/contexts/GeneralContext';
import Home from './src/screens/home';

const App: () => React.Node = () => {
  const showLogInfo = true;

  return (
    <GeneralProvider showLogInfo={showLogInfo}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Home showLogInfo={showLogInfo} />
    </GeneralProvider>
  );
};

export default App;
