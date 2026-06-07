import { Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useLogin } from "../../hooks/loginHook/useLogin"; 

const isAndroid = Platform.OS === "android";

if (isAndroid) {
  NavigationBar.setBorderColorAsync("black");
}

export default function LoginComp() {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();

  return (
    <View className="flex-1 bg-[#F8F9FC] px-[16px] py-10">
      
      <View className="items-center mb-10">
        <Image
          source={require('../../assets/images/Login/LogoYavi.png')}
          className="w-28 h-28 mb-4"
          resizeMode="contain"
        />
        <Text className="text-[28px] font-bold text-[#1F2937] text-center">
          INICIAR SESIÓN
        </Text>
        <Text className="text-[16px] text-[#6B7280] mt-2 text-center">
          Bienvenido, ingresa tus credenciales para continuar
        </Text>
      </View>

      {/* FORM */}
      <View className="gap-4">
        <View>
          <Text className="text-[14px] text-[#6B7280] mb-1">
            Correo electrónico
          </Text>
          <TextInput
            placeholder="ejemplo@correo.com"
            placeholderTextColor="#6B7280"
            className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[4px] px-[16px] py-[14px] text-[#1F2937]"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View>
          <Text className="text-[14px] text-[#6B7280] mb-1">
            Contraseña
          </Text>
          <TextInput
            placeholder="********"
            placeholderTextColor="#6B7280"
            secureTextEntry
            className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[4px] px-[16px] py-[14px] text-[#1F2937]"
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {/* BOTÓN */}
      <TouchableOpacity 
        className="bg-[#FE7229] h-[54px] rounded-[14px] justify-center items-center mt-10"
        onPress={handleLogin}
      >
        <Text className="text-[#FFFFFF] text-[16px] font-semibold">
          INGRESAR
        </Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}