import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

interface Props {
    // 🔥 CAMBIO: Ahora notifica al padre con objetos estructurados
    onFilesSelected: (files: { uri: string; name: string }[]) => void;
}

export const DocumentoUploader = ({ onFilesSelected }: Props) => {
    const { width } = useWindowDimensions();
    const isNarrow = width < 420;
    
    // 🔥 CAMBIO: Unificamos todo en un solo estado de objetos para evitar desajustes
    const [selectedFiles, setSelectedFiles] = useState<{ uri: string; name: string }[]>([]);

    const pickDocuments = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                multiple: true, 
            });

            if (!result.canceled && result.assets) {
                // Creamos los nuevos objetos mapeados
                const newFiles = result.assets.map(asset => ({
                    uri: asset.uri,
                    name: asset.name
                }));

                // Combinamos quitando duplicados basados en la URI única
                const combined = [...selectedFiles, ...newFiles];
                const uniqueFiles = combined.filter((file, index, self) =>
                    self.findIndex(f => f.uri === file.uri) === index
                );

                setSelectedFiles(uniqueFiles);
                // 🔥 CAMBIO: Mandamos los objetos completos al padre
                onFilesSelected(uniqueFiles);
            }
        } catch (err) {
            console.error("Error al seleccionar documentos", err);
        }
    };

    const clearSelection = () => {
        setSelectedFiles([]);
        onFilesSelected([]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Documentos de Respaldo (PDF)</Text>
            
            <View style={[styles.row, isNarrow && styles.rowNarrow]}>
                <TouchableOpacity style={[styles.button, isNarrow ? styles.buttonFull : styles.buttonWide]} onPress={pickDocuments}>
                    <Text style={styles.btnText}> Seleccionar Archivos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.clearBtn, isNarrow ? styles.buttonFull : styles.clearWide]} onPress={clearSelection}>
                    <Text style={styles.clearText}>Limpiar</Text>
                </TouchableOpacity>
            </View>
            
            {/* 🔥 CAMBIO: Actualizadas las propiedades de lectura */}
            <Text style={styles.countText}>Archivos seleccionados: {selectedFiles.length}</Text>

            {selectedFiles.map((file, index) => (
                <Text key={index} style={styles.fileName}>📄 {file.name}</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginVertical: 15, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
    button: { flex: 1, minWidth: 140, minHeight: 56, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, backgroundColor: '#5856D6', alignItems: 'center', justifyContent: 'center', marginRight: 8, marginBottom: 8 },
    btnText: { color: '#fff', fontWeight: '800', textAlign: 'center' },
    fileName: { fontSize: 13, color: '#666', marginTop: 5, fontStyle: 'italic' },
    row: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' },
    clearBtn: { flex: 1, minWidth: 100, minHeight: 56, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#e77aa8', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
    clearText: { color: '#fff', fontWeight: '800', textAlign: 'center' },
    countText: { marginTop: 8, color: '#333', fontWeight: '600' },
    rowNarrow: { flexDirection: 'column', alignItems: 'stretch' },
    buttonFull: { width: '100%' },
    buttonWide: { flexBasis: '65%' },
    clearWide: { flexBasis: '32%' }
});