import { Image, Pressable, Text, View } from 'react-native';

export default function CardChat() {
  return (
    <View style={{ backgroundColor: 'white', marginBottom: 5 }}>
      <Pressable onPress={() => console.log('Click ke detail')}>
        <View style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
          <Image source={'#'} style={{ backgroundColor: 'black', width: 50, height: 50, borderRadius: 50 }} />
          <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold', textAlignVertical: 'center' }}>Nama User</Text>
        </View>
      </Pressable>
      <View style={{ marginTop: 5 }}>
        <Image source={{ uri: 'https://upk.kemkes.go.id/new/imagex/content/182f78f3718c379655d2efd73f7efde3.png' }} style={{ width: '100%', height: 250 }} />
        <Text style={{ padding: 5, fontSize: 15 }}>Donor darah</Text>
      </View>
    </View>
  );
}
