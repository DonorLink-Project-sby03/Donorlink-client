import {
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";

export default function CardChat({ data }) {
  const navigation = useNavigation();
  useEffect(() => {
    data;
  }, []);

  let donation = 0;
  data.Donors.forEach((donor) => {
    if (donor.DonorConfirmation) {
      // Pastikan DonorConfirmation tidak null
      donation += donor.DonorConfirmation.stock;
    }
  });
  console.log(donation, "<<<<");
  let total = (donation / data.stock) * 100;

  // Menghitung persentase donasi masuk
  return (
    <SafeAreaView>
    <ScrollView style={styles.scrollView}>
      {data === undefined ? (
        null
      ) : (
        <View style={{flex: 1, backgroundColor: "white"}}>
          <View>
            <View key={data.createdAt}>
              <View style={styles.cardContainer}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Detail", {
                      postId: data.id,
                      bloodType: data.bloodType,
                      latitude: data.latitude,
                      longitude: data.longitude,
                      location: data.location,
                    })
                  }
                >
                  <View style={styles.cardContent}>
                    <Image
                      source={{ uri: data?.image }}
                      style={{
                        backgroundColor: "black",
                        width: 130,
                        height: 130,
                        borderRadius: 10,
                        marginRight: 10,
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {data?.User?.username === undefined ? (
                          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            Unknown
                          </Text>
                        ) : (
                          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            {data?.User?.username &&
                              data.User.username.split(" ")[0]}
                          </Text>
                        )}
                        <View style={{ flexDirection: "row" }}>
                          <MaterialIcons
                            name="bloodtype"
                            size={25}
                            color="#F75369"
                          />
                          <Text style={{ fontSize: 17, color: "#F75369" }}>
                            {data?.bloodType}{" "}
                          </Text>
                        </View>
                      </View>
                      <Text style={{ fontSize: 17, marginBottom: 27 }}>
                        {data.description.split(" ").slice(0, 3).join(" ")}
                        {data.description.split(" ").length > 3 && "..."}
                      </Text>
                      <Text style={{ marginTop: 10, fontSize: 17 }}>
                        Donor: {donation}ml of {data.stock}ml
                      </Text>
                      <ProgressBar
                        progress={total / 100}
                        color="red"
                        style={{ marginTop: 10, height: 10, borderRadius: 10 }}
                      />
                    </View>
                  </View>
                </Pressable>
              </View>
              <View
                style={{
                  height: 2,
                  backgroundColor: "#F75369",
                  alignSelf: "stretch",
                  marginTop: 2,
                  marginHorizontal: 15,
                }}
              />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  </SafeAreaView>
  
  );  
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fcfcfc", // Warna abu-abu
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    margin: 10,
  },
  cardContent: {
    flexDirection: "row",
    padding: 15,
  },
  scrollView: {
    marginHorizontal: 10,
    height: 200,
  },
});
