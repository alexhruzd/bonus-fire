import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { firebaseConfig, firebase } from "../../common/firebase";
import Button from "../../components/Button";
import Input from "../../components/Input";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");

  const recaptchaVerifier = React.useRef(null);

  const [message, showMessage] = React.useState(
    !firebaseConfig
      ? {
          text:
            "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Input
        label="Enter phone number:"
        keyboardType="phone-pad"
        onChangeText={(number: string) => setPhoneNumber(number)}
      />

      <Button
        title="Send Code"
        style={{
          marginBottom: 20
        }}
        onPress={async () => {
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              // @ts-ignore
              recaptchaVerifier.current
            );

            setVerificationId(verificationId);
            showMessage({
              text: 'Verification code has been sent to your phone.',
            });
          } catch (error) {
            {
              showMessage({ text: `Error: ${error.message}` });
            }
          }
        }}
      />

      <Input 
        label="Enter Verification code"
        keyboardType="number-pad"
        onChangeText={setVerificationCode}
      />      

      <Button 
        title="Confirm Code"
        onPress={async () => {
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );

            await firebase.auth().signInWithCredential(credential);
            showMessage({ text: 'Phone authentication successful!' });

          } catch (error) {
            showMessage({ text: `Error: ${error.message}` });
          }
        }}
      />

      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { justifyContent: "center" },
            
          ]}
          onPress={() => showMessage(undefined)}
        >
          <Text
            style={{
              color: "blue",
              fontSize: 17,
              textAlign: "center",
              margin: 20,
            }}
          >
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

export default Login;
