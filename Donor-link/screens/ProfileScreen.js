import { Image, ImageBackground, StatusBar, Text, View } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export const ProfileScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} backgroundColor="#212121" />
      <ImageBackground
      source={{ uri: 'https://media.istockphoto.com/id/1266747084/id/foto/donor-mendonorkan-darah.jpg?s=612x612&w=0&k=20&c=CU-6mfnT4lODDqbzg9fxHwoa8Z5Pk5_qE2KAyFJ-h94='}}
      style={{flex: 0.5}} resizeMode={'cover'}>
      <View style={{ flex: 0.5, backgroundColor: "212121" }}></View>
      </ImageBackground>
      <View style={{ flex: 1, backgroundColor: "FFFFFF" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{
              uri: "https://c4.wallpaperflare.com/wallpaper/220/63/579/4k-anime-girl-darling-in-the-franxx-ichigo-wallpaper-preview.jpg",
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              borderWidth: 3,
              borderColor: "#FFFFFF",
              position: 'absolute',
              zIndex: 2
            }}
          />
        </View>
        <View>
          <Text
            style={{ fontWeight: "bold", fontSize: 18, textAlign: "center", marginTop: 60 }}
          >
            Bintang Qurne
          </Text>
          <Text style={{ textAlign: "center" }}>Bintang</Text>
          <View style={{ marginLeft: 110 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 45
              }}
            >
              <Foundation name="telephone" size={35} color="black" />
              <View style={{ justifyContent: "center", marginLeft: 25 }}>
                <Text>0873-4678-9678</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 45
              }}
            >
              <Entypo name="location" size={25} color="black" />
              <View style={{ justifyContent: "center", marginLeft: 25 }}>
                <Text>0873-4678-9678</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 45
              }}
            >
              <Entypo name="suitcase" size={25} color="black" />
              <View style={{ justifyContent: "center", marginLeft: 25 }}>
                <Text>Guru</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 45
              }}
            >
              <Entypo name="v-card" size={25} color="black" />
              <View style={{ justifyContent: "center", marginLeft: 25 }}>
                <Text>No Identitas</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 45
              }}
            >
              <FontAwesome name="birthday-cake" size={25} color="black" />
              <View style={{ justifyContent: "center", marginLeft: 25 }}>
                <Text>Guru</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
