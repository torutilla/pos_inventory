import pool from "../src/config/database.js";

async function seedCategories() {
    console.log("Seeding categories...");

    const categories = [
        {
            name: "Beverages",
            description: "Drinks and refreshments",
        },
        {
            name: "Snacks",
            description: "Chips, biscuits, and packaged snacks",
        },
        {
            name: "Personal Care",
            description: "Personal hygiene and care products",
        },
        {
            name: "Household",
            description: "Cleaning and household supplies",
        },
        {
            name: "Groceries",
            description: "General grocery products",
        },
    ];

    for (const category of categories) {
        await pool.query(
            `
        INSERT INTO categories (name, description)
        VALUES ($1, $2)
        ON CONFLICT (name)
        DO NOTHING;
      `,
            [category.name, category.description],
        );
    }

    console.log("Categories seeded.");
}

export default seedCategories;