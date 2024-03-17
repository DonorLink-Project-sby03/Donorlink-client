import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import * as SecureStore from 'expo-secure-store'
import instance from "../instance/config";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email, password
        }
      })
      console.log(data.access_token);
      await SecureStore.setItemAsync("access_token", data.access_token);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(email);
  console.log(password);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={submitHandler}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
