import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Modal, TouchableOpacity, Alert, ActivityIndicator, Linking } from 'react-native'; // 👈 Añadimos Linking para abrir URLs
import { useCompanies } from '@/hooks/companyHook/useCompany';
import { CompanyCard } from '@/components/company/CompanyCard';
import { CompanyForm } from '@/components/company/CompanyForm';
import { companyService } from '@/services/parameterService/companyservice';
import { Company } from '@/interfaces/Company';
import { DocumentoUploader } from '@/components/documentos/DocumentoUploader';
import { useDocumentos } from '@/hooks/documentoHook/useDocuemento';

export default function CompaniesPage() {
    const { companies, loading, refresh } = useCompanies();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);
    const [loadingCompany, setLoadingCompany] = useState(false); // Spinner de carga híbrida

    const [selectedPDFs, setSelectedPDFs] = useState<string[]>([]);
    const { uploadMultiple, uploading: uploadingFiles } = useDocumentos();

    // URL base para las descargas forzadas
    const BASE_URL = 'https://api-minio.amauta.education'; // Ajusta si tu IP local cambia

    const handleSave = async (formData: any) => {
        try {
            if (selectedCompany) {
                // 1. EDITAR EMPRESA
                await companyService.update(selectedCompany.id, formData);
                
                // Si el usuario agregó nuevos PDFs estando en modo edición, los subimos también
                if (selectedPDFs.length > 0) {
                    await uploadMultiple(selectedCompany.id, selectedPDFs);
                }
                Alert.alert("Éxito", "Empresa actualizada correctamente");
            } else {
                // 2. CREAR EMPRESA
                const savedCompany = await companyService.create(formData);
                
                if (selectedPDFs.length > 0) {
                    const success = await uploadMultiple(savedCompany.id, selectedPDFs);
                    if (!success) {
                        Alert.alert("Atención", "La empresa se creó, pero hubo un problema al subir los PDFs.");
                    }
                } else {
                    Alert.alert("Éxito", "Empresa creada correctamente");
                }
            }
            
            setModalVisible(false);
            setSelectedCompany(undefined);
            setSelectedPDFs([]); 
            refresh();
        } catch (e) {
            Alert.alert("Error", "No se pudo procesar la solicitud");
        }
    };

    const handleDelete = async (id: number) => {
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

    const cargarEmpresaParaEditar = async (id: number) => {
        setLoadingCompany(true);
        try {
            const companyData = await companyService.getById(id);
            setSelectedCompany(companyData);
            setModalVisible(true);
        } catch (error) {
            Alert.alert("Error", "No se pudo cargar los archivos de la empresa");
        } finally {
            setLoadingCompany(false);
        }
    };

    const handleEditRequest = (company: Company) => {
        const needsFullFetch = (company as any).documents === undefined;
        if (needsFullFetch) {
            cargarEmpresaParaEditar(company.id);
        } else {
            openEdit(company);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mis Empresas</Text>
                <TouchableOpacity 
                    style={styles.addBtn} 
                    onPress={() => { 
                        setSelectedCompany(undefined); 
                        setSelectedPDFs([]); 
                        setModalVisible(true); 
                    }}
                >
                    <Text style={styles.addBtnText}>+ Nueva</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#5856D6" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={companies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CompanyCard 
                            company={item} 
                            onDelete={handleDelete} 
                            onEdit={handleEditRequest} 
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        {selectedCompany ? 'Editar Empresa' : 'Nueva Empresa'}
                    </Text>
                    
                    {/* Si está descargando los datos del backend, muestra cargando */}
                    {loadingCompany ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#5856D6" />
                            <Text style={styles.loaderText}>Cargando expedientes...</Text>
                        </View>
                    ) : (
                        <>
                            {/* Formulario Principal */}
                            <CompanyForm 
                                initialData={selectedCompany} 
                                onSubmit={handleSave}
                                onCancel={() => {
                                    setModalVisible(false);
                                    setSelectedCompany(undefined);
                                    setSelectedPDFs([]);
                                }}
                            />

                            {/* 🟢 COMPONENTE COMPLEMENTARIO: Lista de archivos subidos (Solo en Edición) */}
                            {selectedCompany && (selectedCompany as any).documents && (
                                <View style={styles.documentosSeccion}>
                                    <Text style={styles.documentosTitle}>Archivos en la nube:</Text>
                                    <FlatList
                                        data={(selectedCompany as any).documents}
                                        keyExtractor={(doc: any) => doc.id.toString()}
                                        renderItem={({ item: doc }) => (
                                            <View style={styles.docCard}>
                                                <Text style={styles.docName} numberOfLines={1}>{doc.file_name}</Text>
                                                <View style={styles.docActions}>
                                                    {/* Botón Ver */}
                                                    <TouchableOpacity 
                                                        style={[styles.actionBtn, { backgroundColor: '#007AFF' }]} 
                                                        onPress={() => Linking.openURL(doc.file_url)}
                                                    >
                                                        <Text style={styles.actionBtnText}>Ver</Text>
                                                    </TouchableOpacity>

                                                    {/* Botón Descargar */}
                                                    <TouchableOpacity 
                                                        style={[styles.actionBtn, { backgroundColor: '#34C759' }]} 
                                                        onPress={() => Linking.openURL(`${BASE_URL}/api/documents/${doc.id}/download`)}
                                                    >
                                                        <Text style={styles.actionBtnText}>Bajar</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )}
                                    />
                                </View>
                            )}

                            {/* Permitimos el uploader para ambos casos (Crear nuevos o anexar en edición) */}
                            <Text style={styles.documentosTitle}>{selectedCompany ? 'Anexar nuevos archivos:' : 'Subir Documentos:'}</Text>
                            <DocumentoUploader onFilesSelected={(uris) => setSelectedPDFs(uris)} />
                        </>
                    )}

                    {uploadingFiles && (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#5856D6" />
                            <Text style={styles.loaderText}>Sincronizando con MinIO...</Text>
                        </View>
                    )}
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
    modalContent: { flex: 1, padding: 20, backgroundColor: '#fff', marginTop: 40 },
    modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    loaderContainer: { marginVertical: 20, alignItems: 'center' },
    loaderText: { marginTop: 5, color: '#5856D6', fontWeight: '600', fontSize: 14 },
    // 🟢 ESTILOS NUEVOS PARA LA LISTA DE ARCHIVOS
    documentosSeccion: { marginVertical: 15, maxHeight: 150 },
    documentosTitle: { fontSize: 15, fontWeight: 'bold', color: '#444', marginBottom: 8 },
    docCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F1F3F5', padding: 8, borderRadius: 6, marginBottom: 6 },
    docName: { fontSize: 13, color: '#333', width: '50%' },
    docActions: { flexDirection: 'row' },
    actionBtn: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, marginLeft: 5 },
    actionBtnText: { color: '#fff', fontSize: 11, fontWeight: 'bold' }
});