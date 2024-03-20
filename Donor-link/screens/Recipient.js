import { useContext, useState } from 'react';
import { SafeAreaView, Text, View, Image, Button, Platform, Alert, PermissionsAndroid, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Dropdown, SelectDropdown } from 'react-native-element-dropdown';
import axios from '../instance/config';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';

const typeBlood = [
  { key: '1', value: 'O+' },
  { key: '2', value: 'A+' },
  { key: '3', value: 'B+' },
  { key: '4', value: 'AB+' },
  { key: '5', value: 'O-' },
  { key: '6', value: 'A-' },
  { key: '7', value: 'B-' },
  { key: '8', value: 'AB-' },
];

export default function Recipient() {
  const { isSignedIn, fetchRecipients } = useContext(AuthContext);
  const navigation = useNavigation();
  const token = SecureStore.getItem('access_token');
  const [resultPost, setResultPost] = useState({});
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');
  const [location, setLocation] = useState('');
  const [singleFile, setSingleFile] = useState(null);
  const [selected, setSelected] = useState(false);
  console.log(selected, '<<<< darah');
  const formData = {
    description,
    stock,
    location,
    bloodType: selected,
  };

  const handlePostRecipient = async () => {
    try {
      const { data } = await axios.post('/recipients', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.id, 'id');
      setResultPost(data);
      navigation.navigate('ImgRecipient', {
        postId: data.id,
      });
      setDescription('');
      setStock('');
      setLocation('');
      setSelected(false);
      fetchRecipients()
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    SecureStore.deleteItemAsync('access_token');
    isSignedIn(false);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ paddingHorizontal: 15, paddingVertical: 25 }}>
          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Deskripsi: </Text>
            <TextInput style={styles.input} onChangeText={(text) => setDescription(text)} value={description} />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Stock:</Text>
            <TextInput style={styles.input} onChangeText={(text) => setStock(text)} value={stock} />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Lokasi:</Text>
            <TextInput style={styles.input} onChangeText={(text) => setLocation(text)} value={location} placeholder="Kabupaten-Provinsi" />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Golongan Darah:</Text>
            <Dropdown
              style={styles.dropdown}
              data={typeBlood}
              labelField="value"
              valueField="key"
              placeholder={selected ? selected : 'Pilih Golongan Darah'}
              onChange={(item) => {
                setSelected(item.value);
              }}
              value={selected}
            />
          </View>
          <TouchableOpacity style={{ paddingTop: 20 }}>
            <Button title="Kirim" onPress={() => handlePostRecipient()} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputTitle: {
    fontSize: 18,
  },
  containerInput: {
    marginBottom: 5,
  },
  dropdown: {
    borderWidth: 1,
    paddingHorizontal: 5,
  },
});
