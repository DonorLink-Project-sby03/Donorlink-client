import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import instance from '../instance/config'; // Pastikan Anda mengimpor instance dengan benar
import * as SecureStore from 'expo-secure-store'

export default function AddForm({ navigation }) {
    const [identityNo, setIdentityNo] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [occupation, setOccupation] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [bloodType, setBloodType] = useState('');

    const submitHandler = async () => {
        try {
            const { data } = await instance.post(
                "/profile/",
                {
                    identityNo: identityNo,
                    gender: gender,
                    address: address,
                    occupation: occupation,
                    dob: dob,
                    phone: phone,
                    imageUrl: imageUrl,
                    bloodType: bloodType,
                },
                {
                    headers: {
                        Authorization: `Bearer ${SecureStore.getItemAsync("access_token")}`,
                    },
                }
            );
            navigation.navigate("Profile");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Hello</Text>
            <Text style={styles.label}>No Identitas:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your identity number"
                value={identityNo}
                onChangeText={setIdentityNo}
            />
            <Text style={styles.label}>Jenis Kelamin:</Text>
            <View style={styles.radioContainer}>
                <RadioButton
                    value="male"
                    status={gender === 'male' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('male')}
                />
                <Text style={styles.radioLabel}>Laki-laki</Text>
                <RadioButton
                    value="female"
                    status={gender === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('female')}
                />
                <Text style={styles.radioLabel}>Perempuan</Text>
            </View>
            <Text style={styles.label}>Alamat:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your address"
                value={address}
                onChangeText={setAddress}
            />
            <Text style={styles.label}>Pekerjaan:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your occupation"
                value={occupation}
                onChangeText={setOccupation}
            />
            <Text style={styles.label}>Tanggal Lahir:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your date of birth"
                value={dob}
                onChangeText={setDob}
            />
            <Text style={styles.label}>Nomer Telepon:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <Text style={styles.label}>URL Gambar Profil:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter profile image URL"
                value={imageUrl}
                onChangeText={setImageUrl}
            />
            <Text style={styles.label}>Golongan Darah:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your blood type"
                value={bloodType}
                onChangeText={setBloodType}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={submitHandler}
            >
                <Text style={styles.buttonText}>Kirim</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
