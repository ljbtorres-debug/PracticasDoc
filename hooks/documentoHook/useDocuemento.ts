import { useState } from 'react';
import { documentoService } from '@/services/parameterService/documento.service';

export const useDocumentos = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadMultiple = async (companyId: number, uris: string[]): Promise<boolean> => {
        if (uris.length === 0) return true;
        
        setUploading(true);
        setError(null);
        try {
            await documentoService.upload(companyId, uris);
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