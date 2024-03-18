import { useContext, useState } from 'react';
import { SafeAreaView, Text, View, Image, Button, Platform, Alert, PermissionsAndroid, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Dropdown, SelectDropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
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
  const { isSignedIn } = useContext(AuthContext);
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
      console.log(data, '<<< balikan dari post');
      setResultPost(data);
      navigation.navigate('ImgRecipient', {
        postId: data.id,
      });
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
            <Text style={styles.inputTitle}>Description</Text>
            <TextInput onChangeText={(text) => setDescription(text)} value={description} style={styles.inputStyle} />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Stock</Text>
            <TextInput onChangeText={(text) => setStock(text)} value={stock} style={styles.inputStyle} />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Location</Text>
            <TextInput onChangeText={(text) => setLocation(text)} value={location} style={styles.inputStyle} />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Type Blood</Text>
            <Dropdown
              style={styles.dropdown}
              data={typeBlood}
              labelField="value"
              valueField="key"
              placeholder={selected ? selected : 'Select type blood'}
              onChange={(item) => {
                setSelected(item.value);
              }}
              value={selected}
            />
          </View>
          <Button title="Submit" onPress={() => handlePostRecipient()} />
          <Button title="Logout" onPress={() => handleLogout()} />
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
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  inputStyle: {
    borderRadius: 1,
  },
  inputTitle: {
    fontSize: 18,
  },
  containerInput: {
    marginBottom: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 5,
  },
});
