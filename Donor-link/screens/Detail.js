import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Image, SafeAreaView, ScrollView, Text, View, Alert } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { datas } from './Home';
import { useContext, useEffect, useState } from 'react';
import axios from '../instance/config';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../context/authContext';
import MapView, { Callout, Marker } from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';

export default function Detail() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [item, setItem] = useState({});
  const [stock, setStock] = useState('');
  const [profile, setProfile] = useState({});

  const [draggableMarkerCoor, setDraggableMarkerCoor] = useState({
    longitude: 148.11,
    latitude: -26.85,
  });

  console.log(params, '<<<<< params');

  const { users } = useContext(AuthContext);

  const onRegionChange = (region) => {
    console.log(region);
  };

  const showLocationOfInterest = () => {
    return locationOfInterest.map((item, index) => {
      return <Marker key={index} coordinate={item.location} title={item.title} description={item.description} />;
    });
  };

  const getRecipient = async () => {
    const { data } = await axios.get('/recipients/' + params.postId);
    setItem(data);
    console.log(item, '<<<<< item didala function getRecipient');
  };

  const fetchProfile = async () => {
    try {
      const token = SecureStore.getItem('access_token');
      const { data } = await axios.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDonor = async () => {
    if (!profile) {
      Alert.alert('Profile', 'Please complete your profile first');
      navigation.navigate('Profile');
    } else {
      try {
        const token = SecureStore.getItem('access_token');
        const { data } = await axios.post(
          '/donors/' + params.postId,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigation.navigate('History');
      } catch (error) {
        console.log(error);
        Alert.alert('NotAcceptable', 'Sorry your blood type is not suitable for donation.');
      }
    }
  };

  useEffect(() => {
    getRecipient();
    fetchProfile();
  }, []);

  console.log(item, '<<<<< item');

  let latitude = params?.latitude !== undefined ? parseFloat(params.latitude) : -7.299675758351519;
  let longitude = params?.longitude !== undefined ? parseFloat(params.longitude) : 112.74147910997272;

  let locationOfInterest = [
    {
      title: params?.location.split('-')[0],
      location: {
        latitude,
        longitude,
      },
      description: params?.location.split('-')[1],
    },
  ];

  return (
    <SafeAreaView>
      <MapView style={{ width: '100%', height: '50%' }} onRegionChange={onRegionChange} initialRegion={{ latitude: latitude, latitudeDelta: 0.24357150578851883, longitude: longitude, longitudeDelta: 0.1615377143025114 }}>
        {showLocationOfInterest()}
        <Marker draggable pinColor="blue" coordinate={draggableMarkerCoor} onDragEnd={(e) => setDraggableMarkerCoor(e.nativeEvent.coordinate)} />

        <Marker coordinate={{ latitude: -35, longitude: 147 }}>
          {/* tidak jalan di android untuk*/}
          {/* <Callout>
              <Text>Count: {count}</Text>
              <Button title="Increment Count" onPress={() => setCount(count + 1)} />
            </Callout> */}
        </Marker>
      </MapView>
      <ScrollView>
        {/* <View style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
          <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold', textAlignVertical: 'center' }}>Test</Text>
        </View> */}

        <View>
          {/* <Image source={{ uri: item.image }} style={{ width: '100%', height: 300 }} /> */}
          <View style={{ marginTop: 10, marginHorizontal: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
              <MaterialIcons name="bloodtype" size={24} color="red" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 5, fontSize: 20 }}>{item.bloodType}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
              <MaterialIcons name="description" size={24} color="black" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 5 }}>{item.description}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
              <MaterialIcons name="description" size={24} color="black" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 5 }}>{item.stock ? item.stock + ' ml' : ''}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 3, marginBottom: 5 }}>
              <FontAwesome6 name="location-dot" size={24} color="black" />
              <Text style={{ textAlignVertical: 'center', marginLeft: 10, color: 'grey' }}>{item.location}</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: '10%', marginTop: 10 }}>
          <TextInput label="Jumlah darah yang akan didonor per kantong" value={stock} onChangeText={(text) => setStock(text)} style={{ marginBottom: 5 }} />
          <Button title="Apply" color={'red'} onPress={() => handleDonor()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
