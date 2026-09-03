import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("payments", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        sale_id: {
            type: "uuid",
            notNull: true,
            unique: true,
            references: "sales(id)",
            onDelete: "RESTRICT",
        },

        method: {
            type: "payment_method",
            notNull: true,
        },

        amount: {
            type: "numeric(12,2)",
            notNull: true,
            check: "amount > 0",
        },

        reference: {
            type: "varchar(100)",
        },

        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("now()"),
        },
    });

    pgm.createIndex("payments", "method");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("payments");
}
