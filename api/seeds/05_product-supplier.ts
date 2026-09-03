import pool from "../src/db/database.js";

async function seedProductSuppliers() {
    console.log("Seeding product suppliers...");

    const { rows: products } = await pool.query(`
    SELECT id, sku
    FROM products;
  `);

    const { rows: suppliers } = await pool.query(`
    SELECT id, name
    FROM suppliers;
  `);

    const productMap = new Map(
        products.map((product) => [
            product.sku,
            product.id,
        ]),
    );

    const supplierMap = new Map(
        suppliers.map((supplier) => [
            supplier.name,
            supplier.id,
        ]),
    );

    const relationships = [
        {
            sku: "BEV-001",
            supplier: "Metro Supply Co.",
            supplierSku: "MS-WATER-500",
            lastCost: 10.0,
            isPreferred: true,
        },
        {
            sku: "BEV-002",
            supplier: "Metro Supply Co.",
            supplierSku: "MS-COLA-330",
            lastCost: 18.0,
            isPreferred: true,
        },
        {
            sku: "SNK-001",
            supplier: "Prime Distribution",
            supplierSku: "PD-CHIPS-001",
            lastCost: 20.0,
            isPreferred: true,
        },
        {
            sku: "SNK-002",
            supplier: "Prime Distribution",
            supplierSku: "PD-CHOC-001",
            lastCost: 25.0,
            isPreferred: true,
        },
        {
            sku: "PC-001",
            supplier: "Everyday Goods Trading",
            supplierSku: "EG-SHAMPOO-001",
            lastCost: 90.0,
            isPreferred: true,
        },
        {
            sku: "HH-001",
            supplier: "Everyday Goods Trading",
            supplierSku: "EG-DETERGENT-001",
            lastCost: 55.0,
            isPreferred: true,
        },
    ];

    for (const relationship of relationships) {
        const productId = productMap.get(relationship.sku);
        const supplierId = supplierMap.get(
            relationship.supplier,
        );

        if (!productId) {
            throw new Error(
                `Product "${relationship.sku}" was not found.`,
            );
        }

        if (!supplierId) {
            throw new Error(
                `Supplier "${relationship.supplier}" was not found.`,
            );
        }

        await pool.query(
            `
        INSERT INTO product_suppliers (
          product_id,
          supplier_id,
          supplier_sku,
          last_cost,
          is_preferred
        )
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (product_id, supplier_id)
        DO NOTHING;
      `,
            [
                productId,
                supplierId,
                relationship.supplierSku,
                relationship.lastCost,
                relationship.isPreferred,
            ],
        );
    }

    console.log("Product suppliers seeded.");
}

export default seedProductSuppliers;