import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Image, SafeAreaView, ScrollView, Text, View, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { datas } from './Home';
import { useContext, useEffect, useState } from 'react';
import axios from '../instance/config';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../context/authContext';

export default function Detail() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [item, setItem] = useState({});
  const [stock, setStock] = useState('');

  const { users } = useContext(AuthContext);

  const getRecipient = async () => {
    const { data } = await axios.get('/recipients/' + params.postId);
    setItem(data);
  };

  const handleDonor = async () => {
    try {
      if (params.bloodType === users.Profile?.bloodType) {
        const token = SecureStore.getItem('access_token');
        const { data } = await axios.post(
          '/donors/' + params.postId,
          { stock },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        navigation.navigate('History');
      } else {
        Alert.alert('Blood Type Check', 'Blood type not same');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipient();
  }, []);

  console.log(item);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
          <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold', textAlignVertical: 'center' }}>Test</Text>
        </View>
        <View>
          <Image source={{ uri: item.image }} style={{ width: '100%', height: 300 }} />
          <View style={{ marginTop: 10, marginHorizontal: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
              <MaterialIcons name="bloodtype" size={24} color="red" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 5, fontSize: 20 }}>{item.bloodType}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
              <MaterialIcons name="description" size={24} color="black" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 5 }}>{item.description}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 3, marginBottom: 5 }}>
              <FontAwesome6 name="location-dot" size={24} color="black" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 10, color: 'grey' }}>Lokasi: {item.location}</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: '10%', marginTop: 20 }}>
          <TextInput label="Jumlah darah yang akan didonor per kantong" value={stock} onChangeText={(text) => setStock(text)} style={{ marginBottom: 5 }} />
          <Button title="Donor" color={'red'} onPress={() => handleDonor()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
