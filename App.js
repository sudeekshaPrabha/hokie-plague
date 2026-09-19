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
import Svg, { Path } from 'react-native-svg';

export default function App() {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.8)).current;
  const glowOpacity = useRef(new Animated.Value(0.4)).current;
  const crackOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Crack appears first
      Animated.timing(crackOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),

      // Then title appears
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),

        Animated.spring(titleScale, {
          toValue: 1,
          friction: 5,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Continuous glow animation
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
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Branching plague crack */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.crackContainer,
          {
            opacity: crackOpacity,
          },
        ]}
      >
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 400 700"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Main thick branching crack */}
          <Path
            d="
              M200 350

              L180 315
              L160 285
              L145 250
              L120 220
              L95 180
              L65 145

              M160 285
              L125 280
              L100 260
              L70 270
              L35 250

              M145 250
              L135 210
              L115 185

              M200 350
              L165 345
              L135 365
              L110 400
              L75 390
              L45 420
              L10 405

              M110 400
              L100 440
              L75 465

              M200 350
              L215 310
              L240 275
              L275 280
              L300 245
              L340 240
              L375 195

              M240 275
              L230 235
              L205 210
              L195 175

              M300 245
              L320 210
              L345 185
              L370 150

              M200 350
              L240 375
              L275 365
              L310 390
              L345 370
              L385 390

              M310 390
              L340 420
              L375 430

              M200 350
              L215 405
              L245 430
              L285 440
              L305 480
              L340 495
              L365 540
              L345 585

              M245 430
              L225 465
              L200 490
              L205 530
              L180 565

              M285 440
              L325 455
              L350 440

              M200 350
              L170 390
              L145 420
              L150 460
              L125 500
              L130 545
            "
            stroke="#39FF14"
            strokeWidth="9"
            fill="none"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Smaller branches */}
          <Path
            d="
              M120 220
              L90 225
              L65 215

              M95 180
              L75 155
              L55 130

              M125 280
              L105 305
              L80 315

              M135 365
              L100 350
              L75 330

              M75 390
              L50 375
              L25 380

              M240 275
              L265 250
              L275 225

              M275 280
              L315 295
              L350 290

              M320 210
              L345 205
              L380 210

              M275 365
              L295 335
              L335 330

              M340 420
              L350 455
              L375 470

              M215 405
              L185 430
              L165 460

              M225 465
              L195 450
              L175 430

              M305 480
              L325 515
              L320 550

              M340 495
              L375 500
              L390 525

              M150 460
              L120 475
              L100 470

              M125 500
              L95 525
              L85 555
            "
            stroke="#7CFF5B"
            strokeWidth="4"
            fill="none"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Thin outer fracture branches */}
          <Path
            d="
              M65 145
              L45 110
              L25 85

              M115 185
              L100 150
              L105 120

              M35 250
              L20 225
              L5 220

              M75 465
              L55 500
              L60 535

              M375 195
              L390 165
              L395 135

              M370 150
              L380 120
              L395 95

              M385 390
              L395 375

              M365 540
              L385 570
              L395 600

              M180 565
              L160 600
              L150 630

              M130 545
              L115 580
              L120 615
            "
            stroke="#B6FF9E"
            strokeWidth="2"
            fill="none"
            strokeLinecap="square"
          />
        </Svg>
      </Animated.View>

      {/* Main content */}
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
                opacity: glowOpacity,
              },
            ]}
          >
            VIRUS
          </Animated.Text>
        </Animated.View>

        <Animated.Text
          style={[
            styles.subtitle,
            {
              opacity: titleOpacity,
            },
          ]}
        >
          HokiePlague
        </Animated.Text>

        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: titleOpacity,
            },
          ]}
        >
          The plague is spreading...
        </Animated.Text>

        <Animated.View
          style={{
            opacity: titleOpacity,
          }}
        >
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
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
    backgroundColor: '#151517',
  },

  crackContainer: {
    ...StyleSheet.absoluteFillObject,
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 54,
    fontWeight: '900',
    letterSpacing: 9,
    color: '#7CFF5B',

    textShadowColor: '#39FF14',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 20,
  },

  subtitle: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: '700',
    color: '#E5E5E5',
    letterSpacing: 2,
  },

  tagline: {
    marginTop: 10,
    fontSize: 14,
    color: '#A0A0A0',
    fontStyle: 'italic',
  },

  button: {
    marginTop: 32,
    borderWidth: 1.5,
    borderColor: '#39FF14',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(57, 255, 20, 0.08)',
  },

  buttonPressed: {
    backgroundColor: 'rgba(57, 255, 20, 0.20)',
    transform: [{ scale: 0.97 }],
  },

  buttonText: {
    color: '#7CFF5B',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
});