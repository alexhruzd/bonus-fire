import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import { ThemeModeContext } from "../../context/themeMode";
import { firebase } from "../../common/firebase";

const Profile = ({ user }: any) => {
  const { theme } = useContext(ThemeModeContext);

  const onLogOut = () => {
    firebase.auth().signOut();
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: theme.colors.border,
          fontSize: 28,
        }}
      >
        Name: {user?.firstName} {user?.secondName}
      </Text>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 28,
        }}
      >
        email: {user?.email}
      </Text>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 28,
          marginBottom: 40
        }}
      >
        bonus: {user?.bonus}
      </Text>

      <Button title="Log Out" onPress={onLogOut} />
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

export default Profile;
