import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import COLORS from "../constants/color";

const index = () => {
  // const router = useRouter();
  return (
    // <View style={{ flex: 1, marginTop: 150 }}>
    //   <Text>index</Text>
    //   <Button title="Tabs" onPress={() => router.push("(tabs)")} />
    // </View>
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View>
          <Image
            source={require("../assets/enigma.png")}
            style={styles.imageOne}
          />
          <Image
            source={require("../assets/enigma.png")}
            style={styles.imageTwo}
          />
          <Image
            source={require("../assets/enigma.png")}
            style={styles.imageThree}
          />
          <Image
            source={require("../assets/enigma.png")}
            style={styles.imageFour}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.headingBig}>Let's Get</Text>
          <Text style={styles.heading}>Started</Text>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>The best App in town</Text>
            <Text style={styles.descriptionText}>
              The App that knows your needs
            </Text>
          </View>

          <Button
            title="Join Now"
            onPress={() => router.push("Signup")}
            style={styles.joinButton}
          />

          <View style={styles.accountCheck}>
            <Text style={styles.descriptionText}>
              Already have an account ?
            </Text>
            <Pressable onPress={() => router.push("Login")}>
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexContainer: {
    flex: 1,
  },
  imageOne: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: "absolute",
    top: 10,
    transform: [{ translateX: 20 }, { translateY: 50 }, { rotate: "-15deg" }],
  },
  imageTwo: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: "absolute",
    top: -30,
    left: 100,
    transform: [{ translateX: 50 }, { translateY: 50 }, { rotate: "-5deg" }],
  },
  imageThree: {
    width: 100,
    height: 100,
    borderRadius: 20,
    position: "absolute",
    top: 130,
    left: -50,
    transform: [{ translateX: 50 }, { translateY: 50 }, { rotate: "15deg" }],
  },
  imageFour: {
    height: 200,
    width: 200,
    borderRadius: 20,
    position: "absolute",
    top: 110,
    left: 100,
    transform: [{ translateX: 50 }, { translateY: 50 }, { rotate: "-15deg" }],
  },
  content: {
    paddingHorizontal: 22,
    position: "absolute",
    top: 400,
    width: "100%",
  },
  headingBig: {
    fontSize: 50,
    fontWeight: "800",
    color: COLORS.primary,
  },
  heading: {
    fontSize: 46,
    fontWeight: "800",
    color: COLORS.primary,
  },
  descriptionContainer: {
    marginVertical: 22,
  },
  descriptionText: {
    fontSize: 16,
    color: COLORS.primary,
    marginVertical: 4,
  },
  joinButton: {
    marginTop: 22,
    width: "100%",
  },
  accountCheck: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 4,
  },
});
