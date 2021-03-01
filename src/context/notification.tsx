import React, {createContext, useEffect, useRef, useState} from "react";
import * as Notifications from "expo-notifications";
import {AsyncStorage, Platform} from "react-native";
import { firebase, firebaseConfig } from "../common/firebase";

export const NotificationContext = createContext<{
  notification?: any,
  sendPushNotification?: any
}>({});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export const NotificationProvider = ({children}: any) => {
  const [expoToken, setExpoToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {
    registerForPushNotification().then(token => setExpoToken(token))

    const ref = firebase.database().ref('bonus');

    ref.off();
    ref.on('child_changed', (snapshot) => {
      sendPushNotification(snapshot.val());
    });  


    // This listener is fired whenever a notification is received while the app is foregrounded
    // @ts-ignore
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // @ts-ignore
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    // @ts-ignore
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      
      const bonus = response.notification.request.content.data.bonus;
      const userId = firebase.auth().currentUser?.uid;

      const ref = firebase.database().ref('users/' + userId);
      ref.child('bonus').once('value').then((snapshot) => {
        if( userId ) {
          firebase.database().ref('users/' + userId).child('bonus').set(bonus + snapshot.val())
        }
      })  
    
    });

    return () => {
      // @ts-ignore
      Notifications.removeNotificationSubscription(notificationListener);
      // @ts-ignore
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [])

  const sendPushNotification = async (bonus: string) => {
    let token = await AsyncStorage.getItem("push_token");

    const message = {
      to: token,
      sound: 'default',
      title: 'Congratulations!',
      body: `You have ${bonus} bonus!`,
      data: {bonus},
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  

  const registerForPushNotification = async () => {
    let token: string;
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus != 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    await AsyncStorage.setItem("push_token", token);
    console.log(token)

    return token;
  }

  return (
    <NotificationContext.Provider value={{
      notification,
      sendPushNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

