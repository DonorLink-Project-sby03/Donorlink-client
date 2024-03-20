import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView, // Import ImageBackground
  Dimensions,
  KeyboardAvoidingView,
  Platform
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
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: "center",
        width: Dimensions.get("window").width,
      }}
      behavior={Platform.OS === "android" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.background}
          />
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Warna latar belakang dengan transparansi
              padding: 15,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 18,
              marginTop: 30
            }}
          >
            <Text style={styles.title}>Register</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={"grey"}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={"grey"}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={"grey"}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={"grey"}
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
                  style={{
                    color: "#f8546c",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#eeeeee", // Ubah warna latar belakang di sini
    position: "relative",
  },
  background: {
    resizeMode: "contain",
    justifyContent: "center",
    height: 120,
    width: 120,
    position: "absolute",
    top: "10%",
    alignItems: "center",
    alignSelf: "center",
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
    backgroundColor: "#FCFFFD",
  },
  button: {
    backgroundColor: "#f8546c",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 245,
  },
});
