import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import * as DocumentPicker from 'expo-document-picker';
import axios from '../instance/config';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ConfirmImg() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const token = SecureStore.getItem('access_token');
  const [singleFile, setSingleFile] = useState(null);
  console.log(params);

  const checkPermissions = async () => {
    try {
      const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      if (!result) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
          title: 'You need to give storage permission to download and save the file',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          return true;
        } else {
          Alert.alert('Error', I18n.t('PERMISSION_ACCESS_FILE'));
          console.log('Camera permission denied');
          return false;
        }
      } else {
        return true;
      }
    } catch (error) {
      console.warn(error);
      return false;
    }
  };

  const uploadImage = async () => {
    if (singleFile != null) {
      const data = new FormData();

      data.append('image', {
        uri: singleFile.assets[0].uri,
        name: singleFile.assets[0].name,
        type: singleFile.assets[0].mimeType,
      });

      try {
        let res = await axios.patch('/donorconfirmation/' + params.donorConfirmId, data, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        navigation.navigate('Confirm');
        console.log('result', res);
        if (res.status == 1) {
          Alert.alert('Info', res.msg);
        }
      } catch (error) {
        // Error retrieving data
        // Alert.alert('Error', error.message);
        console.log('error upload', error);
      }
    } else {
      // If no file selected the show alert
      Alert.alert('Please Select File first');
    }
  };

  async function selectFile() {
    try {
      const result = await checkPermissions();

      if (result) {
        const result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: false,
          type: 'image/*',
        });

        if (result.canceled === false) {
          // Printing the log realted to the file
          console.log('res : ' + JSON.stringify(result));
          // Setting the state to show single file attributes
          setSingleFile(result);
        }
      }
    } catch (err) {
      setSingleFile(null);
      console.warn(err);
      return false;
    }
  }
  return (
    <View>
      <View style={styles.containerInput}>
        <Text style={styles.inputTitle}>Image</Text>
        <TextInput onChangeText={(text) => setImage(text)} value={singleFile ? singleFile.assets[0].name : ''} style={styles.inputStyle} />
      </View>

      <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={uploadImage}>
        <Text style={styles.buttonTextStyle}>Upload File</Text>
      </TouchableOpacity>
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
