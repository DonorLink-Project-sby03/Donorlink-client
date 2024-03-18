import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground, // Import ImageBackground
} from "react-native";
import * as SecureStore from "expo-secure-store";
import instance from "../instance/config";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();
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
      console.log(data, "<<<<");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error, "<<<");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://c4.wallpaperflare.com/wallpaper/345/983/615/digital-art-nature-mountains-portrait-display-wallpaper-preview.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Warna latar belakang dengan transparansi
            padding: 15,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 20
          }}
        >
          <Text style={styles.title}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={"#222831"}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={"#222831"}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"#222831"}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"#222831"}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <Text style={{ fontSize: 16 }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{ color: "#3d6cb9", textAlign: "center", fontSize: 16 }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover", // Untuk menyesuaikan gambar dengan ukuran layar
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "85%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#FCFFFD',
  },
  button: {
    backgroundColor: "#305973",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 245  
  },
});
