// TabNavigator.js
import React from "react";
import { View, Text } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import HomePages from "../screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "../screens/ProfileScreen";
import Recipient from "../screens/Recipient";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={"black"} />;
          } else if (route.name === "Profile") {
            iconName = focused ? "user-circle-o" : "user-circle";
            return <FontAwesome name={iconName} size={size} color={"black"} />;
          }
        },
      })}
      tabBarOptions={{
        labelStyle: { display: "none" }, // Menghapus teks di bawah ikon
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePages}
        options={() => ({
          title: "Home",
          headerStyle: {
            backgroundColor: '#fbfbfb'
          },
          headerRight: () => (
            <MaterialIcons
              name="add-box"
              size={30}
              color="black"
              onPress={() => navigation.navigate("Recipants")}
              style={{ marginRight: 10 }}
            />
          ),
          headerShown: true,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Hello",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const HeaderTitle = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#101820", fontSize: 25 }}>Xtweets</Text>
    </View>
  );
};
