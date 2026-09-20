import React, { useEffect, useState } from "react";

import {
  ImageBackground,
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import SideNav from "../components/SideNav";

export default function QueueScreen({
  playerName,
  players = [],
  onNavigate,
  onLeave,
  onForceStart,
  
}) {
  // TEMPORARY player count until multiplayer is connected
  const playerCount = Math.max(1, players.length);
  const maxPlayers = 8;

  const [secondsLeft, setSecondsLeft] = useState(83);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 0) {
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const progressPercent =
    Math.min(100, (playerCount/maxPlayers)*100);

  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground
        source={require("../assets/queue-background-latest.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <SideNav
          onNavigate={onNavigate}
          onLeave={onLeave}
        />

        {/* PLAYERS */}
        <View style={styles.playerArea}>
          <Text style={styles.playerLabel}>
            PLAYERS
          </Text>

          <Text style={styles.playerCount}>
            {playerCount}/{maxPlayers}
          </Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressPercent}%`,
                },
              ]}
            />
          </View>

        <Text style={styles.youText}>
            {players.length
              ? players.map((p) => p.name).join(", ")
              : `${playerName} joined`}
          </Text>
        </View>

        {/* COUNTDOWN */}
        <View style={styles.countdownArea}>
          <Text style={styles.startsText}>
            GAME STARTS IN
          </Text>

          <Text style={styles.timer}>
            {minutes}:{seconds.toString().padStart(2, "0")}
          </Text>
        </View>

        {/* FORCE START */}
        <Pressable
          style={({ pressed }) => [
            styles.forceButton,
            pressed && styles.forcePressed,
          ]}
          onPress={onForceStart}
        >
          <Text style={styles.forceText}>
            FORCE START
          </Text>
        </Pressable>

        <Text style={styles.devText}>
          Testing only
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#111312",
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  playerArea: {
    position: "absolute",
    top: "54%",
    left: "14%",
    right: "14%",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  playerLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.9)",
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 4,
  },

  playerCount: {
    color: "#E87722",
    fontSize: 28,
    fontWeight: "900",
    marginTop: 3,
    textShadowColor: "rgba(0,0,0,0.9)",
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 4,
  },

  progressBar: {
    width: "100%",
    height: 13,
    marginTop: 8,
    backgroundColor: "#111111",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#39FF14",
  },

  youText: {
    color: "#B0B0B0",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 11,
    textShadowColor: "rgba(0,0,0,0.9)",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 3,
  },

  countdownArea: {
    position: "absolute",
    top: "68%",
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  startsText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.95)",
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 4,
  },

  timer: {
    color: "#39FF14",
    fontSize: 42,
    fontWeight: "900",
    marginTop: 3,
    textShadowColor: "rgba(57,255,20,0.6)",
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 10,
  },

  forceButton: {
    position: "absolute",
    top: "79%",
    left: "29%",
    right: "29%",
    backgroundColor: "#861F41",
    borderWidth: 2,
    borderColor: "#E87722",
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
  },

  forcePressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.8,
  },

  forceText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  devText: {
    position: "absolute",
    top: "85%",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#777777",
    fontSize: 10,
  },
});