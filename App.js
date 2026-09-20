
import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import IntroScreen from "./screens/IntroScreen";
import LoginScreen from "./screens/LoginScreen";
import RulesScreen from "./screens/RulesScreen";
import JoinGameScreen from "./screens/JoinGameScreen";
import QueueScreen from "./screens/QueueScreen";
import RoleRevealScreen from "./screens/RoleRevealScreen";
import MapScreen from "./screens/MapScreen";
import InfectedScreen from "./screens/InfectedScreen";
import FinalResultsScreen from "./screens/FinalResultsScreen";

import {
  joinGame,
  leaveGame,
  startRound,
  endRound,
  listenMeta,
  listenPlayers,
  spawnSafeZoneOnce,
} from "./game";
import { randomZoneCenter } from "./boundary";
import { checkRoundEnd } from "./person3/roundRules";
import config from "./person3/config";

import HokieBird from "./components/HokieBird";

const GAME_CODE = "NCB1"; // one shared lobby for now


export default function App() {
  const [currentScreen, setCurrentScreen] = useState("intro");
  const [previousScreen, setPreviousScreen] = useState("join");
  const [playerName, setPlayerName] = useState("");
  const [playerRole, setPlayerRole] = useState("SURVIVOR");
 
  const [playerId, setPlayerId] = useState(null);
  const [joining, setJoining] = useState(false);
 
  // shared game state from Firebase
  const [meta, setMeta] = useState({});
  const [players, setPlayers] = useState([]);
  const [infectedShown, setInfectedShown] = useState(false);
 
  const me = players.find((p) => p.id === playerId);
 
  // refs so timers always read fresh values without restarting
  const playersRef = useRef([]);
  playersRef.current = players;
  const metaRef = useRef({});
  metaRef.current = meta;
  const lastSlot = useRef(null);
 
  // =====================================================
  // FIREBASE LISTENERS
  // =====================================================
 
  useEffect(() => {
    if (!playerId) return;
    const stopMeta = listenMeta(GAME_CODE, setMeta);
    const stopPlayers = listenPlayers(GAME_CODE, setPlayers);
    return () => {
      stopMeta();
      stopPlayers();
    };
  }, [playerId]);
 
  // =====================================================
  // SCREEN FLOW DRIVEN BY GAME STATE
  // =====================================================
 
  // round started -> role reveal
  useEffect(() => {
    if (meta.status === "playing" && currentScreen === "queue" && me?.team) {
      setPlayerRole(me.team === "infected" ? "PLAGUER" : "SURVIVOR");
      setInfectedShown(false);
      setCurrentScreen("role");
    }
  }, [meta.status, currentScreen, me?.team]);
 
  // I was infected -> infection screen (once per round)
  useEffect(() => {
    if (currentScreen === "map" && me?.eliminated && !infectedShown) {
      setCurrentScreen("infected");
    }
  }, [me?.eliminated, currentScreen, infectedShown]);
 
  // round ended -> final results
  useEffect(() => {
    if (
      meta.status === "ended" &&
      ["map", "infected", "rules"].includes(currentScreen)
    ) {
      setCurrentScreen("results");
    }
  }, [meta.status, currentScreen]);
 
  // Runs on EVERY phone (no host needed):
  //  - one green zone per 15 minute slot (first phone to write wins)
  //  - checks if the round is over
  useEffect(() => {
    if (!playerId || meta.status !== "playing" || !meta.huntStartsAt) return;
    lastSlot.current = null;
 
    const tick = () => {
      const now = Date.now();
 
      if (now >= meta.huntStartsAt) {
        const slot = Math.floor(
          (now - meta.huntStartsAt) / (config.SAFE_ZONE_SPAWN_MINUTES * 60000)
        );
        if (slot !== lastSlot.current) {
          lastSlot.current = slot;
          const c = randomZoneCenter(config.SAFE_ZONE_RADIUS_METERS);
          spawnSafeZoneOnce(
            GAME_CODE,
            slot,
            c.latitude,
            c.longitude,
            config.SAFE_ZONE_RADIUS_METERS,
            config.SAFE_ZONE_DURATION_SECONDS / 60
          );
        }
      }
 
      const winner = checkRoundEnd(playersRef.current, meta.endsAt, now);
      if (winner) endRound(GAME_CODE, winner);
    };
 
    tick();
    const t = setInterval(tick, 2000);
    return () => clearInterval(t);
  }, [playerId, meta.status, meta.huntStartsAt, meta.endsAt]);
 
  // =====================================================
  // STABLE CALLBACKS (the timed screens restart their timers
  // if these change on every render)
  // =====================================================
 
  const onRoleDone = useCallback(() => setCurrentScreen("map"), []);
 
  const onInfectedDone = useCallback(() => {
    setInfectedShown(true);
    // if the round already ended go to results, otherwise spectate the map
    setCurrentScreen(metaRef.current.status === "ended" ? "results" : "map");
  }, []);
 
  // =====================================================
  // ACTIONS
  // =====================================================
 
  const navigateTo = (screen) => {
    const playing = meta.status === "playing";
    if (playing && (screen === "join" || screen === "queue")) return; // no leaving mid-round
    if (!playing && screen === "map") return; // no map before a round
    if (screen === "rules") setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };
 
  const handleJoin = async () => {
    if (joining) return; // ignores double taps
    setJoining(true);
    try {
      const id = await joinGame(GAME_CODE, playerName);
      setPlayerId(id);
      setCurrentScreen("queue");
    } catch (e) {
      console.log("join failed", e);
    }
    setJoining(false);
  };
 
  // anyone can press start; the transaction in startRound lets only one succeed.
  // Total round = ROUND_DURATION_SECONDS, which includes the spread-out phase.
  const startGame = async () => {
    try {
      await startRound(
        GAME_CODE,
        config.SPREAD_OUT_SECONDS,
        config.ROUND_DURATION_SECONDS - config.SPREAD_OUT_SECONDS
      );
    } catch (e) {
      console.log("start failed", e);
    }
  };
 
  const handleLeave = () => {
    if (playerId) leaveGame(GAME_CODE, playerId).catch(() => {});
    setPlayerId(null);
    setPlayerName("");
    setPlayers([]);
    setMeta({});
    setInfectedShown(false);
    setCurrentScreen("login");
  };
 
  const handlePlayAgain = () => {
    setInfectedShown(false);
    setCurrentScreen("queue");
  };
 
  // =====================================================
  // SCREEN RENDERING
  // =====================================================
 
  const renderCurrentScreen = () => {
    if (currentScreen === "intro") {
      return <IntroScreen onFinish={() => setCurrentScreen("login")} />;
    }
 
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
 
    if (currentScreen === "rules") {
      return (
        <RulesScreen
          onBack={() => setCurrentScreen(previousScreen)}
          onContinue={() => setCurrentScreen(previousScreen)}
        />
      );
    }
 
    if (currentScreen === "join") {
      return (
        <JoinGameScreen
          playerName={playerName}
          onJoin={handleJoin}
          onNavigate={navigateTo}
          onLeave={() => {
            setPlayerName("");
          }}
        />
      );
    }
 
    if (currentScreen === "queue") {
      return (
        <QueueScreen
          playerName={playerName}
          players={players}
          onNavigate={navigateTo}
          onLeave={handleLeave}
          onForceStart={startGame}
        />
      );
    }
 
    if (currentScreen === "role") {
      return <RoleRevealScreen role={playerRole} onFinish={onRoleDone} />;
    }
 
    if (currentScreen === "map") {
      return (
        <MapScreen
          gameCode={GAME_CODE}
          playerId={playerId}
          meta={meta}
          onNavigate={navigateTo}
          onLeave={handleLeave}
        />
      );
    }
 
    if (currentScreen === "infected") {
      return <InfectedScreen playerName={playerName} onFinish={onInfectedDone} />;
    }
 
    if (currentScreen === "results") {
      return (
        <FinalResultsScreen
          playerName={playerName}
          winner={meta.winner === "infected" ? "PLAGUERS" : "SURVIVORS"}
          wasInfected={!!(me?.eliminated || me?.team === "infected")}
          onPlayAgain={handlePlayAgain}
          onLeave={handleLeave}
        />
      );
    }
 
    return null;
  };
 
  return (
    <View style={styles.app}>
      {renderCurrentScreen()}
 
      {/* HOKIE BIRD AI stays mounted so chat history is kept */}
      {currentScreen !== "intro" && <HokieBird />}
    </View>
  );
}
 
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#111312",
  },
});








