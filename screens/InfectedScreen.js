import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function InfectedScreen({
  playerName,
  onFinish,
}) {
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          clearInterval(countdown);

          if (onFinish) {
            onFinish();
          }

          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [onFinish]);

  return (
    <SafeAreaView style={styles.screen}>
      {/* BACKGROUND GLOW */}
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <View style={styles.content}>
        <Text style={styles.warning}>
          ☣
        </Text>

        <Text style={styles.detected}>
          INFECTION DETECTED
        </Text>

        <Text style={styles.name}>
          {playerName}
        </Text>

        <Text style={styles.infected}>
          YOU'VE CAUGHT
        </Text>

        <Text style={styles.plague}>
          THE HOKIEPLAGUE
        </Text>

        <View style={styles.divider} />

        <Text style={styles.description}>
          You have been infected.
        </Text>

        <Text style={styles.description}>
          Your round is over.
        </Text>

        <Text style={styles.continueText}>
          RESULTS IN {secondsLeft}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#151617",
    overflow: "hidden",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    zIndex: 5,
  },

  warning: {
    fontSize: 95,
    color: "#39FF14",
    marginBottom: 5,
  },

  detected: {
    color: "#FF4747",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 3,
    textAlign: "center",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 28,
  },

  infected: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "900",
    marginTop: 15,
    letterSpacing: 2,
  },

  plague: {
    color: "#39FF14",
    fontSize: 35,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 5,
  },

  divider: {
    width: "65%",
    height: 3,
    backgroundColor: "#861F41",
    marginVertical: 28,
  },

  description: {
    color: "#BBBBBB",
    fontSize: 17,
    marginBottom: 5,
  },

  continueText: {
    color: "#E87722",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 45,
  },

  glowOne: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#234E1D",
    opacity: 0.18,
    top: -80,
    right: -80,
  },

  glowTwo: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "#861F41",
    opacity: 0.13,
    bottom: -130,
    left: -130,
  },
});