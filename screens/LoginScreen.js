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

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const handleJoin = () => {
    console.log("Player:", name);
    console.log("Room Code:", roomCode);

    // Later this will send the player to the Queue screen
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* TOP BAR */}
        <View style={styles.header}>
          <Text style={styles.logo}>Hokie Plague</Text>
        </View>

        {/* GREEN PLAGUE DECORATIONS */}
        <Text style={[styles.plague, styles.plague1]}>〰</Text>
        <Text style={[styles.plague, styles.plague2]}>〰</Text>
        <Text style={[styles.plague, styles.plague3]}>〰</Text>
        <Text style={[styles.plague, styles.plague4]}>〰</Text>
        <Text style={[styles.plague, styles.plague5]}>〰</Text>

        <View style={styles.content}>
          <Text style={styles.title}>ENTER THE OUTBREAK</Text>

          {/* PLAYER NAME */}
          <TextInput
            style={styles.input}
            placeholder="Player Name"
            placeholderTextColor="#777"
            value={name}
            onChangeText={setName}
            maxLength={20}
          />

          {/* ROOM CODE */}
          <TextInput
            style={styles.input}
            placeholder="Room Code"
            placeholderTextColor="#777"
            value={roomCode}
            onChangeText={setRoomCode}
            autoCapitalize="characters"
            maxLength={6}
          />

          {/* YOUR ZOMBIE JOIN ASSET */}
          <Pressable
            onPress={handleJoin}
            disabled={!name.trim() || !roomCode.trim()}
            style={({ pressed }) => [
              styles.joinButton,
              pressed && styles.pressed,
              (!name.trim() || !roomCode.trim()) && styles.disabled,
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

  title: {
    color: "white",
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 25,
  },

  input: {
    width: "82%",
    height: 55,
    backgroundColor: "#202020",
    color: "white",

    borderWidth: 2,
    borderColor: "#39FF14",
    borderRadius: 12,

    fontSize: 18,
    paddingHorizontal: 15,
    marginBottom: 14,
  },

  joinButton: {
    marginTop: 5,
    alignItems: "center",
  },

  joinImage: {
    width: 350,
    height: 280,
  },

  pressed: {
    transform: [{ scale: 0.96 }],
  },

  disabled: {
    opacity: 0.55,
  },

  plague: {
    position: "absolute",
    color: "#39FF14",
    fontSize: 90,
    fontWeight: "200",
  },

  plague1: {
    top: 120,
    left: 10,
    transform: [{ rotate: "65deg" }],
  },

  plague2: {
    top: 160,
    right: 0,
    transform: [{ rotate: "-60deg" }],
  },

  plague3: {
    bottom: 100,
    left: -5,
    transform: [{ rotate: "40deg" }],
  },

  plague4: {
    bottom: 70,
    right: 10,
    transform: [{ rotate: "-50deg" }],
  },

  plague5: {
    bottom: 10,
    left: 120,
    transform: [{ rotate: "20deg" }],
  },
});