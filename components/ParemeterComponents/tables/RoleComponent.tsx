import useRole from '@/hooks/parameterHook/useRole';
import { Role } from '@/interfaces/ParameterInterfaces/roleInterface';
import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Loading } from '../generic/stateComponents/loading';
import { DataTable } from '../generic/DataTable';
import ParameterForm from '../forms/parameterForm';



const RoleComponent = () => {
    const { roles, loading, deletedRole, reload, editRol, newRol, save } = useRole();
    const [modalVisible, setModalVisible] = useState(false);
    const [mode, setMode] = useState<'create' | 'edit'>('create');
    const [selectedRol, setSelectedRol] = useState<Role | null>(null);
    const columns = [
        {
            key: "Id",
            title: "Id",
            render: (rol: Role) => (
                <Text>{rol.id}</Text>
            ),
        },
        {
            key: "name",
            title: "Carrera",
            render: (rol: Role) => (
                <Text>{rol.name}</Text>
            ),
        },
        {
            key: "actions",
            title: "Acciones",
            flex: 2,
            render: (rol: Role) => (
                <View className="flex-row gap-2">
                    <Pressable disabled={save} onPress={() => edit(rol)} className='flex justify-center border border-blue-400 rounded-lg m-1 p-0.5'>
                        <Text className="px-1 text-blue-500">Editar</Text>
                    </Pressable>
                    <Pressable disabled={save} onPress={() => remove(rol.id)} className='flex justify-center border border-red-400 rounded-lg m-1 p-0.5'>
                        <Text className=" text-red-500">{save? 'Eliminando...':'Eliminar'}</Text>
                    </Pressable>
                </View>
            )
        }
    ];
    const edit = (rol: Role) => {
        setSelectedRol(rol);
        setMode('edit');
        setModalVisible(true);

    }
    const remove = async (id: number) => {
        try {
            await deletedRole(id)

        } catch (error) {
            alert(`ocurrio un error al eliminar: ${error}`);
        }finally{
            reload()
        }
    }
    const create = () => {
        setSelectedRol(null);
        setMode('create');
        setModalVisible(true);
    }
    return (
        <View>
            <Text className="text-xl font-bold mb-4">Lista de Roles</Text>
            {loading ? <Loading message='Cargando carreras' /> :
                <View>
                    <Pressable
                        onPress={create}
                        className='mb-3 self-start px-2 py-2 rounded bg-green-600'
                    >
                        <Text className="text-white font-semibold">
                            + Crear Rol
                        </Text>
                    </Pressable>
                    <View>
                        {roles &&
                            <DataTable
                                data={roles}
                                columns={columns} />

                        }
                    </View>
                </View>
            }

            {modalVisible &&
                <Modal visible={modalVisible}>
                    <ParameterForm
                        mode={mode}
                        item={selectedRol}
                        title="Rol"
                        placeholder="Ingrese el nombre del rol"
                        loading={save}
                        create={newRol}
                        update={editRol}
                        onClose={() => setModalVisible(false)}
                        onSuccess={reload}
                    >
                    </ParameterForm>
                </Modal>
            }

        </View>
    )
}
export default RoleComponent
