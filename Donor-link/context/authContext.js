import { createContext, useEffect, useState } from 'react';
import axios from '../instance/config';

export const AuthContext = createContext('');

export default function AuthContextProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const fetchRecipients = async () => {
    try {
      const { data } = await axios.get('/recipients');
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getToken() {
      try {
        let token = await SecureStore.getItemAsync('access_token');
        if (token) setIsSignedIn(true);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    }
    fetchRecipients();
    getToken();
  }, []);

  return <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, items, setItems }}>{children}</AuthContext.Provider>;
}
