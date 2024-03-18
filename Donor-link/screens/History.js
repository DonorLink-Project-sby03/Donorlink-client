import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import axios from '../instance/config';
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from 'react-native-gesture-handler';

export default function History() {
  const [history, setHistory] = useState([]);
  const token = SecureStore.getItem('access_token');

  const fetchDonorByUsers = async () => {
    const { data } = await axios.get('/donors', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setHistory(data);
  };

  useEffect(() => {
    fetchDonorByUsers();
  }, []);

  console.log(history, '<<<< dari history');
  return (
    <SafeAreaView>
      <ScrollView>
        {history.map((el, i) => {
          return (
            <View key={i} style={styles.container}>
              <View style={styles.containerInner}>
                {/* {console.log(el?.Recipient?.bloodType, '<<<<<<<')} */}
                {console.log(el, '<<<<<<<')}
                <Text>Id: {el.id}</Text>
                <Text>Name: {el?.Recipient?.User?.name}</Text>
                <Text>Description: {el?.Recipient?.description}</Text>
                <Text>Location: {el?.Recipient?.location}</Text>
                <Text>Jumlalh donor: {el?.stock}</Text>
              </View>
              <View style={styles.btnApply}>
                <Button title="Apply" onPress={() => console.log('aku terclick')} />
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
    backgroundColor: '',
  },
  containerInner: {
    paddingHorizontal: 10,
    backgroundColor: 'pink',
  },
  btnApply: {
    marginBottom: 10,
  },
});
