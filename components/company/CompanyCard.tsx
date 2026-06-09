import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Company } from '../../interfaces/Company';

interface Props {
    company: Company;
    onDelete: (id: number) => void;
    onEdit: (company: Company) => void;
}

export const CompanyCard = ({ company, onDelete, onEdit }: Props) => {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>{company.name}</Text>
                <Text style={styles.ruc}>RUC: {company.ruc}</Text>
                <Text style={styles.details}>{company.address || 'Sin dirección'}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity 
                    style={[styles.btn, styles.editBtn]} 
                    onPress={() => onEdit(company)}
                >
                    <Text style={styles.btnText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.btn, styles.deleteBtn]} 
                    onPress={() => onDelete(company.id)}
                >
                    <Text onPress={() => onDelete(company.id)} style={styles.btnText}>Eliminar</Text>
                </TouchableOpacity>

                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        // Sombra para que parezca un "cajón"
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    info: { marginBottom: 12 },
    name: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
    ruc: { fontSize: 14, color: '#666', marginVertical: 2 },
    details: { fontSize: 13, color: '#999' },
    actions: { 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        borderTopWidth: 1, 
        borderTopColor: '#eee', 
        paddingTop: 10 
    },
    btn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginLeft: 10 },
    editBtn: { backgroundColor: '#007AFF' },
    deleteBtn: { backgroundColor: '#FF3B30' },
    btnText: { color: '#fff', fontWeight: '600', fontSize: 12 }
});