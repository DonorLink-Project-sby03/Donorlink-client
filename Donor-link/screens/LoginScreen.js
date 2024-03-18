import { useContext, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground } from "react-native";
import * as SecureStore from 'expo-secure-store'
import instance from "../instance/config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";

export default function LoginScreen() {
  const navigation = useNavigation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isSignedIn, setIsSignedIn} = useContext(AuthContext)

  const submitHandler = async () => {
    try {
      const { data } = await instance.post('/login', {
        email,
        password
      })
      console.log(data.access_token);
      let token = await SecureStore.setItemAsync("access_token", data.access_token);
      setIsSignedIn(true)
    } catch (error) {
      console.log(error);
    }
  };
  console.log(email);
  console.log(password);

  return (
    <ImageBackground
      source={{
        uri: "https://c4.wallpaperflare.com/wallpaper/345/983/615/digital-art-nature-mountains-portrait-display-wallpaper-preview.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.container}>
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
          <View style={{ flexDirection: 'row', paddingTop: 10 }}> 
            <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{  color: "#3d6cb9", textAlign: "center", fontSize: 16 }}>register</Text>
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
    resizeMode: "cover",
    justifyContent: "center",
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