import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("audit_logs", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        user_id: {
            type: "uuid",
            notNull: true,
            references: "users(id)",
            onDelete: "RESTRICT",
        },

        action: {
            type: "varchar(50)",
            notNull: true,
        },

        entity_type: {
            type: "varchar(50)",
            notNull: true,
        },

        entity_id: {
            type: "uuid",
        },

        details: {
            type: "jsonb",
        },

        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("now()"),
        },
    });

    pgm.createIndex("audit_logs", "user_id");

    pgm.createIndex(
        "audit_logs",
        ["entity_type", "entity_id"],
    );

    pgm.createIndex("audit_logs", "created_at");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("audit_logs");
}
