import { useRoute } from '@react-navigation/native';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { datas } from './Home';

export default function Detail() {
  const { params } = useRoute();
  const data = datas.find((el) => el.id == params.postId);
  console.log(data);
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Image source={{ uri: 'https://upk.kemkes.go.id/new/imagex/content/182f78f3718c379655d2efd73f7efde3.png' }} style={{ width: '100%', height: 300 }} />
          <View style={{ marginTop: 10, marginHorizontal: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
              <MaterialIcons name="bloodtype" size={24} color="red" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 5 }}>{data.bloodtype}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
              <MaterialIcons name="description" size={24} color="black" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 5 }}>{data.description}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 3, marginBottom: 5 }}>
              <FontAwesome6 name="location-dot" size={24} color="black" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 10 }}>{data.location}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
