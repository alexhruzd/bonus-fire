import React, {useContext, useEffect, useState} from 'react';
import { NavigationContainer} from "@react-navigation/native";
import {combineProviders} from "react-combine-providers";
import {ThemeModeContext, ThemeModeProvider} from "./context/themeMode";
import { firebase } from "./common/firebase";
import Home from './navigators/Home';

import { LogBox } from 'react-native';
import { NotificationProvider } from './context/notification';
import Login from './screens/Login';

LogBox.ignoreLogs(['Setting a timer']);

function App() {

  const {theme} = useContext(ThemeModeContext);

  const [userAuthenticated, setUserAuthenticated] = useState();

  firebase.auth().onAuthStateChanged(user => {
    //@ts-ignore
    setUserAuthenticated(user);  
  })

  return (
    <NavigationContainer theme={theme}>

      {userAuthenticated ? (
        <Home user={userAuthenticated}/>
      ) : (
        <Login />
      )}

    </NavigationContainer>
  );
}

const provider = combineProviders();
provider.push(NotificationProvider)
provider.push(ThemeModeProvider);

const MasterProvider = provider.master();

function AppContainer() {
  return (
    <MasterProvider>
      <App/>
    </MasterProvider>
  )
}

export default AppContainer;
