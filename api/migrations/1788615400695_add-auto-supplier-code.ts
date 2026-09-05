import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createSequence("supplier_code_seq", {
        start: 4,
    });

    pgm.alterColumn("suppliers", "supplier_code", {
        default: pgm.func(
            "'SUP-' || LPAD(nextval('supplier_code_seq')::text, 3, '0')",
        ),
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.alterColumn("suppliers", "supplier_code", {
        default: null,
    });

    pgm.dropSequence("supplier_code_seq");
}
