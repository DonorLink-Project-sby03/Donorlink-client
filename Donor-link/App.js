import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createContext, useContext, useEffect, useState } from 'react';
import AuthContextProvider, { AuthContext } from './context/authContext';
import StackNavigator from './navigators/StackNavigators';
import * as SecureStore from 'expo-secure-store';

const Tab = createBottomTabNavigator();

export default function App() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading....</Text>
    </View>;
  }

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  Tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});
