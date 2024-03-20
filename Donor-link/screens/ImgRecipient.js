import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, PermissionsAndroid, Alert, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from '../instance/config';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../context/authContext';
import Loading from '../components/Loading';

export default function ImgRecipient() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const token = SecureStore.getItem('access_token');
  const [singleFile, setSingleFile] = useState(null);
  const { setItems, isLoading, setIsLoading } = useContext(AuthContext);

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
      Alert.alert('Info',error.message.split('with status code')[0])
      console.warn(error);
      return false;
    }
  };

  const fetchRecipients = async () => {
    const { data } = await axios.get('/recipients');
    // console.log(data[0]?.name, '<<<>>>');
    setItems(data);
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
        setIsLoading(true);
        let res = await axios.patch('/recipients/' + params.postId, data, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        navigation.navigate('MainTabs');
        fetchRecipients();
        console.log('result', res);
        if (res.status == 1) {
          Alert.alert('Info', res.msg);
        }
      } catch (error) {
        // Error retrieving data
        // Alert.alert('Error', error.message);
        console.log('error upload', error);
      } finally {
        setIsLoading(false);
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
        <TextInput onChangeText={(text) => setImage(text)} value={singleFile ? singleFile.assets[0].name : ''} style={styles.inputStyle} placeholder="Select file" />
      </View>

      <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={uploadImage}>
        <Text style={styles.buttonTextStyle}>Upload File</Text>
      </TouchableOpacity>

      {isLoading ? <Loading /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    justifyContent: 'center',
    padding: 20,
  },
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
  dropdown: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 5,
  },
});
