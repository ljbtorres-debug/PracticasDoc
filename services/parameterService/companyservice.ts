import { apiFetch } from './api';
import { Company } from '@/interfaces/Company';

export const companyService = {
    // LEER (GET)
    getAll: async (): Promise<Company[]> => {
        return apiFetch('/companies', { method: 'GET' });
    },

    // CREAR (POST)
    create: async (company: Omit<Company, 'id'>): Promise<Company> => {
        return apiFetch('/companies', {
            method: 'POST',
            body: JSON.stringify(company), // Fetch requiere que el body sea un string
        });
    },

    // ACTUALIZAR (PUT)
    update: async (id: number, company: Partial<Company>): Promise<Company> => {
        return apiFetch(`/companies/${id}`, {
            method: 'PUT',
            body: JSON.stringify(company),
        });
    },

    // BORRAR (DELETE)
   // services/companyService.ts
delete: async (id: number): Promise<void> => {
    return apiFetch(`/companies/${id}`, { 
        method: 'DELETE' 
    });
}
};