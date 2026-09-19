import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import IntroScreen from "./screens/IntroScreen";
import LoginScreen from "./screens/LoginScreen";
import RulesScreen from "./screens/RulesScreen";
import JoinGameScreen from "./screens/JoinGameScreen";
import QueueScreen from "./screens/QueueScreen";
import RoleRevealScreen from "./screens/RoleRevealScreen";
import MapScreen from "./screens/MapScreen";

import HokieAssistant from "./components/HokieBird";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("intro");

  const [previousScreen, setPreviousScreen] = useState("join");

  const [playerName, setPlayerName] = useState("");

  // TEMP role until real multiplayer role assignment is added
  const [playerRole, setPlayerRole] = useState("SURVIVOR");


  // =====================================================
  // SIDE NAVIGATION
  // =====================================================

  const navigateTo = (screen) => {
    // Remember where the player was before opening Rules
    if (screen === "rules") {
      setPreviousScreen(currentScreen);
    }

    setCurrentScreen(screen);
  };


  // =====================================================
  // TEMPORARY GAME START
  // =====================================================

  const startGame = () => {
    // Temporary role assignment for testing
    const randomRole =
      Math.random() < 0.25
        ? "PLAGUER"
        : "SURVIVOR";

    setPlayerRole(randomRole);

    // Go to role reveal
    setCurrentScreen("role");
  };


  // =====================================================
  // SCREEN RENDERING
  // =====================================================

  const renderCurrentScreen = () => {


    // INTRO
    if (currentScreen === "intro") {
      return (
        <IntroScreen
          onFinish={() => setCurrentScreen("login")}
        />
      );
    }


    // LOGIN
    if (currentScreen === "login") {
      return (
        <LoginScreen
          onContinue={(name) => {
            setPlayerName(name);

            setCurrentScreen("join");
          }}
        />
      );
    }


    // RULES
    if (currentScreen === "rules") {
      return (
        <RulesScreen
          onBack={() => {
            setCurrentScreen(previousScreen);
          }}

          onContinue={() => {
            setCurrentScreen(previousScreen);
          }}
        />
      );
    }


    // JOIN GAME
    if (currentScreen === "join") {
      return (
        <JoinGameScreen
          playerName={playerName}

          onJoin={() => {
            setCurrentScreen("queue");
          }}

          onNavigate={navigateTo}

          onLeave={() => {
            setPlayerName("");

            setCurrentScreen("login");
          }}
        />
      );
    }


    // QUEUE / PLAYERS
    if (currentScreen === "queue") {
      return (
        <QueueScreen
          playerName={playerName}

          onNavigate={navigateTo}

          onLeave={() => {
            setPlayerName("");

            setCurrentScreen("login");
          }}

          // TEMPORARY FORCE START
          onForceStart={startGame}
        />
      );
    }


    // ROLE REVEAL
    if (currentScreen === "role") {
      return (
        <RoleRevealScreen
          role={playerRole}

          onFinish={() => {
            setCurrentScreen("map");
          }}
        />
      );
    }


    // MAP
    if (currentScreen === "map") {
      return (
        <MapScreen
          playerName={playerName}

          onNavigate={navigateTo}

          onLeave={() => {
            setPlayerName("");

            setCurrentScreen("login");
          }}
        />
      );
    }


    return null;
  };


  // =====================================================
  // WHOLE APP
  // =====================================================

  return (
    <View style={styles.app}>

      {/* Current page */}
      {renderCurrentScreen()}


      {/* Hokie AI Assistant
          Shows everywhere except intro */}
      {currentScreen !== "intro" && (
        <HokieAssistant />
      )}

    </View>
  );
}


const styles = StyleSheet.create({
  app: {
    flex: 1,

    backgroundColor: "#111312",
  },
});