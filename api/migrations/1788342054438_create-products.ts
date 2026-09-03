import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("products", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        category_id: {
            type: "uuid",
            references: "categories(id)",
            onDelete: "SET NULL",
        },

        name: {
            type: "varchar(150)",
            notNull: true,
        },

        sku: {
            type: "varchar(50)",
            notNull: true,
            unique: true,
        },

        barcode: {
            type: "varchar(100)",
            unique: true,
        },

        description: {
            type: "text",
        },

        cost_price: {
            type: "numeric(12,2)",
            notNull: true,
            check: "cost_price >= 0",
        },

        selling_price: {
            type: "numeric(12,2)",
            notNull: true,
            check: "selling_price >= 0",
        },

        stock_quantity: {
            type: "integer",
            notNull: true,
            default: 0,
            check: "stock_quantity >= 0",
        },

        minimum_stock: {
            type: "integer",
            notNull: true,
            default: 0,
            check: "minimum_stock >= 0",
        },

        is_active: {
            type: "boolean",
            notNull: true,
            default: true,
        },

        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("now()"),
        },

        updated_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("now()"),
        },
    });

    pgm.createIndex("products", "category_id");
    pgm.createIndex("products", "name");
    pgm.createIndex("products", "stock_quantity");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("products");
}
