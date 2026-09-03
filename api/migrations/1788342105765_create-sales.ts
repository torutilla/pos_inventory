import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("sales", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        sale_number: {
            type: "varchar(30)",
            notNull: true,
            unique: true,
        },

        cashier_id: {
            type: "uuid",
            notNull: true,
            references: "users(id)",
            onDelete: "RESTRICT",
        },

        subtotal: {
            type: "numeric(12,2)",
            notNull: true,
            check: "subtotal >= 0",
        },

        discount: {
            type: "numeric(12,2)",
            notNull: true,
            default: 0,
            check: "discount >= 0",
        },

        total: {
            type: "numeric(12,2)",
            notNull: true,
            check: "total >= 0",
        },

        status: {
            type: "sale_status",
            notNull: true,
            default: "COMPLETED",
        },

        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("now()"),
        },
    });

    pgm.addConstraint(
        "sales",
        "check_discount_not_greater_than_subtotal",
        {
            check: "discount <= subtotal",
        },
    );

    pgm.createIndex("sales", "cashier_id");
    pgm.createIndex("sales", "status");
    pgm.createIndex("sales", "created_at");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("sales");
}
