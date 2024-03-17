import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function EditForm() {
    const [identityNo, setIdentityNo] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [occupation, setOccupation] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <View style={styles.container}>
        <View>
         <Text>Hello </Text>
        </View>
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
            <TouchableOpacity
                style={styles.button}
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
