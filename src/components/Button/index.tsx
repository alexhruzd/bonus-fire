import React, {useContext} from 'react';
import {ThemeModeContext} from "../../context/themeMode";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

interface ButtonProps {
  title?: string;
  type?: string;
  icon?: any;
  onPress?: any;
  style?: any;
}

const Button = ({title, type, icon, onPress, style}: ButtonProps) => {
  const {theme} = useContext(ThemeModeContext);

  return (
      <TouchableOpacity
        style={[
          styles.button,
          {borderColor: theme.colors.border},
          type === "outline" && styles.outline,
          type === "clear" && styles.clear,
          style
        ]}
        onPress={onPress}
      >
        {icon && (
          <Image source={icon}/>
        )}

        {title && (
          <Text
            style={{
              color: theme.colors.text,
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold"
            }}
          >{title}</Text>
        )}
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    paddingHorizontal: 10,
    borderWidth: 3,
    width: "50%",
    height: 60
  },
  outline: {
    backgroundColor: "transparent"
  },
  clear: {
    borderWidth: 0
  }
})

export default Button;