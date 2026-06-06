import { Modal, Pressable, Text, View } from 'react-native';
import { DataTable } from '../generic/DataTable';
import useCareer from '@/hooks/useCareer';
import { Career } from '@/interfaces/careerInterface';
import { useState } from 'react';
import Carrerform from '../forms/CareerForm';
import { Loading } from '../generic/stateComponents/loading';



const CareerComponent = () => {
    const { careers, loading, deletedCareer, reload } = useCareer();
    const [modalVisible, setModalVisible] = useState(false);
    const [mode, setMode] = useState<'create' | 'edit'>('create');
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
    const columns = [
        {
            key: "Id",
            title: "Id",
            render: (career: Career) => (
                <Text>{career.id}</Text>
            ),
        },
        {
            key: "name",
            title: "Carrera",
            render: (career: Career) => (
                <Text>{career.name}</Text>
            ),
        },
        {
            key: "actions",
            title: "Acciones",
            flex: 2,
            render: (career: Career) => (
                <View className="flex-row gap-2">
                    <Pressable onPress={() => edit(career)} className='flex justify-center border border-blue-400 rounded-lg m-1 p-0.5'>
                        <Text className="px-1 text-blue-500">Editar</Text>
                    </Pressable>

                    <Pressable onPress={() => remove(career.id)} className='flex justify-center border border-red-400 rounded-lg m-1 p-0.5'>
                        <Text className=" text-red-500">Eliminar</Text>
                    </Pressable>
                </View>
            )
        }
    ];
    const edit = (career: Career) => {
        setSelectedCareer(career);
        setMode('edit');
        setModalVisible(true);

    }
    const remove = async (id: number) => {
        try {
            await deletedCareer(id)

        } catch (error) {
            alert(`ocurrio un error al eliminar: ${error}`);
        }
    }
    const create = () => {
        setSelectedCareer(null);
        setMode('create');
        setModalVisible(true);
    }
    return (
        <View>
            <Text className="text-xl font-bold mb-4">Lista de Carreras</Text>
            {loading ? <Loading message='Cargando carreras' /> :
                <View>
                    <Pressable
                        onPress={create}
                        className='mb-3 self-start px-2 py-2 rounded bg-green-600'
                    >
                        <Text className="text-white font-semibold">
                            + Crear Carrera
                        </Text>
                    </Pressable>
                    <View>
                        {careers &&
                            <DataTable
                                data={careers}
                                columns={columns} />

                        }
                    </View>
                </View>
            }

            {modalVisible &&
                <Modal visible={modalVisible}>
                    <Carrerform
                        career={selectedCareer}
                        mode={mode}
                        onClose={() => setModalVisible(false)}
                        onSuccess={() => reload()}
                    />
                </Modal>
            }

        </View>
    )
}
export default CareerComponent
