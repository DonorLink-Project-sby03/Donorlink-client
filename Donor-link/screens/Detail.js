import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import axios from "../instance/config";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import { AuthContext } from "../context/authContext";
import MapView, { Callout, Marker } from "react-native-maps";
import { TextInput } from "react-native-gesture-handler";
import MapViewDirections from "react-native-maps-directions";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { ProgressBar } from "react-native-paper";

export default function Detail() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [item, setItem] = useState({});
  const [stock, setStock] = useState("");
  const [profile, setProfile] = useState({});
  const [location, setLocation] = useState(null);
  const { fetchDonorByUsers } = useContext(AuthContext);
  // const [getCurrentLocation, setGetCurrentLocation] = useState({});

  const [draggableMarkerCoor, setDraggableMarkerCoor] = useState({
    longitude: 148.11,
    latitude: -26.85,
  });

  const { users } = useContext(AuthContext);
  // console.log('Users dari authcontext');
  // console.log(users, '<<<<< users');

  const onRegionChange = (region) => {
    console.log(region);
  };

  const getPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
    // setGetCurrentLocation({
    //   latitude: currentLocation.coords.latitude,
    //   longitude: currentLocation.coords.longitude,
    // });
    console.log("Location:");
    console.log(currentLocation);
  };

  const getRecipient = async () => {
    const { data } = await axios.get("/recipients/" + params.postId);
    setItem(data);
    // console.log(item, '<<<<< item didala function getRecipient');
  };

  const fetchProfile = async () => {
    try {
      const token = SecureStore.getItem("access_token");
      const { data } = await axios.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDonor = async () => {
    if (!profile) {
      Alert.alert("Profile", "Please complete your profile first");
      navigation.navigate("Profile");
    } else {
      try {
        const token = SecureStore.getItem("access_token");
        const { data } = await axios.post(
          "/donors/" + params.postId,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigation.navigate("History");
        fetchDonorByUsers();
      } catch (error) {
        console.log(error);
        Alert.alert(
          "NotAcceptable",
          "Sorry your blood type is not suitable for donation."
        );
      }
    }
  };

  useEffect(() => {
    getPermission();
    getRecipient();
    fetchProfile();
  }, []);

  // console.log(item, '<<<<< item');

  let latitude =
    params?.latitude !== undefined
      ? parseFloat(params.latitude)
      : -7.299675758351519;
  let longitude =
    params?.longitude !== undefined
      ? parseFloat(params.longitude)
      : 112.74147910997272;

  // index 1 adalah patient, index 2 adalah pendonor
  let locationOfInterest = [
    {
      title: params?.location.split("-")[0],
      location: {
        latitude,
        longitude,
      },
      description: params?.location.split("-")[1],
    },
    {
      title: "Your Location",
      location: location
        ? location
        : { latitude: -7.299675758351519, longitude: 112.74147910997272 },
      description: "Your current location",
    },
  ];

  const showLocationOfInterest = () => {
    return locationOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      );
    });
  };

  useEffect(() => {
    item;
  }, []);
  let donation = 0;
  item?.Donors?.forEach((donor) => {
    if (donor?.DonorConfirmation) {
      donation += donor.DonorConfirmation.stock;
    }
  });
  console.log(donation, "<<<<");
  let total = (donation / (item?.stock || 1)) * 100;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <MapView
        style={{ width: "100%", height: "50%" }}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: latitude,
          latitudeDelta: 0.24357150578851883,
          longitude: longitude,
          longitudeDelta: 0.1615377143025114,
        }}
      >
        {showLocationOfInterest()}
        {console.log(
          locationOfInterest[0].location,
          "<<<<<< locationOfInterest[0].location"
        )}
        {console.log(
          locationOfInterest[1].location,
          "<<<<<< locationOfInterest[1].location"
        )}
        <MapViewDirections
          origin={locationOfInterest[0].location}
          destination={locationOfInterest[1].location}
          apikey="AIzaSyCJJQ3KtSkbrywHS05Ak240jULhiwEmpk0"
          strokeWidth={3}
          strokeColor="pink"
        />
      </MapView>
      <ScrollView>
        <View style={{paddingHorizontal: 0, marginHorizontal: 45}}>
          {/* <Image source={{ uri: item.image }} style={{ width: '100%', height: 300 }} /> */}
          <View style={{ marginTop: 10}}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 20 }}>{item?.description}</Text>
              </View>
              <View
                style={{ flexDirection: "row", marginBottom: 5, marginTop: 10 }}
              >
                <MaterialIcons name="bloodtype" size={30} color="red" />
                <Text style={{ fontSize: 20, color: "red" }}>
                  {item?.bloodType}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Text style={{ marginLeft: 5, fontSize: 20, color: "grey" }}>
                {donation ? donation + "ml" : ""} collected from {total + "ml"} total
              </Text>
              </View>
              <ProgressBar
                    progress={total / 100}
                    color="red"
                    style={{ marginTop: 10, height: 10, borderRadius: 2, width: 322 }}
                  />
                <TouchableOpacity onPress={() => handleDonor()}>
            <View
              style={{
                alignItems: "center",
                height: 40,
                width: 325,
                backgroundColor: "#F75369",
                justifyContent: "center",
                borderRadius: 10,
                marginTop: 30,
              }}
            >
                <Text style={{fontSize: 20, color: 'white'}}>Apply</Text>
            </View>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
