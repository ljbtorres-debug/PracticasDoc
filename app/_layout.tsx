import '../global.css'
import { Platform, View } from "react-native";
import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { Drawer } from 'expo-router/drawer';

const isAndroid = Platform.OS === "ios";

if (isAndroid) {
    NavigationBar.setBorderColorAsync('black');
}

const RootLayout = () => {
    const [loaded] = useFonts({ Inter: require("../assets/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf") });

    if (!loaded) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Inicio',
                }}
            />

            <Stack.Screen
                name="parameter"
                options={{
                    title: 'Parametros',
                }}
            />

        </Stack>
    );
}

export default RootLayout;