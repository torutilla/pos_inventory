import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("product_suppliers", {
        product_id: {
            type: "uuid",
            notNull: true,
            references: "products(id)",
            onDelete: "RESTRICT",
        },

        supplier_id: {
            type: "uuid",
            notNull: true,
            references: "suppliers(id)",
            onDelete: "RESTRICT",
        },

        supplier_sku: {
            type: "varchar(100)",
        },

        last_cost: {
            type: "numeric(12,2)",
            check: "last_cost IS NULL OR last_cost >= 0",
        },

        is_preferred: {
            type: "boolean",
            notNull: true,
            default: false,
        },

        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("now()"),
        },
    });

    pgm.addConstraint(
        "product_suppliers",
        "product_suppliers_pkey",
        {
            primaryKey: ["product_id", "supplier_id"],
        },
    );
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("product_suppliers");
}
