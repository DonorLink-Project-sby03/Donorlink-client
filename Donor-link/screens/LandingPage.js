import {
  Button,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Clipboard,
} from "react-native";
import { FontAwesome5, FontAwesome, Feather, MaterialIcons, Fontisto, Ionicons, MaterialCommunityIcons  } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { useContext, useEffect, useState } from "react";

export const LandingPage = () => {
  const [backgroundColor, setBackgroundColor] = useState("#F75369");

  const handlePress = () => {
    setBackgroundColor("#F75369");
  };
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const navigation = useNavigation();
  const { fetchUser, users, setIsSignedIn, fetchRecipients, fetchDonorByUsers } = useContext(AuthContext);
  console.log(users, "users");

  const handeLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      setIsSignedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecipients = async () => {
    try {
      navigation.navigate("Home");
      fetchRecipients()
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfile = async () => {
    try {
      navigation.navigate("Profile");
      fetchUser()
    } catch (error) {
      console.log(error);
    }
  };

  const handleHistory = async () => {
    try {
      navigation.navigate("History");
      fetchDonorByUsers()
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRecipients = async () => {
    try {
      navigation.navigate("Recipants");
    } catch (error) {
      console.log(error);
    }
  };
  let color = "#F75369";

  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <>
        <View style={styles.rowContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.overlay} />
            {users?.Profile?.imageUrl === null ||
            users?.Profile?.imageUrl === "" ||
            users?.Profile?.imageUrl === undefined ? (
              <Image
                source={require("../assets/user.png")}
                style={styles.imageStyle}
              />
            ) : (
              <Image
                source={{ uri: users?.Profile?.imageUrl }}
                style={styles.imageStyle}
              />
            )}
          </View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            {users?.name?.includes(" ") ? (
              <>
                {users.name.split(" ").slice(0, 1).join(" ")}
                {"\n"}
                {users.name.split(" ").slice(1).join(" ")}
              </>
            ) : (
              users?.name
            )}
          </Text>
        </View>
        <View style={{ marginTop: 16, paddingBottom: 10 }}>
          <View
            style={{
              height: 3,
              backgroundColor: "#F75369",
              alignSelf: "stretch",
              marginBottom: 15,
            }}
          />
          {/* Profile and Postingan */}
          <View style={styles.rowContainer}> 
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.touchable, { backgroundColor: backgroundColor }]}
              onPress={handleProfile}
            >
              <View style={styles.viewButton}>
                <View style={styles.data}>
                  <FontAwesome5 name="user-circle" size={35} color={color} />
                  <Text>My Account</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.touchable, { backgroundColor: backgroundColor }]}
              onPress={handleRecipients}
            >
              <View style={styles.viewButton}>
                <View style={styles.data}>
                <MaterialCommunityIcons name="file-document-multiple-outline" size={35} color={color} />
                  <Text>Post</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* History and Add Recipents */}
          <View style={styles.rowContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.touchable, { backgroundColor: backgroundColor }]}
              onPress={handleHistory}
            >
              <View style={styles.viewButton}>
                <View style={styles.data}>
                  <Fontisto name="history" size={35} color={color} />
                  <Text>History</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.touchable, { backgroundColor: backgroundColor }]}
              onPress={handleAddRecipients}
            >
              <View style={styles.viewButton}>
                <View style={styles.data}>
                  <Ionicons name="add" size={35} color={color} />
                  <Text>Add Recipients</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* Logout */}
          <TouchableOpacity onPress={handeLogout}>
        <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginHorizontal: 15,
              backgroundColor: "#F75369",
              marginVertical: 10,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 23, color: "white", paddingBottom: 10 }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  touchable: {
    backgroundColor: "#F75369",
    borderRadius: 15,
    color: "#F75369",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 78,
    height: 78,
    borderRadius: 50,
    color: "white",
    backgroundColor: "white",
  },
  viewButton: {
    backgroundColor: "#fcfcfc",
    padding: 30,
    height: 125,
    width: 150,
    borderRadius: 10,
  },
  pribadiRight: {
    fontSize: 24,
    color: "black",
    paddingBottom: 10,
  },
  outerCircle: {
    width: 94, // Lebih besar dari ukuran gambar
    height: 94, // Lebih besar dari ukuran gambar
    borderRadius: 75, // Setengah dari lebar dan tinggi untuk membuat lingkaran di luar
    overflow: "hidden", // Memastikan gambar tetap di dalam lingkaran
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#F75369", // Warna garis lingkaran
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: "100%", // Bagian kiri atas akan berubah warna
    height: "100%", // Bagian kiri atas akan berubah warna
    backgroundColor: "#F75369", // Warna overlay
    overflow: "hidden",
    alignItems: "center",
  },
  data: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
