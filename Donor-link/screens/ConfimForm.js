import { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View, PermissionsAndroid, Alert, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from '../instance/config';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../context/authContext';

export default function ConfirmForm() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [stock, setStock] = useState('');
  const [donorConfirmId, setDonorConfirmId] = useState('');
  const [location, setLocation] = useState('');
  const token = SecureStore.getItem('access_token');
  const {fetchRecipients} = useContext(AuthContext)

  const confirmDonor = async () => {
    const { data } = await axios.post(
      '/donorconfirmation/' + params.donorId,
      { location, stock },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data.id, '<<< dari confirm donor');
    setDonorConfirmId(data.id);
    fetchRecipients()
    navigation.navigate('ConfirmImg', {
      donorConfirmId: data.id,
    });
  };

  return (
    <View>
      <View style={styles.containerInput}>
        <Text style={styles.inputTitle}>Location</Text>
        <TextInput style={styles.inputStyle} onChangeText={(text) => setLocation(text)} value={location} placeholder="Input location" />
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.inputTitle}>Stock</Text>
        <TextInput style={styles.inputStyle} onChangeText={(text) => setStock(text)} value={stock} placeholder="Input blood" />
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => confirmDonor()}>
        <Text style={styles.buttonTextStyle}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#F75369',
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
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderWidth: 1,
    marginHorizontal: 15,
  },
  inputTitle: {
    marginLeft: 15,
    marginBottom: 5,
    fontSize: 18,
  },
  containerInput: {
    marginBottom: 10,
  },
});
