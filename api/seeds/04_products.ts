import pool from "../src/db/database.js";

async function seedProducts() {
    console.log("Seeding products...");

    const { rows: categories } = await pool.query(`
    SELECT id, name
    FROM categories;
  `);

    const categoryMap = new Map(
        categories.map((category) => [
            category.name,
            category.id,
        ]),
    );

    const products = [
        {
            name: "Bottled Water 500ml",
            sku: "BEV-001",
            barcode: "480001000001",
            category: "Beverages",
            costPrice: 10.0,
            sellingPrice: 15.0,
            stockQuantity: 100,
            minimumStock: 20,
        },
        {
            name: "Cola 330ml",
            sku: "BEV-002",
            barcode: "480001000002",
            category: "Beverages",
            costPrice: 18.0,
            sellingPrice: 25.0,
            stockQuantity: 80,
            minimumStock: 15,
        },
        {
            name: "Potato Chips",
            sku: "SNK-001",
            barcode: "480001000003",
            category: "Snacks",
            costPrice: 20.0,
            sellingPrice: 30.0,
            stockQuantity: 50,
            minimumStock: 10,
        },
        {
            name: "Chocolate Bar",
            sku: "SNK-002",
            barcode: "480001000004",
            category: "Snacks",
            costPrice: 25.0,
            sellingPrice: 40.0,
            stockQuantity: 40,
            minimumStock: 10,
        },
        {
            name: "Shampoo 180ml",
            sku: "PC-001",
            barcode: "480001000005",
            category: "Personal Care",
            costPrice: 90.0,
            sellingPrice: 120.0,
            stockQuantity: 30,
            minimumStock: 5,
        },
        {
            name: "Laundry Detergent 500g",
            sku: "HH-001",
            barcode: "480001000006",
            category: "Household",
            costPrice: 55.0,
            sellingPrice: 75.0,
            stockQuantity: 25,
            minimumStock: 5,
        },
    ];

    for (const product of products) {
        const categoryId = categoryMap.get(product.category);

        if (!categoryId) {
            throw new Error(
                `Category "${product.category}" was not found.`,
            );
        }

        await pool.query(
            `
        INSERT INTO products (
          category_id,
          name,
          sku,
          barcode,
          cost_price,
          selling_price,
          stock_quantity,
          minimum_stock
        )
        VALUES (
          $1, $2, $3, $4,
          $5, $6, $7, $8
        )
        ON CONFLICT (sku)
        DO NOTHING;
      `,
            [
                categoryId,
                product.name,
                product.sku,
                product.barcode,
                product.costPrice,
                product.sellingPrice,
                product.stockQuantity,
                product.minimumStock,
            ],
        );
    }

    console.log(" Products seeded.");
}

export default seedProducts;