import React, { useState } from "react";

import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";


export default function HokieAssistant() {

  const [open, setOpen] = useState(false);

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hey Hokie! I’m your HokiePlague guide. Ask me anything about the game.",
    },
  ]);


  // =====================================================
  // TEMPORARY LOCAL GAME-RULE ASSISTANT
  // =====================================================

  const getAnswer = (input) => {

    const q = input.toLowerCase();


    if (
      q.includes("green") ||
      q.includes("safe zone")
    ) {
      return (
        "Green zones are temporary safe areas for Survivors. " +
        "While inside, Survivors cannot be infected. " +
        "If the zone starts flashing, it is about to disappear!"
      );
    }


    if (
      q.includes("red") ||
      q.includes("red zone")
    ) {
      return (
        "A red zone appears after a Plaguer infects a Survivor. " +
        "It shows the general area where the infection happened, " +
        "but not the exact location."
      );
    }


    if (
      q.includes("scan") ||
      q.includes("reveal")
    ) {
      return (
        "Plaguers have 5 Survivor Scans. Each scan reveals the " +
        "locations of all active Survivors for 10 seconds."
      );
    }


    if (
      q.includes("plaguer") ||
      q.includes("infect")
    ) {
      return (
        "Plaguers hunt Survivors and try to infect them before " +
        "the round ends. They also have 5 Survivor Scans to help " +
        "locate players."
      );
    }


    if (
      q.includes("survivor") ||
      q.includes("student")
    ) {
      return (
        "Survivors need to avoid Plaguers and stay uninfected. " +
        "Use green safe zones for temporary protection and keep moving!"
      );
    }


    if (
      q.includes("caught") ||
      q.includes("infected")
    ) {
      return (
        "If a Survivor is infected, they are removed from active play " +
        "for that round and become a spectator."
      );
    }


    return (
      "I’m not sure about that one yet! Try asking me about Plaguers, " +
      "Survivors, scans, green zones, red zones, or infections."
    );

  };


  // =====================================================
  // SEND QUESTION
  // =====================================================

  const sendMessage = () => {

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }


    const userMessage = {
      sender: "user",
      text: trimmedQuestion,
    };


    const botMessage = {
      sender: "bot",
      text: getAnswer(trimmedQuestion),
    };


    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      botMessage,
    ]);


    setQuestion("");

  };


  return (

    <>

      {/* =================================================
          FLOATING HOKIE BUTTON
      ================================================= */}

      <Pressable
        style={styles.assistantButton}
        onPress={() => setOpen(true)}
      >

        {/* Temporary mascot */}
        <Text style={styles.birdEmoji}>
          🦃
        </Text>

        <View style={styles.onlineDot} />

      </Pressable>


      {/* =================================================
          CHAT WINDOW
      ================================================= */}

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >

        <View style={styles.modalBackground}>

          <View style={styles.chatBox}>


            {/* HEADER */}

            <View style={styles.header}>

              <View style={styles.headerLeft}>

                <View style={styles.smallMascot}>
                  <Text style={styles.smallBird}>
                    🦃
                  </Text>
                </View>


                <View>

                  <Text style={styles.assistantName}>
                    Hokie Helper
                  </Text>

                  <Text style={styles.status}>
                    ● Online
                  </Text>

                </View>

              </View>


              <Pressable
                onPress={() => setOpen(false)}
              >

                <Text style={styles.closeButton}>
                  ×
                </Text>

              </Pressable>

            </View>


            {/* CHAT */}

            <ScrollView
              style={styles.messages}
              contentContainerStyle={styles.messagesContent}
            >

              {messages.map((message, index) => (

                <View
                  key={index}
                  style={[
                    styles.messageBubble,

                    message.sender === "user"
                      ? styles.userBubble
                      : styles.botBubble,
                  ]}
                >

                  <Text
                    style={[
                      styles.messageText,

                      message.sender === "user"
                        ? styles.userText
                        : styles.botText,
                    ]}
                  >

                    {message.text}

                  </Text>

                </View>

              ))}

            </ScrollView>


            {/* INPUT */}

            <View style={styles.inputArea}>

              <TextInput
                style={styles.input}
                value={question}
                onChangeText={setQuestion}
                placeholder="Ask about the game..."
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


          </View>

        </View>

      </Modal>

    </>

  );
}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  assistantButton: {

    position: "absolute",

    right: 20,
    bottom: 30,

    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: "#861F41",

    borderWidth: 2,
    borderColor: "#39FF14",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 100,

    shadowColor: "#39FF14",
    shadowOpacity: 0.7,
    shadowRadius: 10,

  },


  birdEmoji: {
    fontSize: 34,
  },


  onlineDot: {

    position: "absolute",

    right: 2,
    bottom: 3,

    width: 13,
    height: 13,

    borderRadius: 7,

    backgroundColor: "#39FF14",

    borderWidth: 2,
    borderColor: "#111111",

  },


  modalBackground: {

    flex: 1,

    justifyContent: "flex-end",

    backgroundColor: "rgba(0,0,0,0.55)",

  },


  chatBox: {

    height: "70%",

    backgroundColor: "#151716",

    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,

    overflow: "hidden",

    borderTopWidth: 1,
    borderColor: "#39FF14",

  },


  header: {

    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingVertical: 16,

    backgroundColor: "#1D201E",

    borderBottomWidth: 1,
    borderBottomColor: "#303530",

  },


  headerLeft: {

    flexDirection: "row",
    alignItems: "center",

  },


  smallMascot: {

    width: 43,
    height: 43,

    borderRadius: 22,

    backgroundColor: "#861F41",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,

  },


  smallBird: {
    fontSize: 25,
  },


  assistantName: {

    color: "#FFFFFF",

    fontSize: 17,
    fontWeight: "900",

  },


  status: {

    marginTop: 2,

    color: "#39FF14",

    fontSize: 11,

  },


  closeButton: {

    color: "#AAAAAA",

    fontSize: 32,
    fontWeight: "300",

  },


  messages: {
    flex: 1,
  },


  messagesContent: {

    paddingHorizontal: 16,
    paddingVertical: 20,

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

    backgroundColor: "#232624",

    borderWidth: 1,
    borderColor: "#343A35",

  },


  userBubble: {

    alignSelf: "flex-end",

    backgroundColor: "#861F41",

  },


  messageText: {

    fontSize: 14,
    lineHeight: 20,

  },


  botText: {
    color: "#E0E0E0",
  },


  userText: {
    color: "#FFFFFF",
  },


  inputArea: {

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 15,
    paddingVertical: 12,

    borderTopWidth: 1,
    borderTopColor: "#303530",

    backgroundColor: "#1D201E",

  },


  input: {

    flex: 1,

    height: 46,

    paddingHorizontal: 15,

    borderRadius: 23,

    backgroundColor: "#292D2A",

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

    color: "#101210",

    fontSize: 23,
    fontWeight: "900",

  },

});