import React, { useState } from "react";

import IntroScreen from "./screens/IntroScreen";
import LoginScreen from "./screens/LoginScreen";
import RulesScreen from "./screens/RulesScreen";
import JoinGameScreen from "./screens/JoinGameScreen";
import QueueScreen from "./screens/QueueScreen";
import MapScreen from "./screens/MapScreen";


export default function App() {

  const [currentScreen, setCurrentScreen] = useState("intro");

  const [previousScreen, setPreviousScreen] = useState("join");

  const [playerName, setPlayerName] = useState("");

  const [roomCode, setRoomCode] = useState("");


  // =====================================================
  // SIDE NAVIGATION
  // =====================================================

  const navigateTo = (screen) => {

    // If opening Rules, remember where the player came from
    if (screen === "rules") {
      setPreviousScreen(currentScreen);
    }

    setCurrentScreen(screen);
  };


  // =====================================================
  // INTRO
  // =====================================================

  if (currentScreen === "intro") {

    return (
      <IntroScreen
        onFinish={() => setCurrentScreen("login")}
      />
    );

  }


  // =====================================================
  // LOGIN
  // =====================================================

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


  // =====================================================
  // RULES
  // =====================================================

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


  // =====================================================
  // JOIN GAME
  // =====================================================

  if (currentScreen === "join") {

    return (
      <JoinGameScreen

        playerName={playerName}

        onJoin={(code) => {

          setRoomCode(code);

          setCurrentScreen("queue");

        }}

        onNavigate={navigateTo}

        onLeave={() => {

          setPlayerName("");

          setRoomCode("");

          setCurrentScreen("login");

        }}

      />
    );

  }


  // =====================================================
  // QUEUE / PLAYERS
  // =====================================================

  if (currentScreen === "queue") {

    return (
      <QueueScreen

        playerName={playerName}

        roomCode={roomCode}

        onNavigate={navigateTo}

        onLeave={() => {

          setPlayerName("");

          setRoomCode("");

          setCurrentScreen("login");

        }}

      />
    );

  }


  // =====================================================
  // MAP
  // =====================================================

  if (currentScreen === "map") {

    return (
      <MapScreen

        playerName={playerName}

        roomCode={roomCode}

        onNavigate={navigateTo}

        onLeave={() => {

          setPlayerName("");

          setRoomCode("");

          setCurrentScreen("login");

        }}

      />
    );

  }


  return null;
}