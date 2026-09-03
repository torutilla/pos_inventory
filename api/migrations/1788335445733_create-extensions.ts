import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createExtension("pgcrypto", {
        ifNotExists: true,
    });

    pgm.createExtension("citext", {
        ifNotExists: true,
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropExtension("citext", {
        ifExists: true,
    });

    pgm.dropExtension("pgcrypto", {
        ifExists: true,
    });
}
