import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CardChat from "../components/CardChat";
import * as SecureStore from 'expo-secure-store';
import axios from "../instance/config";
import { useContext, useDebugValue, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { TextInput } from "react-native-gesture-handler";

export default function HomePages({ navigation }) {
  const [search, setSearch] = useState("")
  const [dataSearch, setDataSearch] = useState(null)
  const { items } = useContext(AuthContext);
  const token = SecureStore.getItem('access_token');
  
  const handlePress = async () => {
    console.log("Tekan");
    try {
      const { data } = await axios.get(`/recipients?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataSearch(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fffdfb" }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 35,
            alignItems: "center",
            position: "relative", // Menetapkan posisi relatif untuk menggunakan zIndex
            marginTop: 10
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="Search location..."
              placeholderTextColor={"#DDDDDD"}
              value={search}
              onChangeText={setSearch}
              style={{
                zIndex: 1, // Menetapkan zIndex pada TextInput
                height: 35,
                width: 230,
                backgroundColor: "#fbfbfb",
                borderRadius: 10,
                paddingLeft: 10,
                fontSize: 20
              }}
            ></TextInput>
          </View>
          <View
            style={{
              height: 35,
              width: 60,
              borderRadius: 10,
              backgroundColor: "#F75369",
              justifyContent: "center",
              marginLeft: 10,
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Text onPress={handlePress} style={{color: 'white'}}>Find</Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          !dataSearch ? (
            items.map((data) => {
              return <CardChat key={data.id} data={data} />;
            })
          ) : (
            dataSearch.map((data) => {
              return <CardChat key={data.id} data={data} />;
            })
          )
        }
        
      </ScrollView>
    </SafeAreaView>
  );
}
