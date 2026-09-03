import pool from "../src/config/database.js";
async function seedSuppliers() {
    console.log("Seeding suppliers...");

    const suppliers = [
        {
            supplierCode: "SUP-001",
            name: "Metro Supply Co.",
            contactPerson: "Juan Dela Cruz",
            phone: "09171234567",
            email: "sales@metrosupply.local",
            address: "Quezon City, Philippines",
        },
        {
            supplierCode: "SUP-002",
            name: "Prime Distribution",
            contactPerson: "Maria Santos",
            phone: "09181234567",
            email: "contact@primedistribution.local",
            address: "Makati City, Philippines",
        },
        {
            supplierCode: "SUP-003",
            name: "Everyday Goods Trading",
            contactPerson: "Carlos Reyes",
            phone: "09191234567",
            email: "orders@everydaygoods.local",
            address: "Pasig City, Philippines",
        },
    ];

    for (const supplier of suppliers) {
        await pool.query(
            `
        INSERT INTO suppliers (
          supplier_code,
          name,
          contact_person,
          phone,
          email,
          address
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (supplier_code)
        DO NOTHING;
      `,
            [
                supplier.supplierCode,
                supplier.name,
                supplier.contactPerson,
                supplier.phone,
                supplier.email,
                supplier.address,
            ],
        );
    }

    console.log("Suppliers seeded.");
}

export default seedSuppliers;