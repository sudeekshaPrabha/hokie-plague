import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export default function SideNav({ onNavigate, onLeave }) {
  const [open, setOpen] = useState(false);

  const goTo = (screen) => {
    setOpen(false);
    onNavigate(screen);
  };

  return (
    <>
      {/* HAMBURGER */}
      <Pressable
        style={styles.menuButton}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </Pressable>

      {/* MENU */}
      {open && (
        <View style={styles.nav}>
          <Text style={styles.navTitle}>Hokie Plague</Text>

          <Pressable
            style={styles.navItem}
            onPress={() => goTo("join")}
          >
            <Text style={styles.navText}>Join Game</Text>
          </Pressable>

          {/* We'll make RulesScreen later */}
          <Pressable style={styles.navItem}>
            <Text style={styles.navText}>Rules</Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => goTo("queue")}
          >
            <Text style={styles.navText}>Players</Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => goTo("map")}
          >
            <Text style={styles.navText}>Map</Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={onLeave}
          >
            <Text style={styles.leaveText}>Leave Game</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 105,
    left: 18,
    width: 48,
    height: 48,
    backgroundColor: "#861F41",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 30,
  },

  menuIcon: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
  },

  nav: {
    position: "absolute",
    top: 85,
    left: 0,
    bottom: 0,
    width: 240,
    backgroundColor: "#202020",
    paddingTop: 85,
    paddingHorizontal: 20,
    zIndex: 25,
    borderRightWidth: 2,
    borderRightColor: "#39FF14",
  },

  navTitle: {
    color: "#E87722",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 25,
  },

  navItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444444",
  },

  navText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  leaveText: {
    color: "#FF5252",
    fontSize: 18,
    fontWeight: "800",
  },
});