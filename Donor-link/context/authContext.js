import { createContext, useEffect, useState } from 'react';
import axios from '../instance/config';
import * as SecureStore from 'expo-secure-store';
export const AuthContext = createContext('');

export default function AuthContextProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState({});
  const token = SecureStore.getItem('access_token');

  const fetchRecipients = async () => {
    try {
      const { data } = await axios.get('/recipients/');
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDonorByUsers = async () => {
    const { data } = await axios.get('/donors', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setHistory(data);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(data);
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
    fetchDonorByUsers();
    fetchRecipients();
    fetchUser();
    getToken();
  }, []);

  return <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, items, setItems, history, setHistory, users }}>{children}</AuthContext.Provider>;
}
