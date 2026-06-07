import useRole from '@/hooks/useRole';
import { CreateRole, Role } from '@/interfaces/roleInterface';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native';
import { Loading } from '../generic/stateComponents/loading';

interface formProps {
    onClose: () => void;
    onSuccess: () => void
    mode: 'create' | 'edit';
    rol: Role | null,
}
const Roleform = ({ mode, rol, onClose, onSuccess }: formProps) => {
    const { save, editRol, newRol } = useRole();
    const [form, setForm] = useState<CreateRole | Role>();
    useEffect(() => {
        if (mode === 'edit' && rol) {
            setForm({ name: rol.name });
        } else {
            setForm({ name: '' });
        }
    }, [rol, mode])

    const handleSubmit = async () => {
        try {
            if (!form?.name.trim()) return;
            if (mode === 'create' && form) {
                await newRol(form);
            } else {
                if (!rol?.id || !form) return;
                await editRol(form, rol.id)
            }
            onClose()
            onSuccess()
        } catch (error) {
            throw error
        }
    }
    return (
        <KeyboardAvoidingView>
            <View className='flex justify-between flex-row'>
                <Text className="text-lg font-bold mb-4 p-5">
                    {mode === 'create' ? 'Crear nuevo Rol' : 'Editar Rol'}
                </Text>
                <Pressable onPress={() => { onClose() }} className='p-5'>
                    <Text className='text-red-600 text-xl'>X</Text>
                </Pressable>

            </View>
            <View className="p-4">
                <Text className="font-semibold mb-1">Nombre</Text>
                <TextInput
                    className="border rounded p-3"
                    placeholder="Ingrese el nombre del Rol"
                    value={form?.name}
                    onChangeText={(text) =>
                        setForm({ name: text })
                    }
                />
            </View>
            <View>
                <Pressable onPress={() => handleSubmit()} disabled={save} className='mb-3 self-start px-2 py-2 rounded bg-green-600'>
                    <Text>{save ? <Loading message='Guardando rol' /> : 'Guardar'}</Text>
                </Pressable>

            </View>

        </KeyboardAvoidingView>
    )
}
export default Roleform
