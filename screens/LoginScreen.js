import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

export default function LoginScreen({ onContinue }) {
  const [name, setName] = useState("");

  const handleContinue = () => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    onContinue(trimmedName);
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../assets/login-screen-background-latest.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <TextInput
          style={styles.input}
          placeholder="Player Name"
          placeholderTextColor="#777777"
          value={name}
          onChangeText={setName}
          maxLength={20}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={handleContinue}
          selectionColor="#55FF20"
        />

        <Pressable
          onPress={handleContinue}
          disabled={!name.trim()}
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Continue"
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#101010",
    overflow: "hidden",
  },

  background: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  input: {
    position: "absolute",

    top: SCREEN_HEIGHT * 0.475,
    left: SCREEN_WIDTH * 0.16,

    width: SCREEN_WIDTH * 0.68,
    height: 58,

    backgroundColor: "#171717",

    borderWidth: 2,
    borderColor: "#55FF20",
    borderRadius: 12,

    color: "#FFFFFF",

    fontSize: 19,

    paddingHorizontal: 18,
    paddingVertical: 0,
  },

  continueButton: {
    position: "absolute",

    top: SCREEN_HEIGHT * 0.57,
    left: SCREEN_WIDTH * 0.25,

    width: SCREEN_WIDTH * 0.5,
    height: 65,

    backgroundColor: "transparent",
  },

  pressed: {
    opacity: 0.6,
  },
});