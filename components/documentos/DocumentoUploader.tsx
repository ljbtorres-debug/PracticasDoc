import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

interface Props {
    onFilesSelected: (uris: string[]) => void;
}

export const DocumentoUploader = ({ onFilesSelected }: Props) => {
    const [selectedNames, setSelectedNames] = useState<string[]>([]);

    const pickDocuments = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                multiple: true, // Habilita la selección múltiple
            });

            if (!result.canceled && result.assets) {
                const uris = result.assets.map(asset => asset.uri);
                const names = result.assets.map(asset => asset.name);
                
                setSelectedNames(names);
                onFilesSelected(uris); // Le avisamos al formulario principal cuáles son las rutas de los archivos
            }
        } catch (err) {
            console.error("Error al seleccionar documentos", err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Documentos de Respaldo (PDF)</Text>
            
            <TouchableOpacity style={styles.button} onPress={pickDocuments}>
                <Text style={styles.btnText}>📎 Seleccionar Archivos</Text>
            </TouchableOpacity>

            {selectedNames.map((name, index) => (
                <Text key={index} style={styles.fileName}>📄 {name}</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginVertical: 15, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
    button: { backgroundColor: '#5856D6', padding: 12, borderRadius: 6, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold' },
    fileName: { fontSize: 13, color: '#666', marginTop: 5, fontStyle: 'italic' }
});