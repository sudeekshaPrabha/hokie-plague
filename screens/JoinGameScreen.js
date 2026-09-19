import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import SideNav from "../components/SideNav";

export default function JoinGameScreen({
  playerName,
  onJoin,
  onNavigate,
  onLeave,
}) {
  const handleJoin = () => {
    console.log("Joining game as:", playerName);

    if (onJoin) {
      onJoin();
    }
  };

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
      <Text style={[styles.plague, styles.plague4]}>〰</Text>
      <Text style={[styles.plague, styles.plague5]}>〰</Text>

      {/* MAIN CONTENT */}
      <View style={styles.content}>
        <Text style={styles.welcome}>
          Welcome, {playerName}
        </Text>

        {/* ZOMBIE JOIN BUTTON */}
        <Pressable
          onPress={handleJoin}
          style={({ pressed }) => [
            styles.joinButton,
            pressed && styles.pressed,
          ]}
        >
          <Image
            source={require("../assets/join_button.png")}
            style={styles.joinImage}
            resizeMode="contain"
          />
        </Pressable>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 5,
  },

  joinButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  joinImage: {
    width: 360,
    height: 330,
  },

  pressed: {
    transform: [{ scale: 0.96 }],
  },

  plague: {
    position: "absolute",
    color: "#39FF14",
    fontSize: 95,
    zIndex: 0,
  },

  plague1: {
    top: 120,
    left: 5,
    transform: [{ rotate: "60deg" }],
  },

  plague2: {
    top: 185,
    right: 0,
    transform: [{ rotate: "-60deg" }],
  },

  plague3: {
    bottom: 170,
    left: 5,
    transform: [{ rotate: "45deg" }],
  },

  plague4: {
    bottom: 90,
    right: 5,
    transform: [{ rotate: "-45deg" }],
  },

  plague5: {
    bottom: 25,
    left: 110,
    transform: [{ rotate: "15deg" }],
  },
});