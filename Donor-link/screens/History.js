import { useContext, useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import axios from '../instance/config';
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';

export default function History() {
  const { history, setHistory } = useContext(AuthContext);
  const navigation = useNavigation();
  const token = SecureStore.getItem('access_token');
  console.log(history, '<<<< dari history');

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

  // console.log(history, '<<<< dari history');
  return (
    <SafeAreaView>
      <ScrollView>
        {history.map((el, i) => {
          return (
            <View key={i} style={styles.container}>
              <View style={styles.containerInner}>
                {/* {console.log(el?.Recipient?.bloodType, '<<<<<<<')} */}
                {console.log(el, '<<<<<<< stock')}
                <Text style={styles.textStyle}>Id: {el?.UserId}</Text>
                <Text style={styles.textStyle}>Name: {el?.Recipient?.User?.name}</Text>
                <Text style={styles.textStyle}>Description: {el?.Recipient?.description}</Text>
                <Text style={styles.textStyle}>Location: {el?.Recipient?.location}</Text>
                <Text style={styles.textStyle}>Jumlalh donor: {el?.Recipient?.stock} ml</Text>
              </View>
              {!el?.DonorConfirmation ? (
                <View style={styles.btnApply}>
                  <Button
                    title="Apply"
                    onPress={() =>
                      navigation.navigate('Confirm', {
                        donorId: el.id,
                        stockRecipient: el?.Recipient?.stock,
                      })
                    }
                  />
                </View>
              ) : (
                <View style={styles.btnApply}>
                  <Button
                    disabled
                    title="Complete"
                    onPress={() =>
                      navigation.navigate('Confirm', {
                        donorId: el.id,
                      })
                    }
                  />
                </View>
              )}
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
    paddingHorizontal: 10,
    backgroundColor: 'grey',
  },
  textStyle: {
    color: 'white',
  },
  btnApply: {
    marginBottom: 10,
  },
});
