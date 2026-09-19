import React, { useState } from "react";

import IntroScreen from "./screens/IntroScreen";
import LoginScreen from "./screens/LoginScreen";
import JoinGameScreen from "./screens/JoinGameScreen";
import QueueScreen from "./screens/QueueScreen";
import MapScreen from "./screens/MapScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("intro");
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");

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

  // JOIN GAME
  if (currentScreen === "join") {
    return (
      <JoinGameScreen
        playerName={playerName}
        onJoin={(code) => {
          setRoomCode(code);
          setCurrentScreen("queue");
        }}
        onNavigate={setCurrentScreen}
        onLeave={() => {
          setPlayerName("");
          setRoomCode("");
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
        roomCode={roomCode}
        onNavigate={setCurrentScreen}
        onLeave={() => {
          setPlayerName("");
          setRoomCode("");
          setCurrentScreen("login");
        }}
      />
    );
  }

  // MAP
  if (currentScreen === "map") {
    return (
      <MapScreen
        playerName={playerName}
        roomCode={roomCode}
        onNavigate={setCurrentScreen}
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