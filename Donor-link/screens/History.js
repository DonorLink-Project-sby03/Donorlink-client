import { useContext, useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Feather, MaterialIcons, FontAwesome6, Fontisto } from '@expo/vector-icons';
import axios from '../instance/config';
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import Recipient from './Recipient';

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

  console.log(history, '<<<< dari history');
  return (
    <SafeAreaView>
      <ScrollView>
        {history.map((el, i) => {
          return (
            <View key={i} style={styles.container}>
              <View style={styles.containerInner}>
                {/* {console.log(el?.Recipient?.bloodType, '<<<<<<<')} */}
                {console.log(el, '<<<<<<< stock')}
                <View style={styles.wrapText}>
                  <Feather name="user" size={24} color="black" />
                  <Text style={{ marginLeft: 5, color: 'white' }}>{el?.Recipient?.User?.name}</Text>
                </View>

                <View style={styles.wrapText}>
                  <MaterialIcons name="description" size={24} color="black" />
                  <Text style={{ marginLeft: 5, color: 'white' }}>{el?.Recipient?.description}</Text>
                </View>

                <View style={styles.wrapText}>
                  <FontAwesome6 name="location-dot" size={24} color="black" />
                  <Text style={{ marginLeft: 10, color: 'white' }}>{el?.Recipient?.location}</Text>
                </View>

                <View style={styles.wrapText}>
                  <Fontisto style={{ marginLeft: 3 }} name="blood" size={24} color="black" />
                  <Text style={{ marginLeft: 15, color: 'white' }}>{el?.Recipient?.stock} ml</Text>
                </View>
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'grey',
  },
  wrapText: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  textStyle: {
    color: 'white',
    marginLeft: 5,
    textAlignVertical: 'center',
  },
  btnApply: {
    marginBottom: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
});
