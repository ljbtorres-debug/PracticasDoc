import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

interface Props {
    onFilesSelected: (uris: string[]) => void;
}

export const DocumentoUploader = ({ onFilesSelected }: Props) => {
    const { width } = useWindowDimensions();
    const isNarrow = width < 420; // umbral de diseño: ajustar si quieres
    // Mantener tanto URIs como nombres para mostrar y para notificar al padre
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    const [selectedUris, setSelectedUris] = useState<string[]>([]);

    const pickDocuments = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                multiple: true, // Habilita la selección múltiple
            });

            if (!result.canceled && result.assets) {
                const uris = result.assets.map(asset => asset.uri);
                const names = result.assets.map(asset => asset.name);

                // Añadimos las nuevas selecciones a las ya existentes, evitando duplicados
                const combinedUris = Array.from(new Set([...selectedUris, ...uris]));
                const combinedNames = Array.from(new Set([...selectedNames, ...names]));

                setSelectedUris(combinedUris);
                setSelectedNames(combinedNames);

                // Notificamos al padre con la lista completa de URIs
                onFilesSelected(combinedUris);
            }
        } catch (err) {
            console.error("Error al seleccionar documentos", err);
        }
    };

    const clearSelection = () => {
        setSelectedUris([]);
        setSelectedNames([]);
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
            

            <Text style={styles.countText}>Archivos seleccionados: {selectedUris.length}</Text>

            {selectedNames.map((name, index) => (
                <Text key={index} style={styles.fileName}>📄 {name}</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginVertical: 15, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
    // Botón principal: ocupa espacio flexible, tiene minWidth para no reducirse demasiado
    button: { flex: 1, minWidth: 140, minHeight: 56, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, backgroundColor: '#5856D6', alignItems: 'center', justifyContent: 'center', marginRight: 8, marginBottom: 8 },
    btnText: { color: '#fff', fontWeight: '800', textAlign: 'center' },
    fileName: { fontSize: 13, color: '#666', marginTop: 5, fontStyle: 'italic' },
    // Row permite wrap para que en pantallas pequeñas los botones se apilen
    row: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' },
    // Clear como botón secundario flexible
    clearBtn: { flex: 1, minWidth: 100, minHeight: 56, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#e77aa8', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
    clearText: { color: '#fff', fontWeight: '800', textAlign: 'center' },
    countText: { marginTop: 8, color: '#333', fontWeight: '600' },
    // Responsive variants
    rowNarrow: { flexDirection: 'column', alignItems: 'stretch' },
    buttonFull: { width: '100%' },
    buttonWide: { flexBasis: '65%' },
    clearWide: { flexBasis: '32%' }
});