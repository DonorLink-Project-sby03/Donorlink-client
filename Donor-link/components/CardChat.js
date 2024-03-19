import { Image, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function CardChat({ data }) {
  const navigation = useNavigation();
  useEffect(() => {
    data;
  }, []);
  // console.log(data, 'data<<<<');
  return (
    <View style={{ backgroundColor: 'white', marginBottom: 5 }}>
      {data ? (
        <Pressable
          onPress={() =>
            navigation.navigate('Detail', {
              postId: data.id,
              bloodType: data.bloodType,
              latitude: data.latitude,
              longitude: data.longitude,
              location: data.location,
            })
          }
        >
          <View style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
            <Image source={{ uri: data?.image }} style={{ backgroundColor: 'black', width: 50, height: 50, borderRadius: 50 }} />
            <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold', textAlignVertical: 'center' }}>{data?.User?.name}</Text>
          </View>
        </Pressable>
      ) : (
        <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }}>No data available</Text>
      )}
      {data && (
        <View style={{ marginTop: 5 }}>
          <Image source={{ uri: data?.image }} style={{ width: '100%', height: 250 }} />
          <Text style={{ paddingHorizontal: 5, paddingVertical: 7, fontSize: 17 }}>{data.description}</Text>
        </View>
      )}
    </View>
  );
}
