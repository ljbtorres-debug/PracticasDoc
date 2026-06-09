import { ParameterEntity, ParameterFormProps } from "@/interfaces/ParameterInterfaces/parameterInterface";
import { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Pressable,
    Text,
    TextInput,
    View
} from "react-native";

const ParameterForm = ({
    mode,
    item,
    title,
    placeholder,
    loading,
    create,
    update,
    onClose,
    onSuccess,
}: ParameterFormProps) => {

    const [form, setForm] = useState<ParameterEntity>({
        name: ""
    });

    useEffect(() => {
        if (mode === "edit" && item) {
            setForm({
                name: item.name
            });
        } else {
            setForm({
                name: ""
            });
        }
    }, [item, mode]);

    const handleSubmit = async () => {
        if (!form.name.trim()) return;

        if (mode === "create") {
            await create(form);
        } else {
            if (!item?.id) return;

            await update(form, item.id);
        }

        onSuccess();
        onClose();
    };

    return (
        <KeyboardAvoidingView>
            <View className="flex-row justify-between">
                <Text className="text-lg font-bold p-5">
                    {mode === "create"
                        ? `Crear ${title}`
                        : `Editar ${title}`}
                </Text>

                <Pressable
                    onPress={onClose}
                    className="p-5"
                >
                    <Text className="text-red-600 text-xl">
                        X
                    </Text>
                </Pressable>
            </View>

            <View className="p-4">
                <Text className="font-semibold mb-1">
                    Nombre
                </Text>

                <TextInput
                    className="border rounded p-3"
                    placeholder={placeholder}
                    value={form.name}
                    onChangeText={(text) =>
                        setForm({
                            ...form,
                            name: text
                        })
                    }
                />
            </View>

            <View className="p-4">
                <Pressable
                    disabled={loading}
                    onPress={handleSubmit}
                    className="bg-green-600 rounded px-3 py-2 self-start"
                >
                    <Text className="text-white">
                        {loading
                            ? "Guardando..."
                            : "Guardar"}
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}
export default ParameterForm;