import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.8)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  const crack1 = useRef(new Animated.Value(0)).current;
  const crack2 = useRef(new Animated.Value(0)).current;
  const crack3 = useRef(new Animated.Value(0)).current;
  const crack4 = useRef(new Animated.Value(0)).current;
  const crack5 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(crack1, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(crack2, {
          toValue: 1,
          duration: 700,
          delay: 150,
          useNativeDriver: true,
        }),
        Animated.timing(crack3, {
          toValue: 1,
          duration: 700,
          delay: 300,
          useNativeDriver: true,
        }),
        Animated.timing(crack4, {
          toValue: 1,
          duration: 700,
          delay: 450,
          useNativeDriver: true,
        }),
        Animated.timing(crack5, {
          toValue: 1,
          duration: 700,
          delay: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(titleScale, {
          toValue: 1,
          friction: 5,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowOpacity, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(glowOpacity, {
              toValue: 0.4,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Crack / virus spread lines */}
      <Animated.View style={[styles.crack, styles.crack1, { opacity: crack1 }]} />
      <Animated.View style={[styles.crack, styles.crack2, { opacity: crack2 }]} />
      <Animated.View style={[styles.crack, styles.crack3, { opacity: crack3 }]} />
      <Animated.View style={[styles.crack, styles.crack4, { opacity: crack4 }]} />
      <Animated.View style={[styles.crack, styles.crack5, { opacity: crack5 }]} />

      {/* Main title */}
      <View style={styles.centerContent}>
        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [{ scale: titleScale }],
          }}
        >
          <Animated.Text
            style={[
              styles.title,
              {
                opacity: glowOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                }),
              },
            ]}
          >
            VIRUS
          </Animated.Text>
        </Animated.View>

        <Animated.Text style={[styles.subtitle, { opacity: titleOpacity }]}>
          HokiePlague
        </Animated.Text>

        <Animated.Text style={[styles.tagline, { opacity: titleOpacity }]}>
          The infection is spreading...
        </Animated.Text>

        <Animated.View style={{ opacity: titleOpacity }}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>ENTER</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1d',
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 52,
    fontWeight: '800',
    letterSpacing: 8,
    color: '#7CFF5B',
    textShadowColor: '#39FF14',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },

  subtitle: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: '600',
    color: '#d9d9d9',
    letterSpacing: 2,
  },

  tagline: {
    marginTop: 10,
    fontSize: 14,
    color: '#8d8d8d',
    fontStyle: 'italic',
  },

  button: {
    marginTop: 32,
    borderWidth: 1.5,
    borderColor: '#39FF14',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(57,255,20,0.08)',
  },

  buttonText: {
    color: '#7CFF5B',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },

  crack: {
    position: 'absolute',
    backgroundColor: '#39FF14',
    shadowColor: '#39FF14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 12,
  },

  crack1: {
    width: 220,
    height: 3,
    top: '18%',
    left: '8%',
    transform: [{ rotate: '28deg' }],
  },

  crack2: {
    width: 180,
    height: 2,
    top: '30%',
    right: '5%',
    transform: [{ rotate: '-35deg' }],
  },

  crack3: {
    width: 260,
    height: 3,
    top: '48%',
    left: '-5%',
    transform: [{ rotate: '12deg' }],
  },

  crack4: {
    width: 190,
    height: 2,
    bottom: '26%',
    right: '10%',
    transform: [{ rotate: '40deg' }],
  },

  crack5: {
    width: 230,
    height: 3,
    bottom: '14%',
    left: '12%',
    transform: [{ rotate: '-18deg' }],
  },
});