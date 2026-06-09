import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Company } from '../../interfaces/Company';

interface Props {
    initialData?: Company;
    onSubmit: (data: Omit<Company, 'id' | 'created_at' | 'updated_at'>) => void;
}

export const CompanyForm = ({ initialData, onSubmit }: Props) => {
    const [form, setForm] = useState({
        name: initialData?.name || '',
        ruc: initialData?.ruc || '',
        address: initialData?.address || '',
        phone: initialData?.phone || '',
        email: initialData?.email || '',
    });

    const handleSave = () => {
        if (!form.name || !form.ruc) {
            Alert.alert("Error", "Nombre y RUC son obligatorios");
            return;
        }
        onSubmit(form);
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Nombre de Empresa" style={styles.input} 
                value={form.name} onChangeText={(t) => setForm({...form, name: t})} />
            <TextInput placeholder="RUC" style={styles.input} 
                value={form.ruc} onChangeText={(t) => setForm({...form, ruc: t})} />
            <TextInput placeholder="Dirección" style={styles.input} 
                value={form.address} onChangeText={(t) => setForm({...form, address: t})} />
            <TextInput placeholder="Teléfono" style={styles.input} 
                value={form.phone} onChangeText={(t) => setForm({...form, phone: t})} />
            <TextInput placeholder="Email" style={styles.input} 
                value={form.email} onChangeText={(t) => setForm({...form, email: t})} />
            <Button title="Guardar Empresa" onPress={handleSave} color="#007AFF" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', borderRadius: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 }
});