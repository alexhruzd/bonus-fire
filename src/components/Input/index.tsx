import React, {useContext} from 'react';
import {Text, TextInput, View} from "react-native";
import {ThemeModeContext} from "../../context/themeMode";

interface InputProps {
  label?: string;
  errorMessage?: string;
  onChangeText?: any;
  keyboardType?: any;
}

const Input = ({label, errorMessage, onChangeText, keyboardType}: InputProps) => {
  const {theme} = useContext(ThemeModeContext);

  const [value, setValue] = React.useState("");

  const onChange = (text: string) => {
    setValue(text);
    onChangeText(text);
  }

  return (
    <View style={{
      width: "95%",
      marginBottom: 20
    }}>
      {label && (
        <Text
          style={{
            color: theme.colors.grey,
            textAlign: "left",
            fontWeight: "bold",
            fontSize: 16
          }}
        >{label}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        style={[
          {
            padding: 5,
            color: theme.colors.text,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.grey,
            fontSize: 20
          }
        ]}
      />
      {errorMessage && (
        <Text style={{
          color: theme.colors.notification
        }}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default Input;