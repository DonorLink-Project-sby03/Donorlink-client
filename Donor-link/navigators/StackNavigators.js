// StackNavigator.js
import { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { AuthContext } from '../context/authContext';
import LoginScreen from '../screens/LoginScreen';
import Detail from '../screens/Detail';
import RegisterScreen from '../screens/Register';
import ImgRecipient from '../screens/ImgRecipient';
import AddForm from '../screens/AddForm';
import ImgProfile from '../screens/ImgProfile';
import History from '../screens/History';

const Stack = createStackNavigator();

export default function StackNavigator() {
  const { isSignedIn } = useContext(AuthContext);
  const [login, setLogin] = useState(false);
  console.log(isSignedIn, '<<<<');
  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={TabNavigator} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="ImgRecipient" component={ImgRecipient} />
          <Stack.Screen name="AddForm" component={AddForm} />
          <Stack.Screen name="ImgProfile" component={ImgProfile} />
          <Stack.Screen name="History" component={History} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
