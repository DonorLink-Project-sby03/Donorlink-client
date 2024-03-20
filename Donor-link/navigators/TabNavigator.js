// TabNavigator.js
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import HomePages from "../screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "../screens/ProfileScreen";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AddForm from "../screens/AddForm";
import Recipient from "../screens/Recipient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../context/authContext";
import * as SecureStore from "expo-secure-store";
import { LandingPage } from "../screens/LandingPage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const navigation = useNavigation();
  const { setIsSignedIn } = useContext(AuthContext);
  const handeLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      setIsSignedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "LandingPage") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={30} color={"#F75369"} />;
          } 
        },
      })}
      tabBarOptions={{
        labelStyle: { display: "none" }, // Menghapus teks di bawah ikon
      }}
    >
      <Tab.Screen
        name="LandingPage"
        component={LandingPage}
        options={({ navigation }) => ({
          title: "DonorLink",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            fontSize: 30, // Atur ukuran teks
          },
          headerTintColor: "#F75369", // Menetapkan warna teks
          headerShown: true,
          tabBarStyle: { display: 'none' }
        })}
      />
    </Tab.Navigator>
  );
}
