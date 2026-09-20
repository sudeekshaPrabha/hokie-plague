import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function FinalResultsScreen({
  playerName,
  winner = "SURVIVORS",
  wasInfected = false,
  onPlayAgain,
  onLeave,
}) {
  const survivorsWon = winner === "SURVIVORS";

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          Hokie Plague
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.finalLabel}>
          FINAL RESULTS
        </Text>

        <Text
          style={[
            styles.winner,
            survivorsWon
              ? styles.survivorWinner
              : styles.plaguerWinner,
          ]}
        >
          {winner} WIN
        </Text>

        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>
            YOUR RESULT
          </Text>

          <Text style={styles.playerName}>
            {playerName}
          </Text>

          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                wasInfected
                  ? styles.infectedDot
                  : styles.safeDot,
              ]}
            />

            <Text
              style={[
                styles.statusText,
                wasInfected
                  ? styles.infectedText
                  : styles.safeText,
              ]}
            >
              {wasInfected
                ? "INFECTED"
                : "SURVIVED"}
            </Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.playAgainButton,
            pressed && styles.pressed,
          ]}
          onPress={onPlayAgain}
        >
          <Text style={styles.playAgainText}>
            PLAY AGAIN
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.leaveButton,
            pressed && styles.pressed,
          ]}
          onPress={onLeave}
        >
          <Text style={styles.leaveText}>
            LEAVE GAME
          </Text>
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
    paddingTop: 65,
  },

  finalLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 3,
  },

  winner: {
    fontSize: 39,
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 15,
    textAlign: "center",
  },

  survivorWinner: {
    color: "#39FF14",
  },

  plaguerWinner: {
    color: "#FF4747",
  },

  resultCard: {
    width: "88%",
    backgroundColor: "#202020",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#861F41",
    padding: 25,
    marginTop: 45,
    alignItems: "center",
  },

  resultTitle: {
    color: "#E87722",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 2,
  },

  playerName: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    marginTop: 18,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
  },

  statusDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    marginRight: 9,
  },

  safeDot: {
    backgroundColor: "#39FF14",
  },

  infectedDot: {
    backgroundColor: "#FF4747",
  },

  statusText: {
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  safeText: {
    color: "#39FF14",
  },

  infectedText: {
    color: "#FF4747",
  },

  playAgainButton: {
    width: "75%",
    height: 58,
    backgroundColor: "#861F41",
    borderWidth: 2,
    borderColor: "#E87722",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  playAgainText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
  },

  leaveButton: {
    width: "75%",
    height: 55,
    backgroundColor: "#202020",
    borderWidth: 2,
    borderColor: "#FF4747",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  leaveText: {
    color: "#FF4747",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 2,
  },

  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.85,
  },
});