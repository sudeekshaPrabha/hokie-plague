import React, { useEffect, useRef } from 'react';

import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  Vibration,
  useWindowDimensions,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';


// ======================================================
// CRACK LINE
// ======================================================

function CrackLine({
  x,
  y,
  length,
  angle,
  thickness,
  progress,
}) {
  return (
    <Animated.View
      style={[
        styles.crackLine,
        {
          left: x,
          top: y,
          width: length,
          height: thickness,
          opacity: progress,

          transform: [
            { rotate: `${angle}deg` },
            { scaleX: progress },
          ],
        },
      ]}
    />
  );
}


// ======================================================
// INTRO SCREEN
// ======================================================

export default function IntroScreen({ onEnter }) {
  const { width, height } = useWindowDimensions();

  const line1 = useRef(new Animated.Value(0)).current;
  const line2 = useRef(new Animated.Value(0)).current;
  const line3 = useRef(new Animated.Value(0)).current;
  const line4 = useRef(new Animated.Value(0)).current;
  const line5 = useRef(new Animated.Value(0)).current;
  const line6 = useRef(new Animated.Value(0)).current;
  const line7 = useRef(new Animated.Value(0)).current;
  const line8 = useRef(new Animated.Value(0)).current;
  const line9 = useRef(new Animated.Value(0)).current;
  const line10 = useRef(new Animated.Value(0)).current;
  const line11 = useRef(new Animated.Value(0)).current;
  const line12 = useRef(new Animated.Value(0)).current;

  const shakeX = useRef(new Animated.Value(0)).current;


  // ======================================================
  // CRACK ANIMATION
  // ======================================================

  useEffect(() => {
    const timer = setTimeout(() => {

      Vibration.vibrate(60);

      // Only the cracks shake
      Animated.sequence([
        Animated.timing(shakeX, {
          toValue: 7,
          duration: 35,
          useNativeDriver: true,
        }),

        Animated.timing(shakeX, {
          toValue: -7,
          duration: 35,
          useNativeDriver: true,
        }),

        Animated.timing(shakeX, {
          toValue: 4,
          duration: 35,
          useNativeDriver: true,
        }),

        Animated.timing(shakeX, {
          toValue: 0,
          duration: 45,
          useNativeDriver: true,
        }),
      ]).start();


      Animated.stagger(70, [

        Animated.timing(line1, {
          toValue: 1,
          duration: 180,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(line2, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),

        Animated.timing(line3, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),

        Animated.timing(line4, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),

        Animated.timing(line5, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),

        Animated.timing(line6, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),

        Animated.timing(line7, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),

        Animated.timing(line8, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),

        Animated.timing(line9, {
          toValue: 1,
          duration: 130,
          useNativeDriver: true,
        }),

        Animated.timing(line10, {
          toValue: 1,
          duration: 130,
          useNativeDriver: true,
        }),

        Animated.timing(line11, {
          toValue: 1,
          duration: 130,
          useNativeDriver: true,
        }),

        Animated.timing(line12, {
          toValue: 1,
          duration: 130,
          useNativeDriver: true,
        }),

      ]).start();

    }, 1000);


    return () => clearTimeout(timer);

  }, []);


  // ======================================================
  // SCREEN
  // ======================================================

  return (
    <View style={styles.screen}>

      <StatusBar style="light" />


      {/* ==============================================
          CRACK BACKGROUND
      ============================================== */}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.crackLayer,
          {
            transform: [
              { translateX: shakeX },
            ],
          },
        ]}
      >

        <CrackLine
          x={width * 0.12}
          y={height * 0.27}
          length={width * 0.48}
          angle={55}
          thickness={4}
          progress={line1}
        />

        <CrackLine
          x={width * 0.03}
          y={height * 0.12}
          length={width * 0.42}
          angle={62}
          thickness={3}
          progress={line2}
        />

        <CrackLine
          x={width * 0.48}
          y={height * 0.31}
          length={width * 0.53}
          angle={-48}
          thickness={4}
          progress={line3}
        />

        <CrackLine
          x={width * 0.69}
          y={height * 0.15}
          length={width * 0.39}
          angle={-58}
          thickness={3}
          progress={line4}
        />

        <CrackLine
          x={width * 0.06}
          y={height * 0.66}
          length={width * 0.52}
          angle={-52}
          thickness={4}
          progress={line5}
        />

        <CrackLine
          x={width * 0.48}
          y={height * 0.61}
          length={width * 0.54}
          angle={48}
          thickness={4}
          progress={line6}
        />

        <CrackLine
          x={0}
          y={height * 0.38}
          length={width * 0.35}
          angle={12}
          thickness={2}
          progress={line7}
        />

        <CrackLine
          x={width * 0.70}
          y={height * 0.39}
          length={width * 0.34}
          angle={-10}
          thickness={2}
          progress={line8}
        />

        <CrackLine
          x={width * 0.20}
          y={height * 0.20}
          length={width * 0.25}
          angle={-18}
          thickness={2}
          progress={line9}
        />

        <CrackLine
          x={width * 0.63}
          y={height * 0.22}
          length={width * 0.28}
          angle={20}
          thickness={2}
          progress={line10}
        />

        <CrackLine
          x={width * 0.13}
          y={height * 0.72}
          length={width * 0.30}
          angle={20}
          thickness={2}
          progress={line11}
        />

        <CrackLine
          x={width * 0.67}
          y={height * 0.70}
          length={width * 0.30}
          angle={-20}
          thickness={2}
          progress={line12}
        />

      </Animated.View>


      {/* ==============================================
          CENTER CONTENT
          
          Normal FLEX layout now.
          This is what centers it correctly.
      ============================================== */}

      <View style={styles.content}>

        <View style={styles.textGroup}>

          <Text style={styles.developerText}>
            VIRUS
          </Text>


          <Text style={styles.gameName}>
            HokiePlague
          </Text>


          <Text style={styles.tagline}>
            The plague is spreading...
          </Text>


          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={onEnter}
          >

            <Text style={styles.buttonText}>
              ENTER
            </Text>

          </Pressable>

        </View>

      </View>

    </View>
  );
}


// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

  screen: {
    flex: 1,

    backgroundColor: '#151617',

    overflow: 'hidden',
  },


  // ====================================================
  // CRACKS
  // ====================================================

  crackLayer: {
    ...StyleSheet.absoluteFillObject,

    zIndex: 1,
  },


  crackLine: {
    position: 'absolute',

    backgroundColor: '#39FF14',

    borderRadius: 20,

    shadowColor: '#39FF14',

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 1,

    shadowRadius: 7,
  },


  // ====================================================
  // TRUE CENTER
  // ====================================================

  content: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    zIndex: 10,
  },


  textGroup: {
    width: '100%',

    alignItems: 'center',

    justifyContent: 'center',

    paddingHorizontal: 30,
  },


  // ====================================================
  // TEXT
  // ====================================================

  developerText: {
    textAlign: 'center',

    fontSize: 54,

    fontWeight: '900',

    letterSpacing: 4,

    color: '#65FF45',

    textShadowColor: '#39FF14',

    textShadowOffset: {
      width: 0,
      height: 0,
    },

    textShadowRadius: 22,
  },


  gameName: {
    marginTop: 14,

    textAlign: 'center',

    fontSize: 24,

    fontWeight: '700',

    letterSpacing: 2,

    color: '#FFFFFF',
  },


  tagline: {
    marginTop: 10,

    textAlign: 'center',

    fontSize: 15,

    fontStyle: 'italic',

    color: '#D0D0D0',
  },


  // ====================================================
  // ENTER
  // ====================================================

  button: {
    marginTop: 38,

    paddingVertical: 14,

    paddingHorizontal: 42,

    borderWidth: 2,

    borderColor: '#39FF14',

    borderRadius: 10,

    backgroundColor: '#172219',

    alignSelf: 'center',
  },


  buttonPressed: {
    transform: [
      { scale: 0.95 },
    ],

    backgroundColor: '#213A24',
  },


  buttonText: {
    textAlign: 'center',

    color: '#65FF45',

    fontSize: 17,

    fontWeight: '800',

    letterSpacing: 3,
  },

});