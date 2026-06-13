export interface CompanyDocument {
    id: number;
    company_id: number;
    file_name: string;
    file_url: string;
    file_size: number | null;
    created_at?: string;
}