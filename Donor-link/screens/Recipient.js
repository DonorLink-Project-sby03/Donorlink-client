import { useState } from 'react';
import { SafeAreaView, Text, View, Image, Button, Platform, Alert, PermissionsAndroid, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';

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
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');
  const [location, setLocation] = useState('');
  // const [bloodType, setBlooodType] = useState('');
  const [singleFile, setSingleFile] = useState(null);
  const [selected, setSelected] = useState(false);
  const formData = {
    description,
    stock,
    location,
    selected,
    image: singleFile != null ? singleFile.assets[0].uri : '',
  };

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
    const BASE_URL = 'http://localhost:3000';

    if (singleFile != null) {
      const data = new FormData();

      data.append('file_attachment', {
        uri: singleFile.uri,
        name: singleFile.filename,
        type: singleFile.mimeType,
      });

      try {
        let res = await fetch(BASE_URL + 'tutorial/upload.php', {
          method: 'post',
          body: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          timeout: 5000,
        });

        let result = await res.json();
        console.log('result', result);
        if (result.status == 1) {
          Alert.alert('Info', result.msg);
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

          {/* <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Blood Type</Text>
            <TextInput onChangeText={(text) => setBlooodType(text)} value={bloodType} style={styles.inputStyle} />
          </View> */}

          {/* <SelectDropdown
          data={data}
          placeholder={'Select option'}
          selected={selected}
          setSelected={setSelected}
          searchOptions={{ cursorColor: '#007bff' }}
          searchBoxStyles={{ borderColor: '#007bff' }}
          dropdownStyles={{ borderColor: '#007bff' }}
        /> */}

          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Type Blood</Text>
            <Dropdown
              style={styles.dropdown}
              data={typeBlood}
              labelField="value"
              valueField="key"
              placeholder="Select type blood"
              onChange={(item) => {
                setSelected(item.value);
              }}
              value={selected}
            />
            {/* <TextInput onChangeText={(text) => setImage(text)} value={singleFile ? singleFile.assets[0].name : ''} style={styles.inputStyle} /> */}
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Image</Text>
            <TextInput onChangeText={(text) => setImage(text)} value={singleFile ? singleFile.assets[0].name : ''} style={styles.inputStyle} />
          </View>

          {/*Showing the data of selected Single file*/}
          {/* {console.log(singleFile.assets[0].name, '<<<< cek value')} */}
          {singleFile != null ? (
            <Text style={styles.textStyle}>
              File Name: {singleFile.assets[0].name ? singleFile.assets[0].name : ''}
              {'\n'}
              Type: {singleFile.assets[0].mimeType ? singleFile.assets[0].mimeType : ''}
              {'\n'}
              File Size: {singleFile.assets[0].size ? singleFile.assets[0].size : ''}
              {'\n'}
              URI: {singleFile.assets[0].uri ? singleFile.assets[0].uri : ''}
              {'\n'}
            </Text>
          ) : null}
        </View>

        <View style={styles.mainBody}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 30,
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 30,
              }}
            >
              React Native File Upload Example
            </Text>
          </View>

          <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={selectFile}>
            <Text style={styles.buttonTextStyle}>Select File</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={uploadImage}>
            <Text style={styles.buttonTextStyle}>Upload File</Text>
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
