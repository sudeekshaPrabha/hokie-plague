import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function RoleRevealScreen({
  role,
  onFinish,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 7000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const isPlaguer = role === "PLAGUER";

  return (
    <SafeAreaView style={styles.screen}>

      <View style={styles.content}>

        <Text style={styles.smallText}>
          YOUR ROLE IS
        </Text>

        <Text
          style={[
            styles.roleText,
            isPlaguer
              ? styles.plaguerText
              : styles.survivorText,
          ]}
        >
          {role}
        </Text>

        <Text style={styles.description}>
          {isPlaguer
            ? "Spread the HokiePlague."
            : "Stay alive. Avoid the plague."}
        </Text>

        <Text style={styles.loadingText}>
          GAME STARTING...
        </Text>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#151617",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  smallText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 3,
  },

  roleText: {
    fontSize: 46,
    fontWeight: "900",
    letterSpacing: 3,
    marginTop: 20,
  },

  plaguerText: {
    color: "#39FF14",
  },

  survivorText: {
    color: "#E87722",
  },

  description: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginTop: 25,
  },

  loadingText: {
    color: "#888888",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
    marginTop: 60,
  },
});