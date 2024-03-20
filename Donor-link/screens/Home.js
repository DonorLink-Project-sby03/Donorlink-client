import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import CardChat from '../components/CardChat';
import axios from '../instance/config';
import { useContext, useDebugValue, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';

export default function HomePages({ navigation }) {
  const { items } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fffdfb' }}>
      <ScrollView>
        {items.map((data) => {
          return <CardChat key={data.id} data={data} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
