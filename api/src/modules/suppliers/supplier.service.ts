import pool from "../../db/database.js";
import AppError from "../../utils/AppError.js";

import type {
    CreateSupplierInput,
    Supplier,
    SupplierIdentity,
    UpdateSupplierInput,
} from "./supplier.types.js";

export async function getAllSuppliers(): Promise<Supplier[]> {
    const result = await pool.query<Supplier>(
        `
      SELECT
        id,
        supplier_code,
        name,
        contact_person,
        phone,
        email,
        address,
        is_active,
        created_at,
        updated_at
      FROM suppliers
      ORDER BY name ASC;
    `,
    );

    return result.rows;
}

export async function getSupplierById(
    id: string,
): Promise<Supplier> {
    const result = await pool.query<Supplier>(
        `
      SELECT
        id,
        supplier_code,
        name,
        contact_person,
        phone,
        email,
        address,
        is_active,
        created_at,
        updated_at
      FROM suppliers
      WHERE id = $1;
    `,
        [id],
    );

    const supplier = result.rows[0];

    if (!supplier) {
        throw new AppError(
            "Supplier not found",
            404,
        );
    }

    return supplier;
}

export async function createSupplier(
    input: CreateSupplierInput,
): Promise<Supplier> {
    const {
        name,
        contact_person,
        phone,
        email,
        address,
    } = input;

    const identity: SupplierIdentity = {
        name,
        contact_person: contact_person ?? null,
        phone: phone ?? null,
        email: email ?? null,
        address: address ?? null,
    };

    if (await findDuplicateSupplier(identity)) {
        throw new AppError(
            "An identical supplier already exists",
            409,
        );
    }

    const result = await pool.query<Supplier>(
        `
      INSERT INTO suppliers (
        name,
        contact_person,
        phone,
        email,
        address
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        supplier_code,
        name,
        contact_person,
        phone,
        email,
        address,
        is_active,
        created_at,
        updated_at;
    `,
        [
            name,
            contact_person ?? null,
            phone ?? null,
            email ?? null,
            address ?? null,
        ],
    );

    const supplier = result.rows[0];

    if (!supplier) {
        throw new AppError(
            "Failed to create supplier",
            500,
        );
    }

    return supplier;
}

export async function updateSupplier(
    id: string,
    input: UpdateSupplierInput,
): Promise<Supplier> {

    const existingSupplier = await getSupplierById(id);

    const updatedIdentity: SupplierIdentity = {
        name: input.name ?? existingSupplier.name,

        contact_person:
            input.contact_person ??
            existingSupplier.contact_person,

        phone:
            input.phone ??
            existingSupplier.phone,

        email:
            input.email ??
            existingSupplier.email,

        address:
            input.address ??
            existingSupplier.address,
    };

    const isDuplicate =
        await findDuplicateSupplier(
            updatedIdentity,
            id,
        );

    if (isDuplicate) {
        throw new AppError(
            "An identical supplier already exists",
            409,
        );
    }


    const allowedFields = [
        "name",
        "contact_person",
        "phone",
        "email",
        "address",
        "is_active",
    ] as const;

    const updates: string[] = [];
    const values: unknown[] = [];

    for (const field of allowedFields) {
        if (field in input) {
            values.push(input[field]);
            updates.push(
                `${field} = $${values.length}`,
            );
        }
    }



    updates.push("updated_at = NOW()");

    values.push(id);

    const result = await pool.query<Supplier>(
        `
      UPDATE suppliers
      SET ${updates.join(", ")}
      WHERE id = $${values.length}
      RETURNING
        id,
        supplier_code,
        name,
        contact_person,
        phone,
        email,
        address,
        is_active,
        created_at,
        updated_at;
    `,
        values,
    );

    const supplier = result.rows[0];

    if (!supplier) {
        throw new AppError(
            "Supplier not found",
            404,
        );
    }

    return supplier;
}

export async function deleteSupplier(
    id: string,
): Promise<void> {
    const result = await pool.query(
        `
      DELETE FROM suppliers
      WHERE id = $1;
    `,
        [id],
    );

    if (result.rowCount === 0) {
        throw new AppError(
            "Supplier not found",
            404,
        );
    }
}


async function findDuplicateSupplier(
    identity: SupplierIdentity,
    excludeId?: string,
): Promise<boolean> {
    const result = await pool.query(
        `
      SELECT id
      FROM suppliers
      WHERE
        LOWER(TRIM(name)) =
        LOWER(TRIM($1))

        AND LOWER(TRIM(COALESCE(contact_person, ''))) =
        LOWER(TRIM(COALESCE($2, '')))

        AND TRIM(COALESCE(phone, '')) =
        TRIM(COALESCE($3, ''))

        AND LOWER(TRIM(COALESCE(email, ''))) =
        LOWER(TRIM(COALESCE($4, '')))

        AND LOWER(TRIM(COALESCE(address, ''))) =
        LOWER(TRIM(COALESCE($5, '')))

        AND ($6::uuid IS NULL OR id != $6)

      LIMIT 1;
    `,
        [
            identity.name,
            identity.contact_person,
            identity.phone,
            identity.email,
            identity.address,
            excludeId ?? null,
        ],
    );

    return result.rowCount !== 0;
}