// import React, { useState } from "react";
// import { StyleSheet, View } from "react-native";

// import IntroScreen from "./screens/IntroScreen";
// import LoginScreen from "./screens/LoginScreen";
// import RulesScreen from "./screens/RulesScreen";
// import JoinGameScreen from "./screens/JoinGameScreen";
// import QueueScreen from "./screens/QueueScreen";
// import RoleRevealScreen from "./screens/RoleRevealScreen";
// import MapScreen from "./screens/MapScreen";

// import HokieBird from "./components/HokieBird";

// export default function App() {
//   const [currentScreen, setCurrentScreen] = useState("intro");

//   const [previousScreen, setPreviousScreen] = useState("join");

//   const [playerName, setPlayerName] = useState("");

//   // TEMP role until real multiplayer role assignment is added
//   const [playerRole, setPlayerRole] = useState("SURVIVOR");


//   // =====================================================
//   // SIDE NAVIGATION
//   // =====================================================

//   const navigateTo = (screen) => {
//     // Remember where the player was before opening Rules
//     if (screen === "rules") {
//       setPreviousScreen(currentScreen);
//     }

//     setCurrentScreen(screen);
//   };


//   // =====================================================
//   // TEMPORARY GAME START
//   // =====================================================

//   const startGame = () => {
//     // Temporary role assignment for testing
//     const randomRole =
//       Math.random() < 0.25
//         ? "PLAGUER"
//         : "SURVIVOR";

