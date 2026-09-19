import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import SideNav from "../components/SideNav";

export default function QueueScreen({
  playerName,
  onNavigate,
  onLeave,
}) {
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

      {/* GREEN PLAGUE DECORATIONS */}
      <Text style={[styles.plague, styles.plague1]}>〰</Text>
      <Text style={[styles.plague, styles.plague2]}>〰</Text>
      <Text style={[styles.plague, styles.plague3]}>〰</Text>

      {/* MAIN CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>
          WAITING FOR PLAYERS
        </Text>

        {/* PLAYER LIST */}
        <View style={styles.playerBox}>
          <Text style={styles.playerTitle}>
            PLAYERS
          </Text>

          <View style={styles.playerRow}>
            <View style={styles.greenDot} />

            <Text style={styles.playerName}>
              {playerName}
            </Text>
          </View>

          <Text style={styles.waitingText}>
            Waiting for more players...
          </Text>
        </View>

        {/* LOADING */}
        <ActivityIndicator
          size="large"
          color="#39FF14"
          style={styles.loader}
        />

        <Text style={styles.bottomText}>
          THE OUTBREAK WILL BEGIN SOON
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
    paddingHorizontal: 30,
    paddingTop: 80,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 30,
  },

  playerBox: {
    width: "85%",
    backgroundColor: "#202020",

    borderWidth: 2,
    borderColor: "#39FF14",
    borderRadius: 15,

    padding: 20,
  },

  playerTitle: {
    color: "#E87722",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 18,
  },

  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  greenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#39FF14",
    marginRight: 10,
  },

  playerName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  waitingText: {
    color: "#888888",
    fontSize: 15,
    fontStyle: "italic",
  },

  loader: {
    marginTop: 35,
  },

  bottomText: {
    color: "#39FF14",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginTop: 18,
  },

  plague: {
    position: "absolute",
    color: "#39FF14",
    fontSize: 80,
    zIndex: 0,
  },

  plague1: {
    top: 120,
    left: -5,
    transform: [{ rotate: "60deg" }],
  },

  plague2: {
    top: 190,
    right: -5,
    transform: [{ rotate: "-60deg" }],
  },

  plague3: {
    bottom: 30,
    left: 80,
    transform: [{ rotate: "20deg" }],
  },
});