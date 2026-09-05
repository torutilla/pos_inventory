export interface Supplier {
    id: string;
    supplier_code: string;
    name: string;
    contact_person: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface CreateSupplierInput {
    name: string;
    contact_person?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
}

export interface UpdateSupplierInput {
    name?: string | undefined;
    contact_person?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
    is_active?: boolean | undefined;
}

export interface SupplierIdentity {
    name: string;
    contact_person: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
}