//     setPlayerRole(randomRole);

//     // Go to role reveal
//     setCurrentScreen("role");
//   };


//   // =====================================================
//   // SCREEN RENDERING
//   // =====================================================

//   const renderCurrentScreen = () => {


//     // ===================================================
//     // INTRO
//     // ===================================================

//     if (currentScreen === "intro") {
//       return (
//         <IntroScreen
//           onFinish={() => setCurrentScreen("login")}
//         />
//       );
//     }


//     // ===================================================
//     // LOGIN
//     // ===================================================

//     if (currentScreen === "login") {
//       return (
//         <LoginScreen
//           onContinue={(name) => {
//             setPlayerName(name);

//             setCurrentScreen("join");
//           }}
//         />
//       );
//     }


//     // ===================================================
//     // RULES
//     // ===================================================

//     if (currentScreen === "rules") {
//       return (
//         <RulesScreen
//           onBack={() => {
//             setCurrentScreen(previousScreen);
//           }}

//           onContinue={() => {
//             setCurrentScreen(previousScreen);
//           }}
//         />
//       );
//     }


//     // ===================================================
//     // JOIN GAME
//     // ===================================================

//     if (currentScreen === "join") {
//       return (
//         <JoinGameScreen
//           playerName={playerName}

//           onJoin={() => {
//             setCurrentScreen("queue");
//           }}

//           onNavigate={navigateTo}

//           onLeave={() => {
//             setPlayerName("");

//             setCurrentScreen("login");
//           }}
//         />
//       );
//     }


//     // ===================================================
//     // QUEUE / PLAYERS
//     // ===================================================

//     if (currentScreen === "queue") {
//       return (
//         <QueueScreen
//           playerName={playerName}

//           onNavigate={navigateTo}

//           onLeave={() => {
//             setPlayerName("");

//             setCurrentScreen("login");
//           }}

//           // TEMPORARY FORCE START
//           onForceStart={startGame}
//         />
//       );
//     }


//     // ROLE REVEAL
//     if (currentScreen === "role") {
//       return (
//         <RoleRevealScreen
//           role={playerRole}

//           onFinish={() => {
//             setCurrentScreen("map");
//           }}
//         />
//       );
//     }


//     // ===================================================
//     // MAP
//     // ===================================================

//     if (currentScreen === "map") {
//       return (
//         <MapScreen
//           playerName={playerName}

//           onNavigate={navigateTo}

//           onLeave={() => {
//             setPlayerName("");

//             setCurrentScreen("login");
//           }}
//         />
//       );
//     }


//     return null;
//   };


//   // =====================================================
//   // WHOLE APP
//   // =====================================================

//   return (
//     <View style={styles.app}>

//       {/* CURRENT SCREEN */}
//       {renderCurrentScreen()}


//       {/* =================================================
//           HOKIE BIRD AI

//           Stays mounted throughout the app so chat history
//           is preserved when switching between pages.

//           Hidden during the cinematic intro.
//       ================================================= */}

//       {currentScreen !== "intro" && (
//         <HokieBird />
//       )}

//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   app: {
//     flex: 1,

//     backgroundColor: "#111312",
//   },
// });