import { Button, Image, Text, TouchableOpacity, View, StyleSheet, Clipboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import { useContext, useEffect } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { format } from 'date-fns';

export const ProfileScreen = () => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    alert('Text copied to clipboard!');
  };

  const navigation = useNavigation();
  const { fetchUser, users } = useContext(AuthContext);

  const handeLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      setIsSignedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProfile = async () => {
    try {
      navigation.navigate('AddForm');
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(users.Profile.createdAt, "profile juga");
  const createdAtDate = new Date(users?.Profile?.createdAt);
  const testDate = new Date();
  if (createdAtDate.getDate() === testDate.getDate() && createdAtDate.getMonth() === testDate.getMonth() && createdAtDate.getFullYear() === testDate.getFullYear()) {
    // Format tanggal dari createdAt menjadi "DD MMM YYYY"
    const formattedDate = format(createdAtDate, 'dd MMM yyyy');
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View>
      {users.Profile ? (
        <View style={{ backgroundColor: 'white' }}>
          <View style={styles.rowContainer}>
            <View style={styles.outerCircle}>
              <Image source={{ uri: users.Profile.imageUrl }} style={styles.imageStyle} />
            </View>
            {users?.name.split(' ').length === 1 ? (
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{users?.name}</Text>
            ) : (
              <View>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{users?.name.split(' ')[0]}</Text>
                <Text style={{ fontSize: 25 }}>{users.name.split(' ').slice(1).join(' ')}</Text>
              </View>
            )}
          </View>
          <View>
            <View style={{ marginTop: 20 }}>
              <View style={styles.row}>
                <Text style={styles.pribadi}>Data Pribadi</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>No Identitas</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.pribadiRight}>{users.Profile?.identityNumber} </Text>
                  <TouchableOpacity onPress={() => copyToClipboard(users.Profile?.identityNumber)}>
                    <FontAwesome6 name="copy" size={24} color="#F75369" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Gender</Text>
                <Text style={styles.pribadiRight}>{users.Profile?.gender}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Alamat</Text>
                <Text style={styles.pribadiRight}>{users.Profile?.address}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Pekerjaan</Text>
                <Text style={styles.pribadiRight}>{users.Profile?.job}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>No Telephone</Text>
                <Text style={styles.pribadiRight}>{users.Profile?.phoneNumber}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Golongan Darah</Text>
                <Text style={styles.pribadiRight}>{users.Profile?.bloodType}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.pribadi}>Dibuat pada</Text>
                <Text style={styles.pribadiRight}>
                  {createdAtDate.getDate()} {monthNames[createdAtDate.getMonth()]} {createdAtDate.getFullYear()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ backgroundColor: 'white', flexDirection: 'column' }}>
          <View style={styles.rowContainer}>
            <View style={styles.outerCircle}>
              <Image source={{ uri: 'https://th.bing.com/th/id/OIP.xo-BCC1ZKFpLL65D93eHcgHaGe?rs=1&pid=ImgDetMain' }} style={styles.imageStyle} />
            </View>
            {users !== null ? (
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{users?.name}</Text>
            ) : (
              <View>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{users?.name.split(' ')[0]}</Text>
                <Text style={{ fontSize: 25 }}>{users.name.split(' ').slice(1).join(' ')}</Text>
              </View>
            )}
          </View>
          {/* unt button and name user */}
          <View>
            <Text style={{ fontSize: 17 }}>Hello {users.username} please add profile information!</Text>
            <Button title="Add Profile" onPress={handleAddProfile} />
          </View>
        </View>
      )}
    </View>
  );  
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-betweens',
    backgroundColor: '#efecec',
    paddingHorizontal: 15,
  },
  imageStyle: {
    width: 78,
    height: 78,
    borderRadius: 50,
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  pribadi: {
    fontSize: 23,
    color: 'grey',
    paddingBottom: 10,
  },
  pribadiRight: {
    fontSize: 24,
    color: 'black',
    paddingBottom: 10,
  },
  outerCircle: {
    width: 94, // Lebih besar dari ukuran gambar
    height: 94, // Lebih besar dari ukuran gambar
    borderRadius: 75, // Setengah dari lebar dan tinggi untuk membuat lingkaran di luar
    overflow: 'hidden', // Memastikan gambar tetap di dalam lingkaran
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F75369', // Warna garis lingkaran
    borderWidth: 5, // Lebar garis lingkaran
    borderBottomColor: 'black', // Warna garis lingkaran bagian bawah
    borderBottomWidth: 1, // Lebar garis lingkaran bagian bawah
  },
});
