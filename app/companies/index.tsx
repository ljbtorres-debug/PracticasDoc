import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { useCompanies } from '@/hooks/companyHook/useCompany';
import { CompanyCard } from '@/components/company/CompanyCard';
import { CompanyForm } from '@/components/company/CompanyForm';
import { companyService } from '@/services/parameterService/companyservice';
import { Company } from '../../interfaces/Company';

export default function CompaniesPage() {
    const { companies, loading, refresh } = useCompanies();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);

    // Función para Guardar (Crea o Edita)
    const handleSave = async (formData: any) => {
        try {
            if (selectedCompany) {
                // Si hay una empresa seleccionada, EDITAMOS
                await companyService.update(selectedCompany.id, formData);
                Alert.alert("Éxito", "Empresa actualizada");
            } else {
                // Si no, CREAMOS
                await companyService.create(formData);
                Alert.alert("Éxito", "Empresa creada");
            }
            setModalVisible(false);
            setSelectedCompany(undefined);
            refresh();
        } catch (e) {
            Alert.alert("Error", "No se pudo procesar la solicitud");
        }
    };

        const handleDelete =  async (id: number) => {
          
                try {
                    await companyService.delete(id);
                    refresh();
                } catch (e) {
                    Alert.alert("Error", "No se pudo eliminar");
                }   
            }
        

    const openEdit = (company: Company) => {
        setSelectedCompany(company); // Cargamos los datos en el estado
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mis Empresas</Text>
                <TouchableOpacity 
                    style={styles.addBtn} 
                    onPress={() => { setSelectedCompany(undefined); setModalVisible(true); }}
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
                    <CompanyForm 
                        initialData={selectedCompany} 
                        onSubmit={handleSave} 
                    />
                    <TouchableOpacity 
                        style={styles.cancelBtn} 
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={{ color: '#666' }}>Cancelar</Text>
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
    cancelBtn: { marginTop: 15, alignItems: 'center' }
});