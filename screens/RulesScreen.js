import React, { useState } from "react";

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { StatusBar } from "expo-status-bar";


export default function RulesScreen({
  onBack,
  onContinue,
}) {

  const [openRole, setOpenRole] = useState(null);


  const toggleRole = (role) => {

    if (openRole === role) {
      setOpenRole(null);
    } else {
      setOpenRole(role);
    }

  };


  return (

    <SafeAreaView style={styles.safeArea}>

      <StatusBar style="light" />


      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >


        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>

          <Text style={styles.virusText}>
            VIRUS
          </Text>

          <Text style={styles.title}>
            HOW TO PLAY
          </Text>

          <Text style={styles.subtitle}>
            Learn the rules before the plague begins.
          </Text>

        </View>


        {/* =================================================
            GAME FLOW
        ================================================= */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            GAME FLOW
          </Text>


          <View style={styles.stepRow}>

            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>
                1
              </Text>
            </View>

            <View style={styles.stepTextContainer}>

              <Text style={styles.stepTitle}>
                Get Your Role
              </Text>

              <Text style={styles.stepDescription}>
                Each player is secretly assigned as either
                a Plaguer or Survivor.
              </Text>

            </View>

          </View>


          <View style={styles.connector} />


          <View style={styles.stepRow}>

            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>
                2
              </Text>
            </View>

            <View style={styles.stepTextContainer}>

              <Text style={styles.stepTitle}>
                Spread Out
              </Text>

              <Text style={styles.stepDescription}>
                Survivors spread across the play area before
                the hunting phase begins.
              </Text>

            </View>

          </View>


          <View style={styles.connector} />


          <View style={styles.stepRow}>

            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>
                3
              </Text>
            </View>

            <View style={styles.stepTextContainer}>

              <Text style={styles.stepTitle}>
                Survive the Round
              </Text>

              <Text style={styles.stepDescription}>
                Plaguers hunt while Survivors avoid infection
                and use safe zones to stay alive.
              </Text>

            </View>

          </View>

        </View>


        {/* =================================================
            ROLES
        ================================================= */}

        <View style={styles.rolesSection}>

          <Text style={styles.sectionTitle}>
            KNOW YOUR ROLE
          </Text>

          <Text style={styles.tapHint}>
            Tap a role to learn more.
          </Text>


          {/* =================================================
              PLAGUER
          ================================================= */}

          <Pressable
            style={[
              styles.roleCard,
              openRole === "plaguer" &&
                styles.roleCardActive,
            ]}
            onPress={() => toggleRole("plaguer")}
          >

            <View style={styles.roleHeader}>

              <View>

                <Text style={styles.roleLabel}>
                  INFECTED
                </Text>

                <Text style={styles.roleName}>
                  PLAGUER
                </Text>

              </View>


              <View style={styles.roleRight}>

                <View style={styles.plaguerDot} />

                <Text style={styles.arrow}>
                  {openRole === "plaguer"
                    ? "−"
                    : "+"}
                </Text>

              </View>

            </View>


            <Text style={styles.rolePreview}>
              Hunt Survivors and spread the HokiePlague.
            </Text>


            {openRole === "plaguer" && (

              <View style={styles.roleDetails}>

                <View style={styles.divider} />


                <RuleItem
                  title="YOUR GOAL"
                  text="Infect as many Survivors as possible before the round ends."
                />


                <RuleItem
                  title="HUNT"
                  text="Move throughout the game area and use the information on your screen to track down Survivors."
                />


                <RuleItem
                  title="INFECT"
                  text="When you get close enough to a Survivor, you can infect them and remove them from active play."
                />


                <RuleItem
                  title="SURVIVOR SCAN"
                  text="Plaguers have a special tracking tool that reveals the locations of all active Survivors for 10 seconds."
                />


                <RuleItem
                  title="5 SCAN ATTEMPTS"
                  text="You can use the Survivor Scan up to 5 times during the game, so choose carefully when to activate it."
                />


                <RuleItem
                  title="WATCH THE SAFE ZONES"
                  text="Survivors inside an active green safe zone cannot be infected. You may have to wait for them to leave."
                />


                <View style={styles.roleTip}>

                  <Text style={styles.roleTipLabel}>
                    PLAGUER TIP
                  </Text>

                  <Text style={styles.roleTipText}>
                    Use your scans strategically. Don't waste
                    all 5 early in the game.
                  </Text>

                </View>

              </View>

            )}

          </Pressable>


          {/* =================================================
              SURVIVOR
          ================================================= */}

          <Pressable
            style={[
              styles.roleCard,
              openRole === "survivor" &&
                styles.roleCardActive,
            ]}
            onPress={() => toggleRole("survivor")}
          >

            <View style={styles.roleHeader}>

              <View>

                <Text style={styles.roleLabel}>
                  STUDENT
                </Text>

                <Text style={styles.roleName}>
                  SURVIVOR
                </Text>

              </View>


              <View style={styles.roleRight}>

                <View style={styles.survivorDot} />

                <Text style={styles.arrow}>
                  {openRole === "survivor"
                    ? "−"
                    : "+"}
                </Text>

              </View>

            </View>


            <Text style={styles.rolePreview}>
              Stay alive, use safe zones, and avoid the
              Plaguers.
            </Text>


            {openRole === "survivor" && (

              <View style={styles.roleDetails}>

                <View style={styles.divider} />


                <RuleItem
                  title="YOUR GOAL"
                  text="Stay uninfected until the round ends."
                />


                <RuleItem
                  title="KEEP MOVING"
                  text="Create distance between yourself and anyone you think may be a Plaguer."
                />


                <RuleItem
                  title="USE GREEN SAFE ZONES"
                  text="Green zones temporarily protect Survivors from being infected."
                />


                <RuleItem
                  title="WATCH FOR FLASHING"
                  text="When a green safe zone starts flashing, it is about to disappear. Be ready to move."
                />


                <RuleItem
                  title="IF YOU'RE CAUGHT"
                  text="Once infected, you are removed from active play for that round and become a spectator."
                />


                <View style={styles.roleTip}>

                  <Text style={styles.roleTipLabel}>
                    SURVIVOR TIP
                  </Text>

                  <Text style={styles.roleTipText}>
                    Don't wait until a safe zone disappears
                    before deciding where to run next.
                  </Text>

                </View>

              </View>

            )}

          </Pressable>

        </View>


        {/* =================================================
            SAFE ZONES
        ================================================= */}

        <View style={styles.safeZoneSection}>

          <Text style={styles.sectionTitle}>
            MAP ZONES
          </Text>

          <Text style={styles.safeZoneIntro}>
            Colored zones on the map give important
            information during the round.
          </Text>


          {/* GREEN ZONE */}

          <View style={styles.greenZoneCard}>

            <View style={styles.zoneHeader}>

              <View style={styles.greenZoneCircle} />

              <View style={styles.zoneTitleContainer}>

                <Text style={styles.greenZoneTitle}>
                  GREEN ZONE
                </Text>

                <Text style={styles.zoneSubtitle}>
                  Survivor Safe Zone
                </Text>

              </View>

            </View>


            <Text style={styles.zoneDescription}>
              Green zones are temporary safe areas where
              Survivors cannot be caught or infected by a
              Plaguer.
            </Text>


            <View style={styles.zoneRule}>

              <Text style={styles.zoneRuleTitle}>
                TEMPORARY PROTECTION
              </Text>

              <Text style={styles.zoneRuleText}>
                Survivors inside the green area are protected
                for a short period of time.
              </Text>

            </View>


            <View style={styles.zoneRule}>

              <Text style={styles.zoneRuleTitle}>
                FLASHING = LEAVE SOON
              </Text>

              <Text style={styles.zoneRuleText}>
                When the green zone starts flashing, its
                protection is almost over and the zone will
                disappear shortly afterward.
              </Text>

            </View>

          </View>


          {/* RED ZONE */}

          <View style={styles.redZoneCard}>

            <View style={styles.zoneHeader}>

              <View style={styles.redZoneCircle} />

              <View style={styles.zoneTitleContainer}>

                <Text style={styles.redZoneTitle}>
                  RED ZONE
                </Text>

                <Text style={styles.zoneSubtitle}>
                  Infection Alert
                </Text>

              </View>

            </View>


            <Text style={styles.zoneDescription}>
              A red zone appears after a Plaguer successfully
              infects a Survivor.
            </Text>


            <View style={styles.zoneRule}>

              <Text style={styles.redRuleTitle}>
                INFECTION DETECTED
              </Text>

              <Text style={styles.zoneRuleText}>
                The red zone tells players that a Plaguer
                infected a Survivor somewhere inside that
                highlighted area.
              </Text>

            </View>


            <View style={styles.zoneRule}>

              <Text style={styles.redRuleTitle}>
                GENERAL LOCATION ONLY
              </Text>

              <Text style={styles.zoneRuleText}>
                The exact location of the Plaguer is not
                revealed. The red area only shows the general
                area where the infection happened.
              </Text>

            </View>

          </View>

        </View>


        {/* =================================================
            ROUND RULES
        ================================================= */}

        <View style={styles.roundCard}>

          <Text style={styles.sectionTitle}>
            ROUND RULES
          </Text>


          <View style={styles.roundRow}>

            <Text style={styles.roundIcon}>
              01
            </Text>

            <Text style={styles.roundText}>
              Players receive a secret role before gameplay
              begins.
            </Text>

          </View>


          <View style={styles.roundRow}>

            <Text style={styles.roundIcon}>
              02
            </Text>

            <Text style={styles.roundText}>
              Survivors spread out before the hunting phase
              starts.
            </Text>

          </View>


          <View style={styles.roundRow}>

            <Text style={styles.roundIcon}>
              03
            </Text>

            <Text style={styles.roundText}>
              Green zones provide temporary protection while
              red zones indicate where an infection recently
              occurred.
            </Text>

          </View>


          <View style={styles.roundRow}>

            <Text style={styles.roundIcon}>
              04
            </Text>

            <Text style={styles.roundText}>
              Plaguers can use their Survivor Scan up to
              5 times to reveal active Survivors for
              10 seconds.
            </Text>

          </View>


          <View style={styles.roundRow}>

            <Text style={styles.roundIcon}>
              05
            </Text>

            <Text style={styles.roundText}>
              Stay inside the game boundaries and always be
              aware of your surroundings while moving.
            </Text>

          </View>

        </View>


        {/* =================================================
            BUTTONS
        ================================================= */}

        {onContinue && (

          <Pressable
            style={({ pressed }) => [
              styles.continueButton,
              pressed &&
                styles.continueButtonPressed,
            ]}
            onPress={onContinue}
          >

            <Text style={styles.continueText}>
              I'M READY
            </Text>

          </Pressable>

        )}


        {onBack && (

          <Pressable
            style={styles.backButton}
            onPress={onBack}
          >

            <Text style={styles.backText}>
              BACK
            </Text>

          </Pressable>

        )}


      </ScrollView>

    </SafeAreaView>

  );
}


// ======================================================
// REUSABLE RULE ITEM
// ======================================================

function RuleItem({
  title,
  text,
}) {

  return (

    <View style={styles.ruleItem}>

      <View style={styles.ruleBullet} />

      <View style={styles.ruleTextContainer}>

        <Text style={styles.ruleTitle}>
          {title}
        </Text>

        <Text style={styles.ruleText}>
          {text}
        </Text>

      </View>

    </View>

  );
}


// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,

    backgroundColor: "#111312",
  },


  screen: {
    flex: 1,

    backgroundColor: "#111312",
  },


  content: {
    paddingHorizontal: 22,

    paddingTop: 24,

    paddingBottom: 60,
  },


  // ====================================================
  // HEADER
  // ====================================================

  header: {
    alignItems: "center",

    marginBottom: 35,
  },


  virusText: {
    fontSize: 15,

    fontWeight: "900",

    letterSpacing: 6,

    color: "#65FF45",
  },


  title: {
    marginTop: 10,

    fontSize: 32,

    fontWeight: "900",

    letterSpacing: 2,

    color: "#FFFFFF",

    textAlign: "center",
  },


  subtitle: {
    marginTop: 8,

    fontSize: 14,

    color: "#999999",

    textAlign: "center",
  },


  // ====================================================
  // SECTION TITLES
  // ====================================================

  section: {
    marginBottom: 35,
  },


  sectionTitle: {
    fontSize: 13,

    fontWeight: "800",

    letterSpacing: 3,

    color: "#65FF45",
  },


  // ====================================================
  // GAME FLOW
  // ====================================================

  stepRow: {
    flexDirection: "row",

    marginTop: 20,

    alignItems: "flex-start",
  },


  stepNumber: {
    width: 34,

    height: 34,

    borderRadius: 17,

    borderWidth: 1,

    borderColor: "#39FF14",

    alignItems: "center",

    justifyContent: "center",

    marginRight: 14,
  },


  stepNumberText: {
    color: "#65FF45",

    fontWeight: "800",
  },


  stepTextContainer: {
    flex: 1,
  },


  stepTitle: {
    fontSize: 16,

    fontWeight: "800",

    color: "#FFFFFF",
  },


  stepDescription: {
    marginTop: 4,

    fontSize: 14,

    lineHeight: 20,

    color: "#AAAAAA",
  },


  connector: {
    marginLeft: 16,

    width: 1,

    height: 18,

    backgroundColor: "#304030",
  },


  // ====================================================
  // ROLES
  // ====================================================

  rolesSection: {
    marginBottom: 35,
  },


  tapHint: {
    marginTop: 6,

    marginBottom: 15,

    color: "#777777",

    fontSize: 13,
  },


  roleCard: {
    backgroundColor: "#191C1A",

    borderWidth: 1,

    borderColor: "#303530",

    borderRadius: 16,

    padding: 20,

    marginBottom: 14,
  },


  roleCardActive: {
    borderColor: "#39FF14",
  },


  roleHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },


  roleLabel: {
    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 2,

    color: "#777777",
  },


  roleName: {
    marginTop: 3,

    fontSize: 23,

    fontWeight: "900",

    letterSpacing: 2,

    color: "#FFFFFF",
  },


  roleRight: {
    flexDirection: "row",

    alignItems: "center",
  },


  plaguerDot: {
    width: 11,

    height: 11,

    borderRadius: 6,

    marginRight: 14,

    backgroundColor: "#65FF45",

    shadowColor: "#39FF14",

    shadowOpacity: 1,

    shadowRadius: 8,
  },


  survivorDot: {
    width: 11,

    height: 11,

    borderRadius: 6,

    marginRight: 14,

    backgroundColor: "#FFFFFF",
  },


  arrow: {
    width: 25,

    textAlign: "center",

    fontSize: 26,

    fontWeight: "300",

    color: "#65FF45",
  },


  rolePreview: {
    marginTop: 12,

    color: "#A0A0A0",

    fontSize: 14,

    lineHeight: 20,
  },


  roleDetails: {
    marginTop: 6,
  },


  divider: {
    height: 1,

    backgroundColor: "#303530",

    marginVertical: 18,
  },


  ruleItem: {
    flexDirection: "row",

    marginBottom: 18,
  },


  ruleBullet: {
    width: 7,

    height: 7,

    borderRadius: 4,

    marginTop: 6,

    marginRight: 12,

    backgroundColor: "#65FF45",
  },


  ruleTextContainer: {
    flex: 1,
  },


  ruleTitle: {
    fontSize: 12,

    fontWeight: "900",

    letterSpacing: 1.5,

    color: "#FFFFFF",
  },


  ruleText: {
    marginTop: 4,

    fontSize: 13,

    lineHeight: 19,

    color: "#A0A0A0",
  },


  roleTip: {
    marginTop: 3,

    padding: 14,

    borderRadius: 10,

    backgroundColor: "#132015",

    borderLeftWidth: 3,

    borderLeftColor: "#39FF14",
  },


  roleTipLabel: {
    fontSize: 10,

    fontWeight: "900",

    letterSpacing: 2,

    color: "#65FF45",
  },


  roleTipText: {
    marginTop: 5,

    color: "#C5C5C5",

    lineHeight: 18,

    fontSize: 13,
  },


  // ====================================================
  // MAP ZONES
  // ====================================================

  safeZoneSection: {
    marginBottom: 35,
  },


  safeZoneIntro: {
    marginTop: 7,

    marginBottom: 15,

    fontSize: 13,

    lineHeight: 19,

    color: "#888888",
  },


  greenZoneCard: {
    padding: 20,

    marginBottom: 14,

    borderRadius: 16,

    backgroundColor: "#151F17",

    borderWidth: 1,

    borderColor: "#39FF14",
  },


  greenZoneCircle: {
    width: 42,

    height: 42,

    borderRadius: 21,

    marginRight: 14,

    backgroundColor:
      "rgba(57, 255, 20, 0.18)",

    borderWidth: 3,

    borderColor: "#39FF14",

    shadowColor: "#39FF14",

    shadowOpacity: 0.8,

    shadowRadius: 8,
  },


  greenZoneTitle: {
    fontSize: 18,

    fontWeight: "900",

    letterSpacing: 2,

    color: "#65FF45",
  },


  redZoneCard: {
    padding: 20,

    borderRadius: 16,

    backgroundColor: "#211515",

    borderWidth: 1,

    borderColor: "#FF4545",
  },


  redZoneCircle: {
    width: 42,

    height: 42,

    borderRadius: 21,

    marginRight: 14,

    backgroundColor:
      "rgba(255, 69, 69, 0.16)",

    borderWidth: 3,

    borderColor: "#FF4545",

    shadowColor: "#FF4545",

    shadowOpacity: 0.8,

    shadowRadius: 8,
  },


  redZoneTitle: {
    fontSize: 18,

    fontWeight: "900",

    letterSpacing: 2,

    color: "#FF5C5C",
  },


  zoneHeader: {
    flexDirection: "row",

    alignItems: "center",
  },


  zoneTitleContainer: {
    flex: 1,
  },


  zoneSubtitle: {
    marginTop: 3,

    fontSize: 12,

    color: "#888888",
  },


  zoneDescription: {
    marginTop: 17,

    fontSize: 14,

    lineHeight: 20,

    color: "#C0C0C0",
  },


  zoneRule: {
    marginTop: 17,

    paddingTop: 14,

    borderTopWidth: 1,

    borderTopColor: "#353535",
  },


  zoneRuleTitle: {
    fontSize: 11,

    fontWeight: "900",

    letterSpacing: 1.5,

    color: "#65FF45",
  },


  redRuleTitle: {
    fontSize: 11,

    fontWeight: "900",

    letterSpacing: 1.5,

    color: "#FF5C5C",
  },


  zoneRuleText: {
    marginTop: 5,

    fontSize: 13,

    lineHeight: 19,

    color: "#A5A5A5",
  },


  // ====================================================
  // ROUND RULES
  // ====================================================

  roundCard: {
    marginBottom: 30,

    padding: 20,

    borderRadius: 16,

    backgroundColor: "#191C1A",

    borderWidth: 1,

    borderColor: "#303530",
  },


  roundRow: {
    flexDirection: "row",

    alignItems: "flex-start",

    marginTop: 18,
  },


  roundIcon: {
    width: 32,

    color: "#65FF45",

    fontWeight: "900",

    fontSize: 12,
  },


  roundText: {
    flex: 1,

    color: "#B0B0B0",

    fontSize: 14,

    lineHeight: 20,
  },


  // ====================================================
  // BUTTONS
  // ====================================================

  continueButton: {
    marginTop: 5,

    backgroundColor: "#65FF45",

    paddingVertical: 16,

    borderRadius: 12,

    alignItems: "center",
  },


  continueButtonPressed: {
    opacity: 0.75,
  },


  continueText: {
    color: "#101210",

    fontWeight: "900",

    fontSize: 15,

    letterSpacing: 2,
  },


  backButton: {
    marginTop: 16,

    alignItems: "center",

    paddingVertical: 12,
  },


  backText: {
    color: "#777777",

    fontSize: 13,

    fontWeight: "700",

    letterSpacing: 2,
  },

});