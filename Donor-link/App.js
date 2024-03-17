import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { AuthContext } from "./context/authContext";
import StackNavigator from "./navigators/StackNavigators";
import * as SecureStore from "expo-secure-store";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    async function getToken() {
      try {
        let token = await SecureStore.getItemAsync("access_token")
        if (token) setIsSignedIn(true)
      } catch (error) { 
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
  }
    }
    getToken()
  }, [])

  if (isLoading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading....</Text>
    </View>;
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  Tab: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
});
