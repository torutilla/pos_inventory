# Entity Relationship Diagram

```mermaid
erDiagram

    USERS {
        uuid id PK
        varchar name
        varchar email
        varchar password_hash
        user_role role
        boolean is_active
        timestamptz created_at
        timestamptz updated_at
    }

    CATEGORIES {
        uuid id PK
        varchar name
        timestamptz created_at
        timestamptz updated_at
    }

    SUPPLIERS {
        uuid id PK
        varchar supplier_code
        varchar name
        varchar contact_person
        varchar phone
        varchar email
        text address
        boolean is_active
        timestamptz created_at
        timestamptz updated_at
    }

    PRODUCTS {
        uuid id PK
        uuid category_id FK
        varchar name
        varchar sku
        varchar barcode
        numeric cost_price
        numeric selling_price
        integer stock_qty
        integer min_stock
        boolean is_active
    }

    PRODUCT_SUPPLIERS {
        uuid product_id PK, FK
        uuid supplier_id PK, FK
    }

    PURCHASES {
        uuid id PK
        varchar purchase_no
        uuid supplier_id FK
        uuid created_by FK
        varchar status
        numeric subtotal
        numeric total
        text notes
        timestamptz ordered_at
        timestamptz received_at
        timestamptz created_at
        timestamptz updated_at
    }

    PURCHASE_ITEMS {
        uuid id PK
        uuid purchase_id FK
        uuid product_id FK
        integer quantity
        numeric unit_cost
        numeric subtotal
    }

    SALES {
        uuid id PK
        varchar sale_number
        uuid cashier_id FK
        numeric subtotal
        numeric discount
        numeric total
        varchar status
        timestamptz created_at
    }

    SALE_ITEMS {
        uuid id PK
        uuid sale_id FK
        uuid product_id FK
        integer quantity
        numeric unit_price
        numeric subtotal
    }

    INVENTORY_MOVEMENTS {
        uuid id PK
        uuid product_id FK
        uuid user_id FK
    }


    %% USERS

    USERS ||--o{ PURCHASES : creates
    USERS ||--o{ SALES : processes
    USERS ||--o{ INVENTORY_MOVEMENTS : records


    %% CATEGORIES

    CATEGORIES ||--o{ PRODUCTS : contains


    %% SUPPLIERS AND PRODUCTS

    PRODUCTS ||--o{ PRODUCT_SUPPLIERS : has
    SUPPLIERS ||--o{ PRODUCT_SUPPLIERS : supplies


    %% PURCHASES

    SUPPLIERS ||--o{ PURCHASES : receives
    PURCHASES ||--o{ PURCHASE_ITEMS : contains
    PRODUCTS ||--o{ PURCHASE_ITEMS : included_in


    %% SALES

    SALES ||--o{ SALE_ITEMS : contains
    PRODUCTS ||--o{ SALE_ITEMS : included_in


    %% INVENTORY

    PRODUCTS ||--o{ INVENTORY_MOVEMENTS : tracks
```

## Relationship Summary

```text
Users
├── create Purchases
├── process Sales
└── record Inventory Movements

Categories
└── contain Products

Products
├── belong to Categories
├── belong to Purchases through Purchase Items
├── belong to Sales through Sale Items
├── have Inventory Movements
└── have Suppliers through Product Suppliers

Suppliers
├── provide Products through Product Suppliers
└── are associated with Purchases

Purchases
└── contain Purchase Items

Sales
└── contain Sale Items
```
