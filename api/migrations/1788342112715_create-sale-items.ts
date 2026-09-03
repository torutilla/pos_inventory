import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("sale_items", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        sale_id: {
            type: "uuid",
            notNull: true,
            references: "sales(id)",
            onDelete: "RESTRICT",
        },

        product_id: {
            type: "uuid",
            notNull: true,
            references: "products(id)",
            onDelete: "RESTRICT",
        },

        quantity: {
            type: "integer",
            notNull: true,
            check: "quantity > 0",
        },

        unit_price: {
            type: "numeric(12,2)",
            notNull: true,
            check: "unit_price >= 0",
        },

        subtotal: {
            type: "numeric(12,2)",
            notNull: true,
            check: "subtotal >= 0",
        },
    });

    pgm.createIndex("sale_items", "sale_id");
    pgm.createIndex("sale_items", "product_id");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("sale_items");
}
