import "dotenv/config";
import pool from "../src/db/database.js";
import seedUsers from "./01_user.js";
import seedCategories from "./02_categories.js";
import seedSuppliers from "./03_suppliers.js";
import seedProducts from "./04_products.js";
import seedProductSuppliers from "./05_product-supplier.js";

async function runSeeds() {
    try {
        console.log("Starting database seeding...");

        // Seeds will be added here in order.
        await seedUsers();
        await seedCategories();
        await seedSuppliers();
        await seedProducts();
        await seedProductSuppliers();

        console.log("Database seeding completed.");
    } catch (error) {
        console.error("Database seeding failed:", error);

        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

runSeeds();