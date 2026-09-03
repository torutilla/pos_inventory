import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("suppliers", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        supplier_code: {
            type: "varchar(50)",
            notNull: true,
            unique: true,
        },

        name: {
            type: "varchar(150)",
            notNull: true,
        },

        contact_person: {
            type: "varchar(150)",
        },

        phone: {
            type: "varchar(30)",
        },

        email: {
            type: "varchar(255)",
        },

        address: {
            type: "text",
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

    pgm.createIndex("suppliers", "name");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("suppliers");
}
