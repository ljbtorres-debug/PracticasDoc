import { router } from "expo-router";
import { Button, Text, View } from "react-native";


const App = () => {
    return (
        <View>
            <Text>Pantalla de inicio</Text>
            <Button
                title="Parametros"
                onPress={() => router.push('/parameter')}
            />
        </View>
    )
        ;
}

export default App;