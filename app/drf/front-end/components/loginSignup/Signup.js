import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import * as Font from "expo-font";
import styles from "./LoginStyles";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonSignup from "./ButtonLanding";
import InputField from "./InputField";
import PasswordStrengthBar from "./PasswordStrengthBar";
import ChecklistModal from "./ChecklistModal";

const baseEndpoint = "http://localhost:8000/api";
//const baseEndpoint = "http://IPADDRESS:8000/api";

const signUpEndpoint = `${baseEndpoint}/users/`;

const Signup = ({ onSwitch, navigation }) => {
  // State for form fields
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State for form field errors
  const [signupEmailError, setSignupEmailError] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // Function to handle signup validation and submission
  const handleSignup = () => {
    let isValid = true;
    Keyboard.dismiss();

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Validate email
    if (!signupEmail || !emailRegex.test(signupEmail)) {
      setSignupEmailError("Invalid email");
      isValid = false;
    } else {
      setSignupEmailError("");
    }

    // Validate password
    if (!signupPassword) {
      setSignupPasswordError("Password required");
      isValid = false;
    } else {
      setSignupPasswordError("");
    }

    // Validate password confirmation
    if (signupPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (isValid) {
      // TODO: back-end signup logic
      let bodyObj = {
        email: signupEmail,
        password: signupPassword,
      };
      // need to pass the data as JSON for our API to deal with
      const bodyStr = JSON.stringify(bodyObj);
      //console.log(bodyStr);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyStr,
      };
      fetch(signUpEndpoint, options) //  Promise
        .then((response) => {
          //  console.log(response);
          return response.json();
        })
        .then((x) => {
          //  console.log(x);
          navigation.navigate("Details");
        })
        .catch((err) => {
          //  console.log("err", err);
        });
    }
  };

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        titleFont: require("../../assets/fonts/Inter-Bold.ttf"),
        subHeaderFont: require("../../assets/fonts/Inter-Regular.ttf"),
        textFont: require("../../assets/fonts/Inter-Medium.ttf"),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: 50 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.headerText,
              fontLoaded ? { fontFamily: "titleFont" } : {},
            ]}
          >
            Sign Up
          </Text>
          <Text
            style={[
              styles.subHeaderText,
              fontLoaded ? { fontFamily: "subHeaderFont" } : {},
            ]}
          >
            Create and account and join the community!
          </Text>
        </View>

        <View style={styles.fields}>
          <InputField
            icon="email"
            placeholder="email"
            value={signupEmail}
            onChangeText={(text) => {
              setSignupEmail(text);
              setSignupEmailError("");
            }}
            onFocus={() => {
              setSignupEmailError("");
            }}
            inputMode="email"
            autoCapitalize="none"
            autoCorrect={false}
            name="email"
            errorText={signupEmailError}
          />

          <InputField
            icon="lock"
            placeholder="password"
            value={signupPassword}
            onChangeText={(text) => {
              setSignupPassword(text);
              setSignupPasswordError("");
              setConfirmPasswordError("");
            }}
            onFocus={() => {
              setSignupPasswordError("");
              setConfirmPasswordError("");
            }}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            rightComponent={
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ marginRight: 10 }}
                  testID="password-visibility-icon"
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={25}
                    color="gray"
                  />
                </Pressable>
                <ChecklistModal password={signupPassword} />
              </View>
            }
            errorText={signupPasswordError}
          />

          <PasswordStrengthBar password={signupPassword} />

          <InputField
            icon="lock"
            placeholder="confirm password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError("");
            }}
            onFocus={() => {
              setConfirmPasswordError("");
            }}
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            name="confirmPassword"
            errorText={confirmPasswordError}
          />

          <ButtonSignup title="SIGN UP" onPress={handleSignup} />

          <Pressable style={styles.signupContainer} onPress={onSwitch}>
            <Text
              style={[
                styles.signupText,
                fontLoaded ? { fontFamily: "textFont" } : {},
              ]}
            >
              Already have an account?{" "}
              <Text
                style={[
                  styles.signup,
                  fontLoaded ? { fontFamily: "textFont" } : {},
                ]}
              >
                Sign in!
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
