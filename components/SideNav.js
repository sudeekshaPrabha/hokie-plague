import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export default function SideNav({
  onNavigate,
  onLeave,
}) {
  const [open, setOpen] = useState(false);

  const goTo = (screen) => {
    setOpen(false);

    if (onNavigate) {
      onNavigate(screen);
    }
  };

  const handleLeave = () => {
    setOpen(false);

    if (onLeave) {
      onLeave();
    }
  };

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <Pressable
        style={styles.menuButton}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.menuIcon}>
          ☰
        </Text>
      </Pressable>

      {/* SIDE MENU */}
      {open && (
        <View style={styles.nav}>
          <Text style={styles.navTitle}>
            Hokie Plague
          </Text>

          {/* JOIN GAME */}
          <Pressable
            style={styles.navItem}
            onPress={() => goTo("join")}
          >
            <Text style={styles.navText}>
              Join Game
            </Text>
          </Pressable>

          {/* RULES */}
          <Pressable
            style={styles.navItem}
            onPress={() => goTo("rules")}
          >
            <Text style={styles.navText}>
              Rules
            </Text>
          </Pressable>

          {/* PLAYERS */}
          <Pressable
            style={styles.navItem}
            onPress={() => goTo("queue")}
          >
            <Text style={styles.navText}>
              Players
            </Text>
          </Pressable>

          {/* MAP */}
          <Pressable
            style={styles.navItem}
            onPress={() => goTo("map")}
          >
            <Text style={styles.navText}>
              Map
            </Text>
          </Pressable>

          {/* LEAVE GAME */}
          <Pressable
            style={styles.navItem}
            onPress={handleLeave}
          >
            <Text style={styles.leaveText}>
              Leave Game
            </Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 146,
    left: 5,

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
    fontSize: 40,
    fontWeight: "900",
  },

  nav: {
    position: "absolute",

    top: 144,
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