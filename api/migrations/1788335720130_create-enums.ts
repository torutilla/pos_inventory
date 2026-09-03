import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createType('user_role', [
        'OWNER',
        'MANAGER',
        'CASHIER',
    ]);

    pgm.createType("purchase_status", [
        "DRAFT",
        "ORDERED",
        "RECEIVED",
        "CANCELLED",
    ]);

    pgm.createType("sale_status", [
        "COMPLETED",
        "VOIDED",
    ]);

    pgm.createType("payment_method", [
        "CASH",
        "GCASH",
        "MAYA",
        "CARD",
    ]);

    pgm.createType("inventory_movement_type", [
        "PURCHASE",
        "SALE",
        "DAMAGE",
        "ADJUSTMENT",
    ]);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropType("inventory_movement_type");
    pgm.dropType("payment_method");
    pgm.dropType("sale_status");
    pgm.dropType("purchase_status");
    pgm.dropType("user_role");
}
