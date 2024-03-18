import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import CardChat from '../components/CardChat';
import axios from '../instance/config';
import { useDebugValue, useEffect, useState } from 'react';

export let datas = [
  {
    id: 1,
    bloodtype: 'AB',
    location: 'Jl. Melati',
    description: 'Membutuhkan donor darah segera',
    user: {
      name: 'Sari',
      email: 'sari@mail.com',
      username: 'sari123',
    },
  },
  {
    id: 2,
    bloodtype: 'O',
    location: 'Jl. Anggrek',
    description: 'Donor darah untuk keperluan operasi',
    user: {
      name: 'Budi',
      email: 'budi@mail.com',
      username: 'budi321',
    },
  },
  {
    id: 3,
    bloodtype: 'B',
    location: 'Jl. Dahlia',
    description: 'Dibutuhkan donor darah dalam waktu 2 hari',
    user: {
      name: 'Ani',
      email: 'ani@mail.com',
      username: 'ani456',
    },
  },
  {
    id: 4,
    bloodtype: 'A',
    location: 'Jl. Kenanga',
    description: 'Donor darah untuk pasien anemia',
    user: {
      name: 'Joko',
      email: 'joko@mail.com',
      username: 'joko789',
    },
  },
  {
    id: 5,
    bloodtype: 'AB',
    location: 'Jl. Mawar',
    description: 'Membutuhkan donor darah dengan segera',
    user: {
      name: 'Rina',
      email: 'rina@mail.com',
      username: 'rina098',
    },
  },
  {
    id: 6,
    bloodtype: 'O',
    location: 'Jl. Cempaka',
    description: 'Donor darah untuk keperluan transfusi',
    user: {
      name: 'Dedi',
      email: 'dedi@mail.com',
      username: 'dedi765',
    },
  },
  {
    id: 7,
    bloodtype: 'B',
    location: 'Jl. Flamboyan',
    description: 'Dibutuhkan donor darah dalam waktu 1 minggu',
    user: {
      name: 'Lina',
      email: 'lina@mail.com',
      username: 'lina432',
    },
  },
  {
    id: 8,
    bloodtype: 'A',
    location: 'Jl. Kamboja',
    description: 'Donor darah untuk pasien pendarahan',
    user: {
      name: 'Rudi',
      email: 'rudi@mail.com',
      username: 'rudi321',
    },
  },
  {
    id: 9,
    bloodtype: 'AB',
    location: 'Jl. Bunga',
    description: 'Membutuhkan donor darah dengan segera',
    user: {
      name: 'Siti',
      email: 'siti@mail.com',
      username: 'siti654',
    },
  },
  {
    id: 10,
    bloodtype: 'O',
    location: 'Jl. Alamanda',
    description: 'Donor darah untuk pasien gawat darurat',
    user: {
      name: 'Adi',
      email: 'adi@mail.com',
      username: 'adi987',
    },
  },
];

export default function HomePages({ navigation }) {
  const [items, setItems] = useState([]);

  const fetchRecipients = async () => {
    const { data } = await axios.get('/recipients');
    setItems(data);
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  console.log(items, '<<<< data recipients');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'grey' }}>
      <ScrollView>
        {datas.map((data) => {
          return <CardChat key={data.id} data={data} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
