import { BASE_URL } from './api';

export const documentoService = {
    // 🔥 CAMBIO: Ajustado el parámetro para recibir los objetos completos
    upload: async (companyId: number, files: { uri: string; name: string }[]): Promise<any> => {
        const formData = new FormData();
        formData.append('company_id', companyId.toString());

        // Procesamos cada archivo de forma compatible con Web y Móvil
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uri = file.uri;
            
            // 🔥 CAMBIO: Tomamos el nombre real del archivo en lugar de recortar el string de la URI del Blob
            const filename = file.name || `documento_${i}.pdf`;

            if (uri.startsWith('blob:') || uri.startsWith('http')) {
                // 🌐 ENTORNO WEB: Convertimos la URI temporal del navegador en un Blob real
                const responseBlob = await fetch(uri);
                const blob = await responseBlob.blob();
                
                // 🔥 CAMBIO: Inyectamos el nombre real directo al append de datos binarios
                formData.append('files[]', blob, filename);
            } else {
                // 📱 ENTORNO MÓVIL: Mantenemos la estructura nativa usando el nombre original
                formData.append('files[]', {
                    uri: uri,
                    name: filename,
                    type: 'application/pdf',
                } as any);
            }
        }

        const response = await fetch(`${BASE_URL}/companies/upload-documents`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error("❌ Error detallado del servidor:", error);
            throw new Error(error.message || 'Error al subir los archivos');
        }

        return response.json();
    }
};