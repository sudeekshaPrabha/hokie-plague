import React from "react";

import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import SideNav from "../components/SideNav";


export default function JoinGameScreen({
  playerName,
  onJoin,
  onNavigate,
  onLeave,
}) {


  // =====================================================
  // JOIN GAME
  // =====================================================

  const handleJoin = () => {

    console.log(
      "Joining game as:",
      playerName
    );


    if (onJoin) {
      onJoin();
    }

  };


  return (

    <SafeAreaView style={styles.screen}>


      {/* =================================================
          FULL SCREEN ARTWORK
      ================================================= */}

      <ImageBackground

        source={require(
          "../assets/join_screen_background.png"
        )}

        style={styles.background}

        resizeMode="cover"

      >


        {/* =================================================
            SIDE NAV

            The real SideNav button sits over the
            hamburger graphic in the artwork.
        ================================================= */}

        <SideNav
          onNavigate={onNavigate}
          onLeave={onLeave}
        />


        {/* =================================================
            PLAYER WELCOME

            Kept as real text so the player's actual
            name can appear.
        ================================================= */}

        <View
          pointerEvents="none"
          style={styles.welcomeArea}
        >

          <Text style={styles.welcome}>
            Welcome, {playerName}
          </Text>


          <View style={styles.welcomeLine} />


          <Text style={styles.subtitle}>
            Join a round to survive the outbreak.
          </Text>

        </View>


        {/* =================================================
            JOIN BUTTON

            Invisible Pressable positioned directly
            over the JOIN sign in the artwork.
        ================================================= */}

        <Pressable

          accessibilityRole="button"

          accessibilityLabel="Join game"

          onPress={handleJoin}

          style={({ pressed }) => [

            styles.joinButton,

            pressed &&
              styles.joinButtonPressed,

          ]}

        />


        {/* =================================================
            SMALL JOIN HINT
        ================================================= */}

        <View
          pointerEvents="none"
          style={styles.joinHintContainer}
        >

          <Text style={styles.joinHint}>
            TAP JOIN TO ENTER
          </Text>

        </View>


      </ImageBackground>


    </SafeAreaView>

  );

}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({


  // ====================================================
  // SCREEN
  // ====================================================

  screen: {

    flex: 1,

    backgroundColor: "#080A09",

  },


  // ====================================================
  // BACKGROUND IMAGE
  // ====================================================

  background: {

    flex: 1,

    width: "100%",

    height: "100%",

  },


  // ====================================================
  // WELCOME MESSAGE
  // ====================================================

  welcomeArea: {

    position: "absolute",

    top: "22%",

    left: 20,
    right: 20,

    alignItems: "center",

    zIndex: 8,

  },


  welcome: {

    color: "#FFFFFF",

    fontSize: 31,

    fontWeight: "900",

    textAlign: "center",


    textShadowColor:
      "rgba(0, 0, 0, 0.95)",

    textShadowOffset: {
      width: 0,
      height: 3,
    },

    textShadowRadius: 7,

  },


  welcomeLine: {

    width: 130,

    height: 3,

    marginTop: 9,

    borderRadius: 3,

    backgroundColor: "#65FF45",


    shadowColor: "#65FF45",

    shadowOpacity: 1,

    shadowRadius: 7,

  },


  subtitle: {

    marginTop: 11,

    color: "#D7D7D7",

    fontSize: 14,

    fontWeight: "600",

    letterSpacing: 0.4,

    textAlign: "center",


    textShadowColor:
      "rgba(0, 0, 0, 1)",

    textShadowOffset: {
      width: 0,
      height: 2,
    },

    textShadowRadius: 5,

  },


  // ====================================================
  // JOIN CLICK AREA
  //
  // This is transparent and positioned over the large
  // JOIN sign in the background artwork.
  // ====================================================

  joinButton: {

    position: "absolute",

    top: "40%",

    left: "18%",

    right: "18%",

    height: "23%",

    borderRadius: 28,

    zIndex: 15,

  },


  joinButtonPressed: {

    backgroundColor:
      "rgba(101, 255, 69, 0.10)",

    transform: [
      {
        scale: 0.97,
      },
    ],

  },


  // ====================================================
  // JOIN HINT
  // ====================================================

  joinHintContainer: {

    position: "absolute",

    top: "64%",

    left: 0,
    right: 0,

    alignItems: "center",

    zIndex: 8,

  },


  joinHint: {

    color:
      "rgba(255, 255, 255, 0.62)",

    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 2,

    textShadowColor:
      "rgba(0, 0, 0, 1)",

    textShadowOffset: {
      width: 0,
      height: 1,
    },

    textShadowRadius: 4,

  },

});