import React, { useState } from "react";

import IntroScreen from "./screens/IntroScreen";
import LoginScreen from "./screens/LoginScreen";
import JoinGameScreen from "./screens/JoinGameScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("intro");
  const [playerName, setPlayerName] = useState("");

  // INTRO
  if (currentScreen === "intro") {
    return (
      <IntroScreen
        onEnter={() => setCurrentScreen("login")}
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
          console.log("Joining game:", code);

          // Queue will go here later
          // setCurrentScreen("queue");
        }}
      />
    );
  }

  return null;
}