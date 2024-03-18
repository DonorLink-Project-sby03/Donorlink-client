import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import instance from "../instance/config"; // Pastikan Anda mengimpor instance dengan benar
import * as SecureStore from "expo-secure-store";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-modern-datepicker";
import { Dropdown } from "react-native-element-dropdown";

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

export default function AddForm() {
  const [identityNo, setIdentityNo] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bloodType, setBloodType] = useState("");
  const navigation = useNavigation();
  console.log(dob, '<<');

  const submitHandler = async () => {
    try {
      const { data } = await instance.post(
        "/profile/",
        {
          identityNumber: identityNo,
          gender: gender,
          address: address,
          job: occupation,
          dateOfBirth: dob,
          phoneNumber: phone,
          imageUrl: imageUrl,
          bloodType: bloodType,
        },
        {
          headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync(
              "access_token"
            )}`,
          },
        }
      );
      navigation.navigate("ImgProfile", {
        id: data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
    <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.label}>No Identitas:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your identity number"
            value={identityNo}
            onChangeText={setIdentityNo}
          />
          <Text style={styles.label}>Jenis Kelamin:</Text>
          <View style={styles.radioContainer}>
            <RadioButton
              value="male"
              status={gender === "male" ? "checked" : "unchecked"}
              onPress={() => setGender("male")}
            />
            <Text style={styles.radioLabel}>Laki-laki</Text>
            <RadioButton
              value="female"
              status={gender === "female" ? "checked" : "unchecked"}
              onPress={() => setGender("female")}
            />
            <Text style={styles.radioLabel}>Perempuan</Text>
          </View>
          <Text style={styles.label}>Alamat:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
          />
          <Text style={styles.label}>Pekerjaan:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your occupation"
            value={occupation}
            onChangeText={setOccupation}
          />
          <Text style={styles.label}>Tanggal Lahir:</Text>
          <DatePicker
            onSelectedChange={(date) => setDob(date)}
          />
          <Text style={styles.label}>Nomer Telepon:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Text style={styles.label}>Golongan Darah:</Text>
            <Dropdown
              style={styles.dropdown}
              data={typeBlood}
              labelField="value"
              valueField="key"
              placeholder={bloodType ? bloodType : 'Select type blood'}
              onChange={(item) => {
                setBloodType(item.value);
              }}
              value={bloodType}
            />
          <TouchableOpacity style={styles.button} onPress={submitHandler}>
            <Text style={styles.buttonText}>Kirim</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  scrollView: {
    marginHorizontal: 10,
    height: 700
  },
});
