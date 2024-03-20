import { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Button,
  Platform,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Dropdown, SelectDropdown } from "react-native-element-dropdown";
import axios from "../instance/config";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";

const typeBlood = [
  { key: "1", value: "O+" },
  { key: "2", value: "A+" },
  { key: "3", value: "B+" },
  { key: "4", value: "AB+" },
  { key: "5", value: "O-" },
  { key: "6", value: "A-" },
  { key: "7", value: "B-" },
  { key: "8", value: "AB-" },
];

export default function Recipient() {
  const { isSignedIn, fetchRecipients } = useContext(AuthContext);
  const navigation = useNavigation();
  const token = SecureStore.getItem("access_token");
  const [resultPost, setResultPost] = useState({});
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [location, setLocation] = useState("");
  const [singleFile, setSingleFile] = useState(null);
  const [selected, setSelected] = useState(false);
  console.log(selected, "<<<< darah");
  const formData = {
    description,
    stock,
    location,
    bloodType: selected,
  };

  const handlePostRecipient = async () => {
    try {
      const { data } = await axios.post("/recipients", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.id, "id");
      setResultPost(data);
      navigation.navigate("ImgRecipient", {
        postId: data.id,
      });
      setDescription("");
      setStock("");
      setLocation("");
      setSelected(false);
      fetchRecipients;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    SecureStore.deleteItemAsync("access_token");
    isSignedIn(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={{fontSize: 30, marginBottom: 15}}>Please complete the form below!</Text>
          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Description</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setDescription(text)}
              value={description}
              placeholder="Membutuhkan darah...."
              placeholderTextColor="grey" // Adjust placeholder text color
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Stock:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setStock(text)}
              value={stock}
              placeholder="1000"
              placeholderTextColor="grey" // Adjust placeholder text color
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Location:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setLocation(text)}
              value={location}
              placeholder="Kabupaten-Provinsi"
              placeholderTextColor="grey" // Adjust placeholder text color
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.inputTitle}>Blood Type:</Text>
            <Dropdown
              style={styles.dropdown}
              data={typeBlood}
              labelField="value"
              valueField="key"
              placeholder={selected ? selected : 'Select Blood Type'}
              onChange={(item) => setSelected(item.value)}
              value={selected}
            />
          </View>

          <TouchableOpacity style={{ paddingTop: 20 }}>
            <Button
              color="#F75369"
              title="Submit"
              onPress={handlePostRecipient}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 30,
    borderBottomWidth: 1.5, // Add borderBottomWidth
    borderBottomColor: 'black',
    marginBottom: 10,
    fontSize: 20,
  },
  inputTitle: {
    fontSize: 18,
    marginBottom: 5, // Add marginBottom to align text with the input
    color: 'black'
  },
  containerInput: {
    marginBottom: 10, // Increase marginBottom for better separation between inputs
  },
  dropdown: {
    borderWidth: 1,
    paddingHorizontal: 5,
    marginBottom: 10, // Increase marginBottom for better alignment with other inputs
  },
});