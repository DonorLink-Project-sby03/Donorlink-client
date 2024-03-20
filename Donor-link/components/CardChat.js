import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';

export default function CardChat({ data }) {
  const navigation = useNavigation();
  useEffect(() => {
    data;
  }, []);

  let donation = 0;
  data.Donors.forEach((donor) => {
    if (donor.DonorConfirmation) {
      // Pastikan DonorConfirmation tidak null
      donation += donor.DonorConfirmation.stock;
    }
  });
  console.log(donation, '<<<<');
  let total = (donation / data.stock) * 100;

  // Menghitung persentase donasi masuk
  return (
    <View style={styles.cardContainer}>
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
        <View style={styles.cardContent}>
          <Image
            source={{ uri: data?.image }}
            style={{
              backgroundColor: 'black',
              width: 130,
              height: 130,
              borderRadius: 10,
              marginRight: 10,
            }}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{data?.User?.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="bloodtype" size={25} color="#F75369" />
                <Text style={{ fontSize: 17, color: '#F75369' }}>{data?.bloodType} </Text>
              </View>
            </View>
            <Text style={{ fontSize: 17, marginBottom: 27 }}>{data.description}</Text>
            <Text style={{ marginTop: 10, fontSize: 17 }}>Donor masuk: {donation}ml</Text>
            <ProgressBar progress={total / 100} color="red" style={{ marginTop: 10, height: 10, borderRadius: 10 }} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f7f7f7', // Warna abu-abu
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    margin: 10,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
  },
});
