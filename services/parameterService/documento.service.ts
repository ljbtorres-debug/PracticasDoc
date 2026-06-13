import { BASE_URL } from './api';

export const documentoService = {
    upload: async (companyId: number, fileURIs: string[]): Promise<any> => {
        const formData = new FormData();
        formData.append('company_id', companyId.toString());

        // Procesamos cada archivo de forma compatible con Web y Móvil
        for (let i = 0; i < fileURIs.length; i++) {
            const uri = fileURIs[i];
            const filename = uri.split('/').pop() || `documento_${i}.pdf`;

            if (uri.startsWith('blob:') || uri.startsWith('http')) {
                // 🌐 ENTORNO WEB: Convertimos la URI temporal del navegador en un Blob real
                const responseBlob = await fetch(uri);
                const blob = await responseBlob.blob();
                
                // Agregamos el archivo real al FormData
                formData.append('files[]', blob, filename);
            } else {
                // 📱 ENTORNO MÓVIL: Mantenemos la estructura nativa
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
                // IMPORTANTE: Dejar vacío el Content-Type para que el navegador asigne el boundary correcto
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