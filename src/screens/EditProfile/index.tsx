import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { firebase } from "../../common/firebase";


const EditProfile = ( {user, navigation}: any) => {
  
  const [firstName, setFirstName] = useState("")
  const [secondName, setSecondName] = useState("")
  const [email, setEmail] = useState("")

  const onSaveProfile = () => {
    firebase.database().ref('users/' + user?.uid).set({
      firstName,
      secondName,
      email,
      bonus: 10
    });

    navigation.reset({
      index: 0, 
      routes: [{ name: 'Profile' }]
    });
  }

  return (
    <View style={styles.container}>
      <Input
        label="Enter first name"
        onChangeText={setFirstName}
      />
      <Input
        label="Enter second name"
        onChangeText={setSecondName}
      />
      <Input
        label="Enter email"
        onChangeText={setEmail}
      />

      <Button 
        title="Save Profile"
        onPress={onSaveProfile}
      />

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

export default EditProfile;
