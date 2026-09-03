import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('users', {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        name: {
            type: "varchar(100)",
            notNull: true,
        },

        email: {
            type: "citext",
            notNull: true,
            unique: true,
        },

        password_hash: {
            type: "text",
            notNull: true,
        },

        role: {
            type: "user_role",
            notNull: true,
            default: "CASHIER",
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

    pgm.createIndex("users", "role");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("users");
}
