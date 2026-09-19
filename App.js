import React, { useRef, useState } from 'react';

import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';

import IntroScreen from './screens/IntroScreen';
import LoginScreen from './screens/LoginScreen';


export default function App() {

  const [currentScreen, setCurrentScreen] = useState('intro');

  const loginOpacity = useRef(
    new Animated.Value(0)
  ).current;


  // Called AFTER IntroScreen finishes fading to black
  const goToLogin = () => {

    setCurrentScreen('login');

    loginOpacity.setValue(0);

    // Small delay so LoginScreen mounts first
    setTimeout(() => {

      Animated.timing(loginOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();

    }, 50);
  };


  // ==========================================
  // INTRO
  // ==========================================

  if (currentScreen === 'intro') {

    return (
      <IntroScreen
        onFinish={goToLogin}
      />
    );
  }


  // ==========================================
  // LOGIN
  // ==========================================

  if (currentScreen === 'login') {

    return (

      <View style={styles.blackBackground}>

        <Animated.View
          style={[
            styles.fullScreen,
            {
              opacity: loginOpacity,
            },
          ]}
        >

          <LoginScreen />

        </Animated.View>

      </View>
    );
  }


  return null;
}


const styles = StyleSheet.create({

  blackBackground: {
    flex: 1,
    backgroundColor: '#000000',
  },

  fullScreen: {
    flex: 1,
  },

});