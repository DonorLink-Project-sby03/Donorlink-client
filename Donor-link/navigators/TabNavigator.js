// TabNavigator.js
import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import HomePages from '../screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/ProfileScreen';
import Recipient from '../screens/Recipient';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function MainTabs({ navigation }) {

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'RecipientPost') {
            iconName = focused ? 'plussquare' : 'plussquareo';
            return <AntDesign name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        labelStyle: { display: 'none' }, // Menghapus teks di bawah ikon
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePages}
        options={{
          title: 'Home',
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="RecipientPost"
        component={Recipient}
        options={{
          title: 'Recipients',
          headerShown: true,
        }}
      />
      <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
             title: "Profile",
             headerShown: true    
                }}
      />
    </Tab.Navigator>
  );
}

const HeaderTitle = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#101820', fontSize: 25 }}>Xtweets</Text>
    </View>
  );
};
