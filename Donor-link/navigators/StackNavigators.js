// StackNavigator.js
import { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import { AuthContext } from "../context/authContext";
import LoginScreen from "../screens/LoginScreen";
import Detail from "../screens/Detail";
import RegisterScreen from "../screens/Register";
import ImgRecipient from "../screens/ImgRecipient";
import AddForm from "../screens/AddForm";
import ImgProfile from "../screens/ImgProfile";
import History from "../screens/History";
import ConfirmForm from "../screens/ConfimForm";
import ConfirmImg from "../screens/confirmImg";
import Recipient from "../screens/Recipient";
import { LandingPage } from "../screens/LandingPage";
import HomePages from "../screens/Home";
import { ProfileScreen } from "../screens/ProfileScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
  const { isSignedIn } = useContext(AuthContext);
  const [login, setLogin] = useState(false);
  console.log(isSignedIn, "<<<<");
  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="LandingPage"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomePages}
            options={{
              title: "Post",
              headerTintColor: "#F75369",
              headerTitleStyle: {
                fontSize: 30, // Atur ukuran teks
              },
            }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              title: "Detail",
              headerTintColor: "#F75369",
              headerTitleStyle: {
                fontSize: 30, // Atur ukuran teks
              },
            }}
          />
          <Stack.Screen
            name="ImgRecipient"
            component={ImgRecipient}
            options={{
              title: "Upload Image",
              headerTintColor: "#F75369",
              headerTitleStyle: {
                fontSize: 30, // Atur ukuran teks
              },
            }}
          />
          <Stack.Screen
            name="AddForm"
            component={AddForm}
            options={{
              title: "Add Profile",
              headerTintColor: "#F75369",
              headerTitleStyle: {
                fontSize: 30, // Atur ukuran teks
              },
            }}
          />
          <Stack.Screen
            name="ImgProfile"
            component={ImgProfile}
            options={{
              title: "Upload Image",
              headerTintColor: "#F75369",
              headerTitleStyle: {
                fontSize: 30, // Atur ukuran teks
              },
            }}
          />
          <Stack.Screen
            name="History"
            component={History}
            options={{
              title: "History",
              headerTintColor: "#F75369",
              headerTitleStyle: {
                fontSize: 30, // Atur ukuran teks
              },
            }}
          />
          <Stack.Screen
            name="Confirm"
            component={ConfirmForm}
            options={{
              title: "Confirmed",
              headerTintColor: "#F75369",
              headerTitleStyle: {
                fontSize: 30, // Atur ukuran teks
              },
            }}
          />
          <Stack.Screen
            name="ConfirmImg"
            component={ConfirmImg}
            options={{
              title: "Upload Image",
              headerTintColor: "#F75369",
              headerTitleStyle: {
                fontSize: 30, // Atur ukuran teks
              },
            }}
          />
          <Stack.Screen
            name="Recipants"
            component={Recipient}
            options={{
              title: "Add Post",
              headerTintColor: "#F75369",
              headerTitleStyle: {
                fontSize: 30, // Atur ukuran teks
              },
            }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: "Profile",
              headerTintColor: "#F75369",
              headerTitleStyle: {
                fontSize: 30, // Atur ukuran teks
              },
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
