import { useEffect } from "react";
import { Stack, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { useAuth } from "../context/authContext/authContex";

export default function RootLayoutNav() {
  const { usuario, ready } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!ready) return;
    if (!navigationState?.key) return;
    if (!segments.length) return;

    const enGrupoAuth = segments[0] === "(auth)";

    if (!usuario && !enGrupoAuth) {
      router.replace("/(auth)");
      return;
    }

    // Solo si está autenticado y sigue en auth
    if (usuario && enGrupoAuth) {
      const ruta =
        usuario.rol === "teacher"
          ? "/(teacher)"
          : usuario.rol === "business"
            ? "/(business)"
            : "/(student)";

      router.replace(ruta);
    }
  }, [usuario, ready, segments, navigationState]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(business)" options={{ headerShown: false }} />
      <Stack.Screen name="(student)" options={{ headerShown: false }} />
      <Stack.Screen name="(teacher)" options={{ headerShown: false }} />
      <Stack.Screen name="parameter" options={{ headerShown: false }} />
    </Stack>
  );
}