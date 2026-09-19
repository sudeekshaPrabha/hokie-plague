import React, { useEffect, useRef } from 'react';

import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Vibration,
  useWindowDimensions,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';


// ======================================================
// ONE CRACK LINE
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
            {
              rotate: `${angle}deg`,
            },
            {
              scaleX: progress,
            },
          ],
        },
      ]}
    />
  );
}


// ======================================================
// INTRO SCREEN
// ======================================================

export default function IntroScreen({ onFinish }) {
  const { width, height } = useWindowDimensions();


  // ======================================================
  // CRACK ANIMATION VALUES
  // ======================================================

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


  // Entire crack layer
  const crackOpacity = useRef(
    new Animated.Value(1)
  ).current;


  // Small crack impact shake
  const shakeX = useRef(
    new Animated.Value(0)
  ).current;


  // ======================================================
  // TEXT EXIT ANIMATION VALUES
  // ======================================================

  const virusOpacity = useRef(
    new Animated.Value(1)
  ).current;

  const virusScale = useRef(
    new Animated.Value(1)
  ).current;

  const otherTextOpacity = useRef(
    new Animated.Value(1)
  ).current;


  // ======================================================
  // INTRO SEQUENCE
  // ======================================================

  useEffect(() => {

    // --------------------------------------------------
    // STEP 1:
    // CRACKS BEGIN AFTER TEXT IS ALREADY VISIBLE
    // --------------------------------------------------

    const crackTimer = setTimeout(() => {

      Vibration.vibrate(60);


      // Impact shake
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


      // Crack lines spread
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


    // --------------------------------------------------
    // STEP 2:
    // ENDING TRANSITION
    //
    // cracks disappear
    // then VIRUS enlarges + fades
    // --------------------------------------------------

    const finishTimer = setTimeout(() => {

      // First fade away all cracks
      Animated.timing(crackOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {


        // Then hide other text and zoom VIRUS toward player
        Animated.parallel([

          Animated.timing(otherTextOpacity, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
          }),


          Animated.timing(virusScale, {
            toValue: 2.1,
            duration: 550,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),


          Animated.timing(virusOpacity, {
            toValue: 0,
            duration: 550,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),

        ]).start(() => {

          // Intro is finished
          if (onFinish) {
            onFinish();
          }

        });

      });

    }, 3200);


    // --------------------------------------------------
    // CLEANUP
    // --------------------------------------------------

    return () => {
      clearTimeout(crackTimer);
      clearTimeout(finishTimer);
    };

  }, []);


  // ======================================================
  // SCREEN
  // ======================================================

  return (
    <Animated.View style={styles.screen}>

      <StatusBar style="light" />


      {/* =================================================
          CRACK LAYER
      ================================================= */}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.crackLayer,
          {
            opacity: crackOpacity,

            transform: [
              {
                translateX: shakeX,
              },
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


      {/* =================================================
          CENTERED TEXT
      ================================================= */}

      <Animated.View style={styles.centerArea}>


        {/* VIRUS */}
        <Animated.Text
          style={[
            styles.developerText,
            {
              opacity: virusOpacity,

              transform: [
                {
                  scale: virusScale,
                },
              ],
            },
          ]}
        >
          VIRUS
        </Animated.Text>


        {/* HOKIEPLAGUE + TAGLINE */}
        <Animated.View
          style={[
            styles.otherText,
            {
              opacity: otherTextOpacity,
            },
          ]}
        >

          <Text style={styles.gameName}>
            HokiePlague
          </Text>

          <Text style={styles.tagline}>
            The plague is spreading...
          </Text>

        </Animated.View>


      </Animated.View>

    </Animated.View>
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
  // CENTERED CONTENT
  // ====================================================

  centerArea: {
    position: 'absolute',

    left: 0,
    right: 0,

    top: '50%',

    height: 150,

    marginTop: -75,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 24,

    zIndex: 20,
  },


  developerText: {
    width: '100%',

    textAlign: 'center',

    fontSize: 54,

    fontWeight: '900',

    letterSpacing: 7,

    color: '#65FF45',

    textShadowColor: '#39FF14',

    textShadowOffset: {
      width: 0,
      height: 0,
    },

    textShadowRadius: 22,
  },


  otherText: {
    width: '100%',

    alignItems: 'center',
  },


  gameName: {
    width: '100%',

    marginTop: 12,

    textAlign: 'center',

    fontSize: 24,

    fontWeight: '700',

    letterSpacing: 2,

    color: '#FFFFFF',
  },


  tagline: {
    width: '100%',

    marginTop: 8,

    textAlign: 'center',

    fontSize: 15,

    fontStyle: 'italic',

    color: '#D0D0D0',
  },

});