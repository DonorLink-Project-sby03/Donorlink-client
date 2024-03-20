import { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import instance from "../instance/config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isSignedIn, setIsSignedIn, fetchUser } = useContext(AuthContext);

  const submitHandler = async () => {
    try {
      const { data } = await instance.post("/login", {
        email,
        password,
      });
      let token = await SecureStore.setItemAsync(
        "access_token",
        data.access_token
      );
      setIsSignedIn(true);
      fetchUser();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        // Code to execute after 5 seconds
      }, 5000);
    }
  };
  console.log(email);
  console.log(password);

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
          <View style={styles.translucentBox}>
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
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text
                  style={{
                    color: "#f8546c",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  register
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
    top: "12%",
    alignItems: "center",
    alignSelf: "center",
  },
  translucentBox: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparansi 80%
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
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
