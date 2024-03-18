// StackNavigator.js
import { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { AuthContext } from '../context/authContext';
import LoginScreen from '../screens/LoginScreen';
import Detail from '../screens/Detail';
import RegisterScreen from '../screens/Register';

const Stack = createStackNavigator();

export default function StackNavigator() {
  const { isSignedIn } = useContext(AuthContext);
  const [login, setLogin] = useState(true);
  console.log(isSignedIn, '<<<<');
  return (
    <Stack.Navigator>
      {login ? (
        <>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={TabNavigator} />
          <Stack.Screen name="Detail" component={Detail} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
