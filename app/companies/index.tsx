import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Modal, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useCompanies } from '@/hooks/companyHook/useCompany';
import { CompanyCard } from '@/components/company/CompanyCard';
import { CompanyForm } from '@/components/company/CompanyForm';
import { companyService } from '@/services/parameterService/companyservice';
import { Company } from '@/interfaces/Company';

// 🟢 1. IMPORTACIONES NUEVAS (Ajusta las rutas según tus carpetas reales)
import { DocumentoUploader } from '@/components/documentos/DocumentoUploader';
import { useDocumentos } from '@/hooks/documentoHook/useDocuemento';

export default function CompaniesPage() {
    const { companies, loading, refresh } = useCompanies();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);

    // 🟢 2. ESTADOS NUEVOS PARA ARCHIVOS
    const [selectedPDFs, setSelectedPDFs] = useState<string[]>([]);
    const { uploadMultiple, uploading: uploadingFiles } = useDocumentos();

    // Función para Guardar (Crea o Edita)
    const handleSave = async (formData: any) => {
        try {
            if (selectedCompany) {
                // Si hay una empresa seleccionada, EDITAMOS (Se queda igual que antes)
                await companyService.update(selectedCompany.id, formData);
                Alert.alert("Éxito", "Empresa actualizada");
            } else {
                // 🟢 3. CIRUGÍA EN LA CREACIÓN
                // PASO A: Guardamos la empresa en la BD y capturamos la respuesta del backend
                const savedCompany = await companyService.create(formData);
                
                // PASO B: Si el usuario seleccionó PDFs, los subimos usando el ID que nos dio el Back
                if (selectedPDFs.length > 0) {
                    const success = await uploadMultiple(savedCompany.id, selectedPDFs);
                    if (!success) {
                        Alert.alert("Atención", "La empresa se creó, pero hubo un problema al subir los PDFs.");
                        // No ponemos "return" para que igual cierre el modal y refresque lo que sí se guardó
                    }
                } else {
                    Alert.alert("Éxito", "Empresa creada correctamente");
                }
            }
            
            // Limpieza de estados al terminar con éxito
            setModalVisible(false);
            setSelectedCompany(undefined);
            setSelectedPDFs([]); // 🟢 Limpiamos los PDFs seleccionados para la próxima
            refresh();
        } catch (e) {
            Alert.alert("Error", "No se pudo procesar la solicitud");
        }
    };

    const handleDelete = async (id: number) => {
        // Dejamos tu lógica asíncrona de borrado igual, recuerda agregar el diálogo de confirmación después
        try {
            await companyService.delete(id);
            refresh();
        } catch (e) {
            Alert.alert("Error", "No se pudo eliminar");
        }   
    };

    const openEdit = (company: Company) => {
        setSelectedCompany(company); 
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mis Empresas</Text>
                <TouchableOpacity 
                    style={styles.addBtn} 
                    onPress={() => { 
                        setSelectedCompany(undefined); 
                        setSelectedPDFs([]); // 🟢 Nos aseguramos de empezar limpios
                        setModalVisible(true); 
                    }}
                >
                    <Text style={styles.addBtnText}>+ Nueva</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={companies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CompanyCard 
                        company={item} 
                        onDelete={handleDelete} 
                        onEdit={openEdit} 
                    />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        {selectedCompany ? 'Editar Empresa' : 'Nueva Empresa'}
                    </Text>
                    
                    {/* Formulario Principal de Campos */}
                    <CompanyForm 
                        initialData={selectedCompany} 
                        onSubmit={handleSave} 
                    />

                    {/* 🟢 4. COMPONENTE VISUAL DE UPLOAD (Solo se muestra si estamos CREANDO, no editando) */}
                    {!selectedCompany && (
                        <DocumentoUploader onFilesSelected={(uris) => setSelectedPDFs(uris)} />
                    )}

                    {/* 🟢 5. FEEDBACK VISUAL SI ESTÁ SUBIENDO ARCHIVOS A MINIO */}
                    {uploadingFiles && (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#5856D6" />
                            <Text style={styles.loaderText}>Subiendo documentos a MinIO...</Text>
                        </View>
                    )}

                    <TouchableOpacity 
                        style={styles.cancelBtn} 
                        onPress={() => setModalVisible(false)}
                        disabled={uploadingFiles} // Evita cerrar el modal en plena subida
                    >
                        <Text style={{ color: uploadingFiles ? '#ccc' : '#666' }}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA', paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, marginBottom: 20 },
    title: { fontSize: 26, fontWeight: 'bold', color: '#1a1a1a' },
    addBtn: { backgroundColor: '#34C759', padding: 10, borderRadius: 8 },
    addBtnText: { color: '#fff', fontWeight: 'bold' },
    modalContent: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
    modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    cancelBtn: { marginTop: 15, alignItems: 'center' },
    // 🟢 Estilos para el cargador de archivos
    loaderContainer: { marginVertical: 10, alignItems: 'center' },
    loaderText: { marginTop: 5, color: '#5856D6', fontWeight: '600', fontSize: 13 }
});