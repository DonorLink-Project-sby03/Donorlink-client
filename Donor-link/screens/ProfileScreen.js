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

  const { users } = useContext(AuthContext);
  const [data, setData] = useState("");
  const [user, setUser] = useState("");

  const navigation = useNavigation();
  const { fetchUser, users } = useContext(AuthContext);

  const { setIsSignedIn } = useContext(AuthContext);
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
  console.log(user, "profile");
  console.log(users, "profile juga");
  const createdAtDate = new Date(data.createdAt);
  const testDate = new Date();
  if (
    createdAtDate.getDate() === testDate.getDate() &&
    createdAtDate.getMonth() === testDate.getMonth() &&
    createdAtDate.getFullYear() === testDate.getFullYear()
  ) {
    // Format tanggal dari createdAt menjadi "DD MMM YYYY"
    const formattedDate = format(createdAtDate, "dd MMM yyyy");
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={styles.rowContainer}>
      <View style={styles.outerCircle}>
    <Image source={{ uri: data?.imageUrl }} style={styles.imageStyle} />
  </View>
        {data.User?.name.split(" ").length === 1 ||
        users?.name.split(" ").length === 1 ? (
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            {users?.name || data?.User.name}
          </Text>
        ) : (
          <View>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              {data?.User?.name.split(" ")[0] || users?.name.split(" ")[0]}
            </Text>
            <Text style={{ fontSize: 25 }}>
              {data?.User?.name.split(" ").slice(1).join(" ") ||
                users.name.split(" ").slice(1).join(" ")}
            </Text>
          </View>
        )}
      </View>
      <View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.row}>
            <Text style={styles.pribadi}>Data Pribadi</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.pribadi}>No Identitas</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.pribadiRight}>{data?.identityNumber} </Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(data?.identityNumber)}
              >
                <FontAwesome6 name="copy" size={24} color="#F75369" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.data}>
            <Text style={styles.pribadi}>Gender</Text>
            <Text style={styles.pribadiRight}>{data?.gender}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.pribadi}>Alamat</Text>
            <Text style={styles.pribadiRight}>{data?.address}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.pribadi}>Pekerjaan</Text>
            <Text style={styles.pribadiRight}>{data?.job}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.pribadi}>No Telephone</Text>
            <Text style={styles.pribadiRight}>{data?.phoneNumber}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.pribadi}>Golongan Darah</Text>
            <Text style={styles.pribadiRight}>{data?.bloodType}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.pribadi}>Dibuat pada</Text>
            <Text style={styles.pribadiRight}>
              {createdAtDate.getDate()} {monthNames[createdAtDate.getMonth()]}{" "}
              {createdAtDate.getFullYear()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    paddingHorizontal: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-betweens",
    backgroundColor: "#efecec",
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
    paddingHorizontal: 15,
  },
  pribadi: {
    fontSize: 23,
    color: "grey",
    paddingBottom: 10,
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
    borderWidth: 5, // Lebar garis lingkaran
    borderBottomColor: "black", // Warna garis lingkaran bagian bawah
    borderBottomWidth: 1, // Lebar garis lingkaran bagian bawah
  },
});
