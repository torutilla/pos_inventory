import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

    pgm.sql(`
    CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);

    pgm.sql(`
    CREATE TRIGGER trigger_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);

    pgm.sql(`
    CREATE TRIGGER trigger_suppliers_updated_at
    BEFORE UPDATE ON suppliers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);

    pgm.sql(`
    CREATE TRIGGER trigger_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);

    pgm.sql(`
    CREATE TRIGGER trigger_purchases_updated_at
    BEFORE UPDATE ON purchases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
    DROP TRIGGER IF EXISTS trigger_purchases_updated_at ON purchases;
  `);

    pgm.sql(`
    DROP TRIGGER IF EXISTS trigger_products_updated_at ON products;
  `);

    pgm.sql(`
    DROP TRIGGER IF EXISTS trigger_suppliers_updated_at ON suppliers;
  `);

    pgm.sql(`
    DROP TRIGGER IF EXISTS trigger_categories_updated_at ON categories;
  `);

    pgm.sql(`
    DROP TRIGGER IF EXISTS trigger_users_updated_at ON users;
  `);

    pgm.sql(`
    DROP FUNCTION IF EXISTS update_updated_at_column();
  `);
}
