import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import SideNav from "../components/SideNav";

export default function JoinGameScreen({ playerName, onJoin }) {
  const [roomCode, setRoomCode] = useState("");

  const handleJoin = () => {
    if (!roomCode.trim()) return;

    const code = roomCode.trim().toUpperCase();

    console.log("Player:", playerName);
    console.log("Room Code:", code);

    if (onJoin) {
      onJoin(code);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>Hokie Plague</Text>
        </View>

        {/* SIDE NAV */}
        <SideNav />

        {/* PLAGUE DECORATIONS */}
        <Text style={[styles.plague, styles.plague1]}>〰</Text>
        <Text style={[styles.plague, styles.plague2]}>〰</Text>
        <Text style={[styles.plague, styles.plague3]}>〰</Text>
        <Text style={[styles.plague, styles.plague4]}>〰</Text>

        {/* MAIN CONTENT */}
        <View style={styles.content}>
          <Text style={styles.welcome}>
            Welcome, {playerName}
          </Text>

          <Text style={styles.title}>
            ENTER GAME CODE
          </Text>

          <TextInput
            style={styles.input}
            placeholder="ROOM CODE"
            placeholderTextColor="#777777"
            value={roomCode}
            onChangeText={setRoomCode}
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={6}
          />

          {/* ZOMBIE JOIN BUTTON */}
          <Pressable
            onPress={handleJoin}
            disabled={!roomCode.trim()}
            style={({ pressed }) => [
              styles.joinButton,
              pressed && styles.pressed,
              !roomCode.trim() && styles.disabled,
            ]}
          >
            <Image
              source={require("../assets/join_button.png")}
              style={styles.joinImage}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 20,
  },

  input: {
    width: "82%",
    height: 55,

    backgroundColor: "#202020",

    borderWidth: 2,
    borderColor: "#39FF14",
    borderRadius: 12,

    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",

    textAlign: "center",
    letterSpacing: 4,

    marginBottom: 5,
  },

  joinButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  joinImage: {
    width: 350,
    height: 280,
  },

  pressed: {
    transform: [{ scale: 0.96 }],
  },

  disabled: {
    opacity: 0.45,
  },

  plague: {
    position: "absolute",
    color: "#39FF14",
    fontSize: 90,
    zIndex: 0,
  },

  plague1: {
    top: 120,
    left: 10,
    transform: [{ rotate: "60deg" }],
  },

  plague2: {
    top: 180,
    right: 5,
    transform: [{ rotate: "-60deg" }],
  },

  plague3: {
    bottom: 80,
    left: 15,
    transform: [{ rotate: "40deg" }],
  },

  plague4: {
    bottom: 70,
    right: 10,
    transform: [{ rotate: "-40deg" }],
  },
});