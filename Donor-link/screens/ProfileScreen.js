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
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { useContext, useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import instance from "../instance/config";
import { FontAwesome6 } from "@expo/vector-icons";
import { format } from "date-fns";

export const ProfileScreen = () => {
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

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    alert("Text copied to clipboard!");
  };

  const navigation = useNavigation();
  const { fetchUser, users, setIsSignedIn } = useContext(AuthContext);
  console.log(users, "users");
  const handeLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      setIsSignedIn(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddProfile = async () => {
    try {
      navigation.navigate("AddForm");
    } catch (error) {
      console.log(error);
    }
  };
  const createdAtDate = new Date(users?.createdAt);
  const testDate = new Date();
  if (
    createdAtDate.getDate() === testDate.getDate() &&
    createdAtDate.getMonth() === testDate.getMonth() &&
    createdAtDate.getFullYear() === testDate.getFullYear()
  ) {
    const formattedDate = format(createdAtDate, "dd MMM yyyy");
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {users?.Profile !== null ? (
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
          <View style={{marginLeft: 30}}>
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
            <View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>No Identity</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.pribadiRight}>
                    {users?.Profile?.identityNumber}{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      copyToClipboard(users?.Profile?.identityNumber)
                    }
                  >
                    <FontAwesome6 name="copy" size={24} color="#F75369" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Gender</Text>
                <Text style={styles.pribadiRight}>
                  {users?.Profile?.gender}
                </Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Address</Text>
                <Text style={styles.pribadiRight}>
                  {users?.Profile?.address}
                </Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Job</Text>
                <Text style={styles.pribadiRight}>{users?.Profile?.job}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Phone</Text>
                <Text style={styles.pribadiRight}>
                  {users?.Profile?.phoneNumber}
                </Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Blood Type</Text>
                <Text style={styles.pribadiRight}>
                  {users?.Profile?.bloodType}
                </Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Created On</Text>
                <Text style={styles.pribadiRight}>
                  {createdAtDate.getDate()}{" "}
                  {monthNames[createdAtDate.getMonth()]}{" "}
                  {createdAtDate.getFullYear()}
                </Text>
              </View>
              <TouchableOpacity onPress={handeLogout}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginHorizontal: 15,
                    backgroundColor: "#F75369",
                    marginVertical: 7,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 23, color: "white", paddingBottom: 10 }}
                  >
                    Logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TouchableOpacity onPress={handleAddProfile}>
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
                Add Profile
              </Text>
            </View>
          </TouchableOpacity>
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
    paddingHorizontal: 37,
    alignItems: 'center'
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-betweens",
    backgroundColor: "#efecec",
    paddingHorizontal: 15,
  },
  imageStyle: {
    width: 89,
    height: 89,
    borderRadius: 50,
    color: "white",
    backgroundColor: "white",
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    backgroundColor: "#fcfcfc",
    marginVertical: 7,
    borderRadius: 10,
    paddingHorizontal: 25,
  },
  pribadi: {
    fontSize: 18,
    color: "grey",
    paddingBottom: 10,
  },
  pribadiRight: {
    fontSize: 18,
    color: "black",
    paddingBottom: 10,
  },
  outerCircle: {
    width: 103, // Lebih besar dari ukuran gambar
    height: 103, // Lebih besar dari ukuran gambar
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
});
