import React, { useState } from "react";

import {
  Image,
  Modal,
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
      text: "Hey Hokie! I’m your HokiePlague guide. Ask me anything about the game.",
    },
  ]);

  const getAnswer = (input) => {
    const q = input.toLowerCase();

    if (q.includes("green") || q.includes("safe zone")) {
      return (
        "Green zones are temporary safe areas for Survivors. While inside, Survivors cannot be infected. If the zone starts flashing, it is about to disappear."
      );
    }

    if (q.includes("red") || q.includes("red zone")) {
      return (
        "A red zone appears after a Plaguer infects a Survivor. It shows the general area where the infection happened, but not the exact location."
      );
    }

    if (
      q.includes("scan") ||
      q.includes("reveal") ||
      q.includes("location")
    ) {
      return (
        "Plaguers have 5 Survivor Scans. Each scan reveals the locations of all active Survivors for 10 seconds."
      );
    }

    if (q.includes("plaguer")) {
      return (
        "Plaguers hunt Survivors and try to infect them before the round ends. They also have 5 Survivor Scans to help locate players."
      );
    }

    if (q.includes("survivor") || q.includes("student")) {
      return (
        "Survivors need to avoid Plaguers and stay uninfected. Use green safe zones for temporary protection and keep moving."
      );
    }

    if (q.includes("infected") || q.includes("caught")) {
      return (
        "If a Survivor is infected, they are removed from active play for that round and become a spectator."
      );
    }

    if (q.includes("rules")) {
      return (
        "You can check the Rules screen for full gameplay instructions, role details, safe zones, red zones, and Plaguer scan information."
      );
    }

    return (
      "I’m still learning! Try asking me about Survivors, Plaguers, green zones, red zones, infections, or Survivor Scans."
    );
  };

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

    setMessages((oldMessages) => [
      ...oldMessages,
      userMessage,
      botMessage,
    ]);

    setQuestion("");
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <Pressable
        style={styles.assistantButton}
        onPress={() => setOpen(true)}
      >
        <Image
          source={require("../assets/hokie-bird-ai.png")}
          style={styles.birdImage}
          resizeMode="contain"
        />

        <View style={styles.onlineDot} />
      </Pressable>

      {/* CHAT MODAL */}
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.chatBox}>
            {/* HEADER */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.headerImageWrap}>
                  <Image
                    source={require("../assets/hokie-bird-ai.png")}
                    style={styles.headerBirdImage}
                    resizeMode="contain"
                  />
                </View>

                <View>
                  <Text style={styles.name}>Hokie Helper</Text>
                  <Text style={styles.status}>● Online</Text>
                </View>
              </View>

              <Pressable onPress={() => setOpen(false)}>
                <Text style={styles.close}>×</Text>
              </Pressable>
            </View>

            {/* OPTIONAL INTRO PANEL */}
            <View style={styles.heroPanel}>
              <Image
                source={require("../assets/hokie-bird-ai.png")}
                style={styles.heroImage}
                resizeMode="contain"
              />
              <Text style={styles.heroText}>
                Ask me about zones, roles, scans, or how to survive the plague.
              </Text>
            </View>

            {/* MESSAGES */}
            <ScrollView
              style={styles.messages}
              contentContainerStyle={styles.messageContent}
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
                  <Text style={styles.messageText}>{message.text}</Text>
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
                <Text style={styles.sendText}>↑</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  assistantButton: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#861F41",
    borderWidth: 2,
    borderColor: "#39FF14",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 20,
    shadowColor: "#39FF14",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  birdImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },

  onlineDot: {
    position: "absolute",
    right: 2,
    bottom: 3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#39FF14",
    borderWidth: 2,
    borderColor: "#111111",
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  chatBox: {
    height: "78%",
    backgroundColor: "#151716",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    borderTopWidth: 2,
    borderColor: "#39FF14",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#202220",
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerImageWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#861F41",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    overflow: "hidden",
  },

  headerBirdImage: {
    width: 40,
    height: 40,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 17,
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

  heroPanel: {
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 8,
    paddingHorizontal: 18,
    backgroundColor: "#181A19",
    borderBottomWidth: 1,
    borderBottomColor: "#2D322E",
  },

  heroImage: {
    width: 95,
    height: 95,
    marginBottom: 8,
  },

  heroText: {
    textAlign: "center",
    color: "#C7C7C7",
    fontSize: 13,
    lineHeight: 18,
  },

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

  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
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