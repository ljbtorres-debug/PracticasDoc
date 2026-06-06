// components/ui/Loading.tsx

import { ActivityIndicator, Text, View } from "react-native";

interface LoadingProps {
    message?: string;
}

export const Loading = ({message = "Cargando..." }: LoadingProps) => {
    return (
        <View className="flex-1 justify-center items-center gap-3">
            <ActivityIndicator size="large" />
            <Text>{message}</Text>
        </View>
    );
};