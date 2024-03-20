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
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    alert('Text copied to clipboard!');
  };

  const navigation = useNavigation();
  const { fetchUser, users } = useContext(AuthContext);
  console.log(users, 'users');
  const handeLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddProfile = async () => {
    try {
      navigation.navigate('AddForm');
    } catch (error) {
      console.log(error);
    }
  };
  const createdAtDate = new Date(users?.createdAt);
  const testDate = new Date();
  if (createdAtDate.getDate() === testDate.getDate() && createdAtDate.getMonth() === testDate.getMonth() && createdAtDate.getFullYear() === testDate.getFullYear()) {
    // Format tanggal dari createdAt menjadi "DD MMM YYYY"
    const formattedDate = format(createdAtDate, 'dd MMM yyyy');
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
              <Image source={{ uri: users?.Profile?.imageUrl }} style={styles.imageStyle} />
            </View>
            {users?.name.split(" ").length === 1 ||
            users?.name.split(" ").length === 1 ? (
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {users?.name}
              </Text>
            ) : (
              <View>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  {users?.name.split(" ")[0] || users?.name.split(" ")[0]}
                </Text>
                <Text style={{ fontSize: 25 }}>
                  {users?.name.split(" ").slice(1).join(" ") ||
                    users.name.split(" ").slice(1).join(" ")}
                </Text>
              </View>
            )}
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
                <Text style={styles.pribadi}>No Identitas</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.pribadiRight}>{users?.Profile?.identityNumber} </Text>
                  <TouchableOpacity
                    onPress={() => copyToClipboard(users?.Profile?.identityNumber)}
                  >
                    <FontAwesome6 name="copy" size={24} color="#F75369" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Gender</Text>
                <Text style={styles.pribadiRight}>{users?.Profile?.gender}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Alamat</Text>
                <Text style={styles.pribadiRight}>{users?.Profile?.address}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Pekerjaan</Text>
                <Text style={styles.pribadiRight}>{users?.Profile?.job}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>No Telephone</Text>
                <Text style={styles.pribadiRight}>{users?.Profile?.phoneNumber}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Golongan Darah</Text>
                <Text style={styles.pribadiRight}>{users?.Profile?.bloodType}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Dibuat pada</Text>
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
                  <Text style={{ fontSize: 23, color: "white", paddingBottom: 10 }}>
                    Logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {users?.name.split(' ').length === 1 ? (
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{users?.name}</Text>
            ) : (
              <View>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{users?.name.split(' ')[0]}</Text>
                <Text style={{ fontSize: 25 }}>{users.name.split(' ').slice(1).join(' ')}</Text>
              </View>
            )}
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-betweens',
    backgroundColor: '#efecec',
    paddingHorizontal: 15,
  },
  imageStyle: {
    width: 78,
    height: 78,
    borderRadius: 50,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    backgroundColor: "#f5f5f5",
    marginVertical: 7,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  pribadi: {
    fontSize: 23,
    color: 'grey',
    paddingBottom: 10,
  },
  pribadiRight: {
    fontSize: 24,
    color: 'black',
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
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: '100%', // Bagian kiri atas akan berubah warna
    height: '100%', // Bagian kiri atas akan berubah warna
    backgroundColor: '#F75369', // Warna overlay
    overflow: 'hidden',
    alignItems: 'center',
  },
});
