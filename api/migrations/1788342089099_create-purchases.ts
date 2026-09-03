import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("purchases", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        purchase_number: {
            type: "varchar(30)",
            notNull: true,
            unique: true,
        },

        supplier_id: {
            type: "uuid",
            notNull: true,
            references: "suppliers(id)",
            onDelete: "RESTRICT",
        },

        created_by: {
            type: "uuid",
            notNull: true,
            references: "users(id)",
            onDelete: "RESTRICT",
        },

        status: {
            type: "purchase_status",
            notNull: true,
            default: "DRAFT",
        },

        subtotal: {
            type: "numeric(12,2)",
            notNull: true,
            default: 0,
            check: "subtotal >= 0",
        },

        total: {
            type: "numeric(12,2)",
            notNull: true,
            default: 0,
            check: "total >= 0",
        },

        notes: {
            type: "text",
        },

        ordered_at: {
            type: "timestamptz",
        },

        received_at: {
            type: "timestamptz",
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

    pgm.createIndex("purchases", "supplier_id");
    pgm.createIndex("purchases", "created_by");
    pgm.createIndex("purchases", "status");
    pgm.createIndex("purchases", "created_at");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("purchases");
}
