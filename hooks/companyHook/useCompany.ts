import { useState, useEffect } from 'react';
import { Company } from '@/interfaces/Company';
import { companyService } from '@/services/parameterService/companyservice';

export const useCompanies = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    const loadCompanies = async () => {
        setLoading(true);
        try {
            const data = await companyService.getAll();
            setCompanies(data);
        } catch (error) {
            console.error("Error cargando empresas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCompanies();
    }, []);

    return { companies, loading, refresh: loadCompanies };
};