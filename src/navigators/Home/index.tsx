import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../../screens/Profile";
import EditProfile from "../../screens/EditProfile";
import { firebase } from "../../common/firebase";

const Stack = createStackNavigator();

const Home = ({ user }: any) => {
  const [userProfile, setUserProfile] = useState(undefined);

  useEffect(()=> {
    const ref = firebase.database().ref("users/" + user?.uid);
    ref.off();
    ref.on('value', (snapshot) => {
      const val = snapshot.val();
      setUserProfile(val);
    })
  
  },[]);

  return (
    <>
      {userProfile !== undefined && (
        <Stack.Navigator
          initialRouteName={userProfile ? "Profile" : "EditProfile"}
          headerMode="screen"
        >
          <Stack.Screen name="Profile">
            {(props) => <Profile {...props} user={userProfile} />}
          </Stack.Screen>
          <Stack.Screen name="EditProfile">
            {(props) => <EditProfile {...props} user={user} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </>
  );
};

export default Home;
