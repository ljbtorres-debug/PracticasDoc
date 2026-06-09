export interface Company {
    id: number;
    name: string;
    ruc: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    created_at?: string;
    updated_at?: string;
}
