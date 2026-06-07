import { router } from "expo-router";
import {View, Text, Button} from "react-native";

export default function HomeTeacher(){
    return(
        <View>
            <Text>Home Teacher</Text>
            <Button
                title="Parametros"
                onPress={() => router.push('/parameter')}
            />
        </View>
    )
}