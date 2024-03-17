import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import * as SecureStore from 'expo-secure-store'
import instance from "../instance/config";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async () => {
    try {
      const { data } = await instance.post("/users", {
        name: name,
        username: username,
        email: email,
        password: password,
      });
      console.log(data, '<<<<');
      navigation.navigate("Login");
    } catch (error) {
      console.log(error, '<<<');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
      <TouchableOpacity style={styles.button} onPress={registerHandler}>
        <Text style={styles.buttonText}>Register</Text>
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
