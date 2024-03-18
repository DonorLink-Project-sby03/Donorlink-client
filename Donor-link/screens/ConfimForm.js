import { useState } from 'react';
import { Button, StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import axios from '../instance/config';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ConfirmForm() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [donorConfirmId, setDonorConfirmId] = useState('');
  const [location, setLocation] = useState('');
  const token = SecureStore.getItem('access_token');
  const [singleFile, setSingleFile] = useState(null);
  console.log(params, '<<<<');

  const confirmDonor = async () => {
    const { data } = await axios.post(
      '/donorconfirmation/' + params.donorId,
      { location },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data.id, '<<< dari confirm donor');
    setDonorConfirmId(data.id);
    navigation.navigate('ConfirmImg', {
      donorConfirmId: data.id,
    });
  };

  return (
    <View>
      <View>
        <Text>Location</Text>
        <TextInput onChangeText={(text) => setLocation(text)} value={location} placeholder="Input location" />
      </View>
      <Button title="Submit" onPress={() => confirmDonor()} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
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
