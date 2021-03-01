import React, {createContext, useEffect, useState} from "react";
import { MyDarkTheme, MyLightTheme} from "../theme";
import {AsyncStorage} from "react-native";


export const ThemeModeContext = createContext<{
  theme?: any,
  changeTheme?: any
}>({})

export const ThemeModeProvider = ({children}: any) => {
  const [theme, setTheme] = useState(MyLightTheme);

  useEffect(()=> {
    (async () => {
      let curTheme = await AsyncStorage.getItem("theme");

      if (curTheme === "dark") {
        setTheme(MyDarkTheme);
      }
    })();
  },[])

  const saveTheme = async (theme: string) => {
    await AsyncStorage.setItem("theme", theme);
  }

  const changeTheme = async (theme: string) => {
    switch (theme) {
      case "dark": {
        setTheme(MyDarkTheme);
        await saveTheme("dark");
        return;
      }
      case "light": {
        setTheme(MyLightTheme);
        await saveTheme("light");
        return;
      }
      default: {
        setTheme(MyLightTheme);
        await saveTheme("light");
        return;
      }
    }
  }

  return (
    <ThemeModeContext.Provider value={{
      theme,
      changeTheme
    }}>
      {children}
    </ThemeModeContext.Provider>
  )
}