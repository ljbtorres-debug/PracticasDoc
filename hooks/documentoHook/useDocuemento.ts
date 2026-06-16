import { useState } from 'react';
import { documentoService } from '@/services/parameterService/documento.service';

export const useDocumentos = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 🔥 CAMBIO: Cambiamos de string[] a un array de objetos con URI y Name explícitos
    const uploadMultiple = async (companyId: number, files: { uri: string; name: string }[]): Promise<boolean> => {
        if (files.length === 0) return true;
        
        setUploading(true);
        setError(null);
        try {   
            // 🔥 CAMBIO: Enviamos el objeto con metadatos directamente al servicio web
            await documentoService.upload(companyId, files);
            return true;
        } catch (e: any) {
            setError(e.message || 'Ocurrió un problema');
            return false;
        } finally {
            setUploading(false);
        }
    };

    return { uploadMultiple, uploading, error };
};