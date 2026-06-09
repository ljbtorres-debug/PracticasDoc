import useSemester from "@/hooks/parameterHook/useSemester";
import { CreateSemester, Semester } from "@/interfaces/ParameterInterfaces/semesterInterface";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Pressable, Text, TextInput, View } from "react-native";
import { Loading } from "../generic/stateComponents/loading";



interface formsProps {
    onClose: () => void;
    onSuccess: () => void
    mode: 'create' | 'edit';
    semester: Semester | null,
};

const SemesterForm = ({ mode, semester, onClose, onSuccess }: formsProps) => {
    const { save, editSemester, newSemester } = useSemester();
    const [form, setForm] = useState<CreateSemester | Semester>();
    useEffect(() => {
        if (mode === 'edit' && semester) {
            setForm({
                name: semester.name,
                level: semester.level,
                required_hours: semester.required_hours,
                structural_core: semester.structural_core
            });
        } else {
            setForm({
                name: '',
                level: 0,
                required_hours: 0,
                structural_core: ''
            });
        }
    }, [semester, mode])

    const handleSubmit = async () => {
        try {
            if (!form?.name.trim()) return;
            if (mode === 'create' && form) {
                await newSemester(form);
            } else {
                if (!semester?.id || !form) return;
                await editSemester(form, semester.id)
            }
            onClose()
            onSuccess()
        } catch (error) {
            throw error
        }
    }
    const handleChange = (
        field: keyof CreateSemester,
        value: string | number
    ) => {
        if (!form) return;

        setForm({
            ...form,
            [field]: value
        });
    };
    return (
        <KeyboardAvoidingView>
            <View className='flex justify-between flex-row'>
                <Text className="text-lg font-bold mb-4 p-5">
                    {mode === 'create' ? 'Crear nuevo Semestre' : 'Editar Semestre'}
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
                    onChangeText={(text) => handleChange('name', text)}
                />
                <Text className="font-semibold mb-1">Nivel</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border rounded p-3"
                    placeholder="Ingrese el nivel"
                    value={form?.level !== undefined ? String(form.level) : ''}
                    onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, '');
                        handleChange('level', numericValue ? Number(numericValue) : 0);
                    }}
                />
                <Text className="font-semibold mb-1">Horas requeridas</Text>
                <TextInput
                    keyboardType="numeric"
                    className="border rounded p-3"
                    placeholder="Ingrese las horas requeridas"
                    value={form?.required_hours !== undefined ? String(form.required_hours) : ''}
                    onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, '');
                        handleChange('required_hours', numericValue ? Number(numericValue) : 0);
                    }}
                />
                <Text className="font-semibold mb-1">Núcleo Estructurante</Text>
                <TextInput
                    className="border rounded p-3"
                    placeholder="Ingrese el núcleo estructurante"
                    value={form?.structural_core}
                    onChangeText={(text) =>
                        handleChange('structural_core', text)
                    }
                    multiline
                    numberOfLines={4}
                />
            </View>
            <View>
                <Pressable onPress={() => handleSubmit()} disabled={save} className='mb-3 self-start px-2 py-2 rounded bg-green-600'>
                    <Text>{save ? <Loading message='Guardando carrera' /> : 'Guardar'}</Text>
                </Pressable>

            </View>

        </KeyboardAvoidingView>
    )
}
export default SemesterForm;