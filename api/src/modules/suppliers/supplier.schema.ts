import { z } from "zod";

const supplierFields = {
    name: z
        .string()
        .trim()
        .min(1, "Supplier name is required")
        .max(150, "Supplier name must not exceed 150 characters"),

    contact_person: z
        .string()
        .trim()
        .min(1, "Contact person cannot be empty")
        .max(150, "Contact person must not exceed 150 characters"),

    phone: z
        .string()
        .trim()
        .min(1, "Phone cannot be empty")
        .max(30, "Phone must not exceed 30 characters"),

    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .max(255, "Email must not exceed 255 characters"),

    address: z
        .string()
        .trim()
        .min(1, "Address cannot be empty")
        .max(500, "Address must not exceed 500 characters"),
};

const supplierIdParamsSchema = z.object({
    id: z.uuid("Invalid supplier ID"),
});

export const createSupplierSchema = z.object({
    body: z.object({
        name: supplierFields.name,

        contact_person: supplierFields.contact_person.optional(),

        phone: supplierFields.phone.optional(),

        email: supplierFields.email.optional(),

        address: supplierFields.address.optional(),
    }),
});

export const updateSupplierSchema = z.object({
    params: supplierIdParamsSchema,

    body: z
        .object({
            name: supplierFields.name.optional(),

            contact_person:
                supplierFields.contact_person.optional(),

            phone: supplierFields.phone.optional(),

            email: supplierFields.email.optional(),

            address: supplierFields.address.optional(),

            is_active: z.boolean().optional(),
        })
        .refine(
            (data) => Object.keys(data).length > 0,
            {
                message:
                    "At least one field must be provided for update",
            },
        ),
});

export const supplierParamsSchema = z.object({
    params: supplierIdParamsSchema,
});