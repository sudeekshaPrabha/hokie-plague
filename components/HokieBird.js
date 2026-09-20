import React, { useRef, useState } from "react";

import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";


export default function HokieBird() {

  const [open, setOpen] = useState(false);

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hey Hokie! I'm the Hokie Doctor. Ask me anything about surviving the HokiePlague.",
    },
  ]);


  // =====================================================
  // DEMO QUESTIONS
  // =====================================================

  const demoQuestions = [
    "What are the bounds?",
    "Which direction should I head to have an advantage?",
    "What happens if I'm plagued?",
    "How often do safe zones appear?",
    "Is the Plaguer ever visible?",
  ];


  // =====================================================
  // DRAG ANIMATION
  // =====================================================

  const translateY = useRef(
    new Animated.Value(0)
  ).current;


  // =====================================================
  // OPEN CHAT
  // =====================================================

  const openChat = () => {

    translateY.setValue(0);

    setOpen(true);

  };


  // =====================================================
  // CLOSE CHAT
  // =====================================================

  const closeChat = () => {

    Keyboard.dismiss();


    Animated.timing(translateY, {
      toValue: 1000,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {

      setOpen(false);

      translateY.setValue(0);

    });

  };


  // =====================================================
  // DRAG DOWN TO CLOSE
  // =====================================================

  const panResponder = useRef(

    PanResponder.create({

      // Take control immediately when the user touches
      // the drag handle area
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {

        Keyboard.dismiss();

      },


      onPanResponderMove: (
        event,
        gestureState
      ) => {

        // Only allow downward movement
        if (gestureState.dy > 0) {

          translateY.setValue(
            gestureState.dy
          );

        }

      },


      onPanResponderRelease: (
        event,
        gestureState
      ) => {

        // Close if dragged down far enough
        // or flicked down quickly
        if (
          gestureState.dy > 90 ||
          gestureState.vy > 0.8
        ) {

          closeChat();

        } else {

          // Return chat to its original position
          Animated.spring(
            translateY,
            {
              toValue: 0,
              useNativeDriver: true,
              tension: 80,
              friction: 10,
            }
          ).start();

        }

      },


      onPanResponderTerminate: () => {

        Animated.spring(
          translateY,
          {
            toValue: 0,
            useNativeDriver: true,
          }
        ).start();

      },


      // Prevent another component from stealing
      // the drag gesture after it starts
      onPanResponderTerminationRequest:
        () => false,

    })

  ).current;


  // =====================================================
  // HOKIE DOCTOR ANSWERS
  // =====================================================

  const getAnswer = (input) => {

    const q = input.toLowerCase();


    // ===================================================
    // GAME BOUNDS
    // ===================================================

    if (
      q.includes("bounds") ||
      q.includes("boundary") ||
      q.includes("boundaries")
    ) {

      return (
        "The game is played within the designated Drillfield game area. " +
        "Stay inside the marked game boundaries throughout the round."
      );

    }


    // ===================================================
    // DIRECTION / ADVANTAGE
    // ===================================================

    if (
    q.includes("direction") ||
    q.includes("which way") ||
    q.includes("where should i go") ||
    q.includes("advantage")
    ) {

    return (
        "Think strategically: Survivors should prioritize distance from suspicious " +
        "players and move toward populated areas where they're harder to isolate. " +
        "Plaguers should head toward clusters of Survivors to maximize their chances " +
        "of catching someone."
    );

    }


    // ===================================================
    // PLAGUED / INFECTED
    // ===================================================

    if (
      q.includes("plagued") ||
      q.includes("infected") ||
      q.includes("caught")
    ) {

      return (
        "If you're plagued, you're removed from active play for that round. " +
        "You'll be sent back to the Join Game screen, where you can wait " +
        "for another round to begin."
      );

    }


    // ===================================================
    // SAFE ZONE FREQUENCY
    // ===================================================

    if (
      q.includes("how often") ||
      q.includes("safe zones appear") ||
      q.includes("safe zone appear") ||
      q.includes("when do safe zones")
    ) {

      return (
        "Safe zones appear approximately every 15 minutes. " +
        "Green zones temporarily protect Survivors from being caught. " +
        "When a green zone starts flashing, it is about to disappear."
      );

    }


    // ===================================================
    // IS PLAGUER VISIBLE?
    // ===================================================

    if (
      q.includes("plaguer ever visible") ||
      q.includes("see the plaguer") ||
      q.includes("plaguer visible")
    ) {

      return (
        "Survivors do not see the Plaguer's exact location on the map. " +
        "Instead, watch for clues such as red infection zones. " +
        "A red zone means a Plaguer recently infected a Survivor " +
        "somewhere inside that area."
      );

    }


    // ===================================================
    // GREEN SAFE ZONES
    // ===================================================

    if (
      q.includes("green") ||
      q.includes("safe zone")
    ) {

      return (
        "Green zones are temporary safe areas for Survivors. " +
        "While you're inside one, a Plaguer cannot catch you. " +
        "Safe zones appear about every 15 minutes. " +
        "When the green zone starts flashing, it is about to disappear."
      );

    }


    // ===================================================
    // RED ZONES
    // ===================================================

    if (
      q.includes("red") ||
      q.includes("red zone")
    ) {

      return (
        "A red zone appears after a Plaguer successfully infects a Survivor. " +
        "It reveals the general area where the infection happened, " +
        "but it does not reveal the exact location of the Plaguer."
      );

    }


    // ===================================================
    // SURVIVOR SCAN
    // ===================================================

    if (
      q.includes("scan") ||
      q.includes("reveal") ||
      q.includes("location")
    ) {

      return (
        "Survivor Scan is a special Plaguer ability. " +
        "A Plaguer can use it up to 5 times. Each scan reveals " +
        "the locations of all active Survivors for 10 seconds."
      );

    }


    // ===================================================
    // PLAGUER
    // ===================================================

    if (q.includes("plaguer")) {

      return (
        "Plaguers hunt Survivors and try to infect them before the round ends. " +
        "They also have 5 Survivor Scans that reveal active Survivor locations " +
        "for 10 seconds."
      );

    }


    // ===================================================
    // SURVIVOR
    // ===================================================

    if (
      q.includes("survivor") ||
      q.includes("student")
    ) {

      return (
        "Survivors need to stay uninfected during the round. " +
        "Keep moving, avoid Plaguers, and use green safe zones " +
        "for temporary protection."
      );

    }


    // ===================================================
    // FLASHING ZONE
    // ===================================================

    if (
      q.includes("flash") ||
      q.includes("flashing")
    ) {

      return (
        "When a green safe zone starts flashing, its protection " +
        "is about to end and the zone will disappear shortly. " +
        "Start moving before you're left exposed."
      );

    }


    // ===================================================
    // RULES
    // ===================================================

    if (q.includes("rules")) {

      return (
        "Check the Rules page for information about Plaguers, Survivors, " +
        "green safe zones, red infection zones, and Survivor Scans."
      );

    }


    // ===================================================
    // DEFAULT
    // ===================================================

    return (
      "The Hokie Doctor doesn't have an answer for that yet! " +
      "Try asking about Plaguers, Survivors, safe zones, red zones, " +
      "infections, bounds, or Survivor Scans."
    );

  };


  // =====================================================
  // SEND QUESTION
  // =====================================================

  const sendQuestion = (text) => {

    const userMessage = {
      sender: "user",
      text: text,
    };


    const botMessage = {
      sender: "bot",
      text: getAnswer(text),
    };


    setMessages((oldMessages) => [
      ...oldMessages,
      userMessage,
      botMessage,
    ]);

  };


  // =====================================================
  // SEND TYPED MESSAGE
  // =====================================================

  const sendMessage = () => {

    const trimmedQuestion =
      question.trim();


    if (!trimmedQuestion) {
      return;
    }


    sendQuestion(trimmedQuestion);

    setQuestion("");

  };


  return (

    <>

      {/* =================================================
          FLOATING HOKIE DOCTOR
      ================================================= */}

      <Pressable
        style={styles.assistantButton}
        onPress={openChat}
      >

        <Image
          source={require(
            "../assets/hokie-bird-ai.png"
          )}
          style={styles.birdImage}
          resizeMode="contain"
        />

      </Pressable>


      {/* =================================================
          CHAT WINDOW
      ================================================= */}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={closeChat}
      >

        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : "height"
          }
          keyboardVerticalOffset={0}
        >

          {/* Tap dark background to hide keyboard */}

          <Pressable
            style={styles.backgroundDismiss}
            onPress={Keyboard.dismiss}
          />


          <Animated.View
            style={[
              styles.chatBox,
              {
                transform: [
                  {
                    translateY: translateY,
                  },
                ],
              },
            ]}
          >


            {/* =============================================
                LARGE DRAG AREA
            ============================================= */}

            <View
              style={styles.dragArea}
              {...panResponder.panHandlers}
            >

              <View style={styles.dragHandle} />

              <Text style={styles.dragText}>
                SWIPE DOWN TO CLOSE
              </Text>

            </View>


            {/* =============================================
                HEADER
            ============================================= */}

            <View style={styles.header}>

              <View style={styles.headerLeft}>

                <Image
                  source={require(
                    "../assets/hokie-bird-ai.png"
                  )}
                  style={styles.headerBirdImage}
                  resizeMode="contain"
                />


                <View>

                  <Text style={styles.name}>
                    Hokie Doctor
                  </Text>

                  <Text style={styles.status}>
                    ● Online
                  </Text>

                </View>

              </View>


              <Pressable
                onPress={closeChat}
                hitSlop={15}
              >

                <Text style={styles.close}>
                  ×
                </Text>

              </Pressable>

            </View>


            {/* =============================================
                INTRO
            ============================================= */}

            <View style={styles.heroPanel}>

              <Image
                source={require(
                  "../assets/hokie-bird-ai.png"
                )}
                style={styles.heroImage}
                resizeMode="contain"
              />


              <View style={styles.heroTextContainer}>

                <Text style={styles.heroTitle}>
                  HOKIE DOCTOR
                </Text>

                <Text style={styles.heroText}>
                  Need help surviving the plague?
                  Ask me about roles, zones,
                  scans, or game rules.
                </Text>

              </View>

            </View>


            {/* =============================================
                DEMO QUESTIONS
            ============================================= */}

            <View style={styles.demoSection}>

              <Text style={styles.demoTitle}>
                TRY ASKING
              </Text>


              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={
                  styles.demoQuestionRow
                }
              >

                {demoQuestions.map(
                  (
                    demoQuestion,
                    index
                  ) => (

                    <Pressable
                      key={index}
                      style={({ pressed }) => [
                        styles.demoButton,

                        pressed &&
                          styles.demoButtonPressed,
                      ]}
                      onPress={() => {

                        Keyboard.dismiss();

                        sendQuestion(
                          demoQuestion
                        );

                      }}
                    >

                      <Text style={styles.demoButtonText}>
                        {demoQuestion}
                      </Text>

                    </Pressable>

                  )
                )}

              </ScrollView>

            </View>


            {/* =============================================
                MESSAGES
            ============================================= */}

            <ScrollView
              style={styles.messages}
              contentContainerStyle={
                styles.messageContent
              }
              showsVerticalScrollIndicator={false}

              keyboardShouldPersistTaps="handled"

              keyboardDismissMode={
                Platform.OS === "ios"
                  ? "interactive"
                  : "on-drag"
              }
            >

              {messages.map(
                (message, index) => (

                  <View
                    key={index}
                    style={[
                      styles.messageBubble,

                      message.sender === "user"
                        ? styles.userBubble
                        : styles.botBubble,
                    ]}
                  >

                    <Text style={styles.messageText}>
                      {message.text}
                    </Text>

                  </View>

                )
              )}

            </ScrollView>


            {/* =============================================
                INPUT
            ============================================= */}

            <View style={styles.inputArea}>

              <TextInput
                style={styles.input}

                value={question}

                onChangeText={setQuestion}

                placeholder="Ask the Hokie Doctor..."

                placeholderTextColor="#777777"

                returnKeyType="send"

                onSubmitEditing={sendMessage}
              />


              <Pressable
                style={styles.sendButton}
                onPress={sendMessage}
              >

                <Text style={styles.sendText}>
                  ↑
                </Text>

              </Pressable>

            </View>


          </Animated.View>

        </KeyboardAvoidingView>

      </Modal>

    </>

  );

}


