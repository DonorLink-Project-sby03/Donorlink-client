import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import CardChat from '../components/CardChat';

export default function HomePages({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'grey' }}>
      <ScrollView>
        <CardChat />
        <CardChat />
        <CardChat />
        <CardChat />
      </ScrollView>
    </SafeAreaView>
  );
}
