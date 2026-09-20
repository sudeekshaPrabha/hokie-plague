import React, { useEffect, useState } from "react";
import {
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

  // TEMPORARY countdown
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

  return (
    <SafeAreaView style={styles.screen}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Hokie Plague</Text>
      </View>

      {/* SIDE NAV */}
      <SideNav
        onNavigate={onNavigate}
        onLeave={onLeave}
      />

      {/* MAIN CONTENT */}
      <View style={styles.content}>

        <Text style={styles.readyText}>
          GET READY
        </Text>

        <Text style={styles.subText}>
          TO PLAGUE
        </Text>

        <Text style={styles.orText}>
          OR
        </Text>

        <Text style={styles.subText}>
          BE PLAGUED
        </Text>

        {/* PLAYER AREA */}
        <View style={styles.playerArea}>

          <Text style={styles.playerLabel}>
            PLAYERS
          </Text>

          <Text style={styles.playerCount}>
            {playerCount} / {maxPlayers}
          </Text>

          {/* PLAYER PROGRESS BAR */}
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                    width: `${Math.min(100, (playerCount / maxPlayers) * 100)}%`,
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
        <Text style={styles.startsText}>
          GAME STARTS IN
        </Text>

        <Text style={styles.timer}>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </Text>

        {/* TEMPORARY FORCE START */}
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

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#303030",
  },

  header: {
    height: 85,
    backgroundColor: "#861F41",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#65152F",
    zIndex: 10,
  },

  logo: {
    color: "#E87722",
    fontSize: 34,
    fontWeight: "900",
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 75,
    paddingHorizontal: 30,
  },

  readyText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 3,
  },

  subText: {
    color: "#39FF14",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 8,
  },

  orText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 5,
  },

  playerArea: {
    width: "88%",
    marginTop: 55,
    alignItems: "center",
  },

  playerLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 2,
  },

  playerCount: {
    color: "#E87722",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 8,
  },

  progressBar: {
    width: "100%",
    height: 18,
    backgroundColor: "#181818",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#39FF14",
  },

  youText: {
    color: "#AAAAAA",
    fontSize: 15,
    marginTop: 10,
  },

  startsText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 50,
  },

  timer: {
    color: "#39FF14",
    fontSize: 42,
    fontWeight: "900",
    marginTop: 4,
  },

  forceButton: {
    marginTop: 35,
    backgroundColor: "#861F41",
    borderWidth: 2,
    borderColor: "#E87722",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },

  forcePressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.8,
  },

  forceText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  devText: {
    color: "#777777",
    fontSize: 12,
    marginTop: 7,
  },
});