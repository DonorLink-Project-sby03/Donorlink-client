import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

export default function LoginScreen({ navigation }) {
    async function handleSubmit() {
        try {
          navigation.navigate("Home");
        } catch (error) {
          Alert.alert("Login Error", error.message);
        }
      }

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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