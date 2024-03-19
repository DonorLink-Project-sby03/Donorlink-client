import {
  Button,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { useContext, useEffect, useState } from "react";
import instance from "../instance/config";
import { Fontisto } from '@expo/vector-icons';

export const ProfileScreen = () => {
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const navigation = useNavigation();
  const { fetchUser, users } = useContext(AuthContext);

  let getData = async () => {
    try {
      const { data } = await instance({
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access_token"
          )}`,
        },
        method: "GET",
        url: "/profile/",
      });
      setData(data);
    } catch (error) {
      console.log();
    }
  };

  let getDataUser = async () => {
    try {
      const { data } = await instance({
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access_token"
          )}`,
        },
        method: "GET",
        url: "/users/",
      });
      setUser(data);
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    getData();
    getDataUser();
  }, []);

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
  }
  console.log(data,'<< data ');
  console.log(users,'<< users');

  return (
    <View style={{ flex: 1, backgroundColor:'blue' }}>
      <StatusBar barStyle={"light-content"} backgroundColor="#212121" />
      <ImageBackground
        source={require("../assets/logo.png")}
        style={{
          flex: 0.5,
          borderBottomLeftRadius: 100,
          borderBottomRightRadius: 100,
          width: 100,
          height: 100,
          backgroundColor: 'pink'
        }}
        resizeMode={"cover"}
      >
        <View style={{ flex: 0.5, backgroundColor: "212121" }}></View>
      </ImageBackground>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{
              uri:
                users.Profile &&  users.Profile?.imageUrl
                  ? users.Profile?.imageUrl
                  : "https://th.bing.com/th/id/OIP.xo-BCC1ZKFpLL65D93eHcgHaGe?rs=1&pid=ImgDetMain",
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              borderWidth: 3,
              borderColor: "#FFFFFF",
              position: "absolute",
              zIndex: 2,
              backgroundColor: "red",
            }}
          />
        </View>
        {data || users ? (
          <View>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 25,
                  textAlign: "center",
                  marginTop: 60,
                }}
              >
                {users.name}
              </Text>
              <View style={{ marginLeft: 110 }}>
              <View style={styles.rowContainer}>
                <Fontisto name="blood-drop" size={24} color="#F75369" />
                <View style={styles.textContainer}>
                  <Text>{users.Profile?.bloodType}</Text>
                </View>
              </View>
                <View style={styles.rowContainer}>
                  <Foundation name="telephone" size={35} color="#F75369" />
                  <View style={styles.textContainer}>
                    <Text>{users.Profile?.phoneNumber}</Text>
                  </View>
                </View>
                <View style={styles.rowContainer}>
                  <Entypo name="location" size={25} color="#F75369" />
                  <View style={styles.textContainer}>
                    <Text>{users.Profile?.address}</Text>
                  </View>
                </View>
                <View style={styles.rowContainer}>
                  <Entypo name="suitcase" size={25} color="#F75369" />
                  <View style={styles.textContainer}>
                    <Text>{users.Profile?.job}</Text>
                  </View>
                </View>
                <View style={styles.rowContainer}>
                  <Entypo name="v-card" size={25} color="#F75369" />
                  <View style={styles.textContainer}>
                    <Text>{users.Profile?.identityNumber}</Text>
                  </View>
                </View>
                <View style={styles.rowContainer}>
                  <FontAwesome name="birthday-cake" size={25} color="#F75369" />
                  <View style={styles.textContainer}>
                    <Text>{users.Profile?.dateOfBirth.split("T")[0]}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.logoutButtonContainer}>
              <TouchableOpacity
                onPress={handeLogout}
                style={styles.logoutButton}
              >
                <Feather name="log-out" size={30} color="#F75369" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.addButtonContainer}>
            <View style={styles.logoutButtonContainer}>
              <TouchableOpacity
                onPress={handeLogout}
                style={styles.logoutButton}
              >
                <Feather name="log-out" size={30} color="#F75369" />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 17 }}>
              Hello {user.username} please add profile information!
            </Text>
            <Button title="Add Profile" onPress={handleAddProfile} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = {
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  textContainer: {
    justifyContent: "center",
    marginLeft: 25,
  },
  addButtonContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  logoutButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  logoutButton: {
    flexDirection: "row", // Mengatur tata letak ke horizontal
    alignItems: "center", // Mengatur penempatan vertikal ke tengah
  },
  logoutButtonText: {
    marginLeft: 5, // Jarak antara ikon dan teks
  },
};
