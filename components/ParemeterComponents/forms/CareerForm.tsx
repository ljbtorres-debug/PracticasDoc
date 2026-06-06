import useCareer from '@/hooks/useCareer';
import { Career, CreateCareer } from '@/interfaces/careerInterface';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native';
import { Loading } from '../generic/stateComponents/loading';
import { buttonCustom } from '@/constants/buttonStyle';


interface formsProps {
    onClose: () => void;
    onSuccess: () => void
    mode: 'create' | 'edit';
    career: Career | null,
};

const Carrerform = ({ mode, career, onClose, onSuccess }: formsProps) => {
    const { save, editCareer, newCareer } = useCareer();
    const [form, setForm] = useState<CreateCareer | Career>();
    useEffect(() => {
        if (mode === 'edit' && career) {
            setForm({ name: career.name });
        } else {
            setForm({ name: '' });
        }
    }, [career, mode])

    const handleSubmit = async () => {
        try {
            if (!form?.name.trim()) return;
            if (mode === 'create' && form) {
                await newCareer(form);
            } else {
                if (!career?.id || !form) return;
                await editCareer(form, career.id)
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
                    {mode === 'create' ? 'Crear nueva carrera' : 'Editar carrera'}
                </Text>
                <Pressable onPress={() => { onClose() }} className='p-5'>
                    <Text className='text-red-600 text-xl'>X</Text>
                </Pressable>

            </View>
            <View className="p-4">
                <Text className="font-semibold mb-1">Nombre</Text>
                <TextInput
                    className="border rounded p-3"
                    placeholder="Ingrese el nombre de la carrera"
                    value={form?.name}
                    onChangeText={(text) =>
                        setForm({ name: text })
                    }
                />
            </View>
            <View>
                <Pressable onPress={()=>handleSubmit()} disabled={save} className='mb-3 self-start px-2 py-2 rounded bg-green-600'>
                    <Text>{save? <Loading message='Guardando carrera'/> : 'Guardar'}</Text>
                </Pressable>

            </View>

        </KeyboardAvoidingView>
    )
}
export default Carrerform
