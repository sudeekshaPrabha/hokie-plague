import React, { useState } from 'react';

import IntroScreen from './screens/IntroScreen';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('intro');

  if (currentScreen === 'intro') {
    return (
      <IntroScreen
        onEnter={() => setCurrentScreen('login')}
      />
    );
  }

  if (currentScreen === 'login') {
    return <LoginScreen />;
  }

  return null;
}