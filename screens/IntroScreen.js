import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IntroScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HokiePlague Intro Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151517',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#7CFF5B',
    fontSize: 28,
    fontWeight: '800',
  },
});