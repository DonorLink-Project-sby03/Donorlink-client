import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { datas } from './Home';

export default function Detail() {
  const { params } = useRoute();
  const navigation = useNavigation();

  const data = datas.find((el) => el.id == params.postId);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
          <Image source={{ uri: 'https://upk.kemkes.go.id/new/imagex/content/182f78f3718c379655d2efd73f7efde3.png' }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold', textAlignVertical: 'center' }}>{data.user.name}</Text>
        </View>
        <View>
          <Image source={{ uri: 'https://upk.kemkes.go.id/new/imagex/content/182f78f3718c379655d2efd73f7efde3.png' }} style={{ width: '100%', height: 300 }} />
          <View style={{ marginTop: 10, marginHorizontal: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
              <MaterialIcons name="bloodtype" size={24} color="red" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 5, fontSize: 20 }}>{data.bloodtype}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
              <MaterialIcons name="description" size={24} color="black" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 5 }}>{data.description}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 3, marginBottom: 5 }}>
              <FontAwesome6 name="location-dot" size={24} color="black" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 10, color: 'grey' }}>Lokasi: {data.location}</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: '30%' }}>
          <Button title="Donor" color={'red'} onPress={() => navigation.navigate('Donor')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
