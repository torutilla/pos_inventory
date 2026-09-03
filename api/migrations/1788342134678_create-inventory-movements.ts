import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("inventory_movements", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        product_id: {
            type: "uuid",
            notNull: true,
            references: "products(id)",
            onDelete: "RESTRICT",
        },

        type: {
            type: "inventory_movement_type",
            notNull: true,
        },

        quantity: {
            type: "integer",
            notNull: true,
            check: "quantity <> 0",
        },

        reference_type: {
            type: "varchar(30)",
        },

        reference_id: {
            type: "uuid",
        },

        reason: {
            type: "text",
        },

        created_by: {
            type: "uuid",
            notNull: true,
            references: "users(id)",
            onDelete: "RESTRICT",
        },

        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("now()"),
        },
    });

    pgm.addConstraint(
        "inventory_movements",
        "check_reference_pair",
        {
            check: `
        (reference_type IS NULL AND reference_id IS NULL)
        OR
        (reference_type IS NOT NULL AND reference_id IS NOT NULL)
      `,
        },
    );

    pgm.createIndex("inventory_movements", "product_id");
    pgm.createIndex("inventory_movements", "created_at");
    pgm.createIndex("inventory_movements", "type");
    pgm.createIndex(
        "inventory_movements",
        ["reference_type", "reference_id"],
    );
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("inventory_movements");
}
