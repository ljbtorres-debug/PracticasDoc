import useSemester from "@/hooks/parameterHook/useSemester";
import { Semester } from "@/interfaces/ParameterInterfaces/semesterInterface";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Loading } from "../generic/stateComponents/loading";
import { DataTable } from "../generic/DataTable";
import SemesterForm from "../forms/semesterForm";



const SemesterComponent = () => {
    const { semesters, loading, deletedSemester, reload,save } = useSemester();
    const [modalVisible, setModalVisible] = useState(false);
    const [mode, setMode] = useState<'create' | 'edit'>('create');
    const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);
    const columns = [
        {
            key: "Id",
            title: "Id",
            render: (semester: Semester) => (
                <Text>{semester.id}</Text>
            ),
        },
        {
            key: "name",
            title: "Semestre",
            render: (semester: Semester) => (
                <Text>{semester.name}</Text>
            ),
        },
        {
            key: "level",
            title: "Nivel",
            render: (semester: Semester) => (
                <Text>{semester.level}</Text>
            ),
        },
        {
            key: "required_hours",
            title: "Horas requeridas",
            render: (semester: Semester) => (
                <Text>{semester.required_hours}</Text>
            ),
        },
        {
            key: "structural_core",
            title: "Núcleo Estructurante",
            render: (semester: Semester) => (
                <Text>{semester.structural_core}</Text>
            ),
        },
        {
            key: "actions",
            title: "Acciones",
            flex: 2,
            render: (semester: Semester) => (
                <View className="flex-row gap-2">
                    <Pressable disabled={save} onPress={() => edit(semester)} className='flex justify-center border border-blue-400 rounded-lg m-1 p-0.5'>
                        <Text className="px-1 text-blue-500">Editar</Text>
                    </Pressable>
                    <Pressable disabled={save} onPress={() => remove(semester.id)} className='flex justify-center border border-red-400 rounded-lg m-1 p-0.5'>
                        <Text className=" text-red-500"> {save ? 'Eliminando...':'Eliminar'} </Text>
                    </Pressable>
                </View>
            )
        }
    ];
    const edit = (semester: Semester) => {
        setSelectedSemester(semester);
        setMode('edit');
        setModalVisible(true);

    }
    const remove = async (id: number) => {
        try {
            await deletedSemester(id)

        } catch (error) {
            alert(`ocurrio un error al eliminar: ${error}`);
        }finally{
            reload()
        }
    }
    const create = () => {
        setSelectedSemester(null);
        setMode('create');
        setModalVisible(true);
    }
    return (
        <View>
            <Text className="text-xl font-bold mb-4">Lista de Semestres</Text>
            {loading ? <Loading message='Cargando Semestres' /> :
                <View>
                    <Pressable
                        onPress={create}
                        className='mb-3 self-start px-2 py-2 rounded bg-green-600'
                    >
                        <Text className="text-white font-semibold">
                            + Crear Semestre
                        </Text>
                    </Pressable>
                    <View>
                        {semesters &&
                            <DataTable
                                data={semesters}
                                columns={columns}
                                move
                                />

                        }
                    </View>
                </View>
            }

            {modalVisible &&
                <Modal visible={modalVisible}>
                    <SemesterForm
                        mode={mode}
                        semester={selectedSemester}
                        onClose={() => setModalVisible(false)}
                        onSuccess={reload}
                    />
                    
                </Modal>
            }

        </View>
    )
}
export default SemesterComponent;