const styles = StyleSheet.create({

  // ====================================================
  // FLOATING HOKIE DOCTOR
  // ====================================================

  assistantButton: {

    position: "absolute",

    right: 12,
    bottom: 24,

    width: 105,
    height: 105,

    justifyContent: "center",
    alignItems: "center",

    zIndex: 999,

    elevation: 20,

  },


  birdImage: {

    width: 100,
    height: 100,

  },


  // ====================================================
  // MODAL
  // ====================================================

  overlay: {

    flex: 1,

    justifyContent: "flex-end",

    backgroundColor:
      "rgba(0,0,0,0.65)",

  },


  backgroundDismiss: {

    ...StyleSheet.absoluteFillObject,

  },


  chatBox: {

    height: "82%",

    backgroundColor: "#151716",

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    overflow: "hidden",

    borderTopWidth: 2,
    borderTopColor: "#39FF14",

  },


  // ====================================================
  // DRAG HANDLE
  // ====================================================

  dragArea: {

    height: 42,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#202220",

  },


  dragHandle: {

    width: 52,
    height: 5,

    borderRadius: 3,

    backgroundColor: "#777777",

    marginBottom: 4,

  },


  dragText: {

    color: "#707070",

    fontSize: 8,

    fontWeight: "700",

    letterSpacing: 1.5,

  },


  // ====================================================
  // HEADER
  // ====================================================

  header: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingHorizontal: 20,

    paddingBottom: 14,

    backgroundColor: "#202220",

    borderBottomWidth: 1,

    borderBottomColor: "#333333",

  },


  headerLeft: {

    flexDirection: "row",

    alignItems: "center",

  },


  headerBirdImage: {

    width: 55,
    height: 55,

    marginRight: 12,

  },


  name: {

    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "900",

  },


  status: {

    marginTop: 2,

    color: "#39FF14",

    fontSize: 11,

  },


  close: {

    color: "#FFFFFF",

    fontSize: 32,

  },


  // ====================================================
  // HERO
  // ====================================================

  heroPanel: {

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 18,
    paddingVertical: 10,

    backgroundColor: "#181A19",

    borderBottomWidth: 1,

    borderBottomColor: "#2D322E",

  },


  heroImage: {

    width: 75,
    height: 75,

    marginRight: 14,

  },


  heroTextContainer: {

    flex: 1,

  },


  heroTitle: {

    color: "#65FF45",

    fontWeight: "900",

    fontSize: 13,

    letterSpacing: 2,

    marginBottom: 5,

  },


  heroText: {

    color: "#C7C7C7",

    fontSize: 12,

    lineHeight: 17,

  },


  // ====================================================
  // DEMO QUESTIONS
  // ====================================================

  demoSection: {

    paddingTop: 12,

    paddingBottom: 10,

    backgroundColor: "#181A19",

    borderBottomWidth: 1,

    borderBottomColor: "#2D322E",

  },


  demoTitle: {

    paddingHorizontal: 16,

    marginBottom: 9,

    fontSize: 10,

    fontWeight: "900",

    letterSpacing: 2,

    color: "#65FF45",

  },


  demoQuestionRow: {

    paddingHorizontal: 14,

    paddingRight: 25,

  },


  demoButton: {

    marginRight: 9,

    paddingHorizontal: 13,
    paddingVertical: 9,

    borderRadius: 18,

    backgroundColor: "#242725",

    borderWidth: 1,

    borderColor: "#3B433C",

  },


  demoButtonPressed: {

    backgroundColor: "#303730",

    borderColor: "#65FF45",

  },


  demoButtonText: {

    color: "#E0E0E0",

    fontSize: 12,

    fontWeight: "600",

  },


  // ====================================================
  // MESSAGES
  // ====================================================

  messages: {

    flex: 1,

  },


  messageContent: {

    padding: 16,

  },


  messageBubble: {

    maxWidth: "82%",

    paddingHorizontal: 14,
    paddingVertical: 11,

    borderRadius: 15,

    marginBottom: 12,

  },


  botBubble: {

    alignSelf: "flex-start",

    backgroundColor: "#292C2A",

  },


  userBubble: {

    alignSelf: "flex-end",

    backgroundColor: "#861F41",

  },


  messageText: {

    color: "#FFFFFF",

    fontSize: 14,

    lineHeight: 20,

  },


  // ====================================================
  // INPUT
  // ====================================================

  inputArea: {

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 14,

    paddingTop: 12,

    paddingBottom:
      Platform.OS === "ios"
        ? 18
        : 12,

    backgroundColor: "#202220",

    borderTopWidth: 1,

    borderTopColor: "#333333",

  },


  input: {

    flex: 1,

    height: 46,

    backgroundColor: "#2C2F2D",

    borderRadius: 23,

    paddingHorizontal: 15,

    color: "#FFFFFF",

    fontSize: 14,

  },


  sendButton: {

    width: 44,
    height: 44,

    marginLeft: 9,

    borderRadius: 22,

    backgroundColor: "#39FF14",

    justifyContent: "center",
    alignItems: "center",

  },


  sendText: {

    color: "#111111",

    fontSize: 22,

    fontWeight: "900",

  },

});