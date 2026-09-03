import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("purchase_items", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        purchase_id: {
            type: "uuid",
            notNull: true,
            references: "purchases(id)",
            onDelete: "CASCADE",
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

        unit_cost: {
            type: "numeric(12,2)",
            notNull: true,
            check: "unit_cost >= 0",
        },

        subtotal: {
            type: "numeric(12,2)",
            notNull: true,
            check: "subtotal >= 0",
        },
    });

    pgm.createIndex("purchase_items", "purchase_id");
    pgm.createIndex("purchase_items", "product_id");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("purchase_items");
}
