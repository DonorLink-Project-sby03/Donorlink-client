import { useContext, useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  Feather,
  MaterialIcons,
  FontAwesome6,
  Fontisto,
} from "@expo/vector-icons";
import axios from "../instance/config";
import * as SecureStore from "expo-secure-store";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import Recipient from "./Recipient";

export default function History() {
  const { history, setHistory } = useContext(AuthContext);
  const navigation = useNavigation();
  const token = SecureStore.getItem("access_token");
  console.log(history, "<<<< dari history");

  const fetchDonorByUsers = async () => {
    const { data } = await axios.get("/donors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setHistory(data);
  };

  useEffect(() => {
    fetchDonorByUsers();
  }, []);

  console.log(history, "<<<< dari history");
  return (
    <SafeAreaView>
      <ScrollView>
        {history.map((el, i) => {
          return (
            <View>
              <View key={i} style={styles.cardContainer}>
                <View style={styles.containerInner}>
                  <View>
                    <View
                      style={{
                        marginBottom: 5,
                        flexDirection: "row",
                        justifyContent: 'space-between',
                      }}
                    >
                      <View>
                        <View style={{ flexDirection: "row" }}>
                          <Feather name="user" size={24} color="#F75369" />
                          <Text style={{ marginLeft: 5, fontSize: 18 }}>
                            {el?.Recipient?.User?.name}
                          </Text>
                        <View style={{ flexDirection: "row" }}>
                          <Fontisto
                            style={{ marginLeft: 60 }}
                            name="blood"
                            size={24}
                            color="#F75369"
                            />
                          <Text
                            style={{
                              marginLeft: 15,
                              fontSize: 18,
                              color: "#F75369",
                            }}
                            >
                            {el?.Recipient?.stock} ml
                          </Text>
                        </View>
                            </View>
                      </View>
                    </View>

                    <View style={styles.wrapText}>
                      <MaterialIcons
                        name="description"
                        size={24}
                        color="#F75369"
                      />
                      <Text style={{fontSize: 18, marginLeft: 5, marginRight: 30 }}>
                        {el?.Recipient?.description}
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', marginLeft: 4}}>
                      <FontAwesome6
                        name="location-dot"
                        size={24}
                        color="#F75369"
                      />
                      <Text style={{ marginLeft: 5, fontSize: 18 }}>
                        {el?.Recipient?.location}
                      </Text>
                    </View>
                  </View>
                </View>
                {!el?.DonorConfirmation ? (
                  <View style={styles.btnApply}>
                    <Button
                      title="Apply"
                      color={"#F75369"}
                      onPress={() =>
                        navigation.navigate("Confirm", {
                          donorId: el.id,
                          stockRecipient: el?.Recipient?.stock,
                        })
                      }
                    />
                  </View>
                ) : (
                  <View style={{backgroundColor: '#F75369'}}>
                    <Button
                      disabled
                      title="Complete"
                      color="#F75369"
                    />
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  containerInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fcfcfc",
  },
  wrapText: {
    flexDirection: "row",
    marginBottom: 5,
  },
  textStyle: {
    marginLeft: 5,
    textAlignVertical: "center",
  },
  iconStyle: {
    marginRight: 10,
  },
  cardContainer: {
    backgroundColor: "#f7f7f7", // Warna abu-abu
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    margin: 10,
  },
  cardContent: {
    flexDirection: "row",
    padding: 15,
  },
});
