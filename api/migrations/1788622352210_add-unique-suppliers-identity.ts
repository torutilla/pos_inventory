import type {
    ColumnDefinitions,
    MigrationBuilder,
} from "node-pg-migrate";

export const shorthands:
    | ColumnDefinitions
    | undefined = undefined;

export async function up(
    pgm: MigrationBuilder,
): Promise<void> {
    pgm.sql(`
        CREATE UNIQUE INDEX suppliers_unique_identity
        ON suppliers (
            LOWER(TRIM(name)),
            LOWER(TRIM(COALESCE(contact_person, ''))),
            TRIM(COALESCE(phone, '')),
            LOWER(TRIM(COALESCE(email, ''))),
            LOWER(TRIM(COALESCE(address, '')))
        );
    `);
}

export async function down(
    pgm: MigrationBuilder,
): Promise<void> {
    pgm.dropIndex(
        "suppliers",
        "suppliers_unique_identity",
    );
}