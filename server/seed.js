import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function seed() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS prices (
        id SERIAL PRIMARY KEY,
        crop VARCHAR(100) NOT NULL,
        emoji VARCHAR(10),
        market_price INTEGER NOT NULL,
        our_price INTEGER NOT NULL,
        unit VARCHAR(50) DEFAULT 'quintal',
        change DECIMAL(5,2) DEFAULT 0,
        last_updated TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(100) NOT NULL,
        product VARCHAR(100) NOT NULL,
        quantity VARCHAR(50) NOT NULL,
        status VARCHAR(20) NOT NULL,
        ordered_on DATE NOT NULL,
        expected_date DATE NOT NULL,
        current_location VARCHAR(200),
        steps TEXT[] DEFAULT '{"placed","packed","shipped","delivered"}',
        current_step INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        emoji VARCHAR(10),
        price INTEGER NOT NULL,
        unit VARCHAR(50) NOT NULL,
        description TEXT,
        in_stock BOOLEAN DEFAULT true
      );

      CREATE TABLE IF NOT EXISTS seeds (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        emoji VARCHAR(10),
        description TEXT,
        industries JSONB DEFAULT '[]',
        states TEXT[] DEFAULT '{}',
        season VARCHAR(50),
        yield_per_acre VARCHAR(50)
      );
    `);

    // Clear existing data
    await client.query("DELETE FROM prices");
    await client.query("DELETE FROM orders");
    await client.query("DELETE FROM products");
    await client.query("DELETE FROM seeds");

    // Seed prices
    await client.query(`
      INSERT INTO prices (crop, emoji, market_price, our_price, unit, change)
      VALUES ('Groundnut', '🥜', 5800, 5500, 'quintal', 1.2)
    `);

    // Seed orders
    await client.query(`
      INSERT INTO orders (order_id, customer_name, product, quantity, status, ordered_on, expected_date, current_location, steps, current_step)
      VALUES
        ('FGI-2024-1001', 'Ramesh Kumar', 'Groundnut Seeds', '50 kg', 'delivered', '2024-04-01', '2024-04-07', 'Delivered at your door', '{"placed","packed","shipped","delivered"}', 3),
        ('FGI-2024-1053', 'Suresh Patel', 'Wheat Seeds', '50 kg', 'shipped', '2024-04-05', '2024-04-11', 'Nagpur, Maharashtra', '{"placed","packed","shipped","delivered"}', 2),
        ('FGI-2024-1089', 'Anita Devi', 'DAP Fertilizer', '2 bags', 'packed', '2024-04-07', '2024-04-13', 'Warehouse - Pune', '{"placed","packed","shipped","delivered"}', 1)
    `);

    // Seed products
    await client.query(`
      INSERT INTO products (name, category, emoji, price, unit, description, in_stock)
      VALUES
        ('Groundnut Seeds', 'seed', '🥜', 520, 'kg', 'High yield, disease resistant groundnut seeds', true),
        ('Wheat Seeds', 'seed', '🌾', 450, 'kg', 'Premium quality wheat seeds for high yield', true),
        ('Hybrid Maize', 'seed', '🌽', 380, 'kg', 'Drought resistant hybrid maize seeds', true),
        ('Sunflower Seeds', 'seed', '🌻', 520, 'kg', 'Oil-rich sunflower seeds for commercial farming', true),
        ('Soybean Seeds', 'seed', '🌿', 490, 'kg', 'High protein soybean seeds', true),
        ('DAP Fertilizer', 'fertilizer', '🧪', 1200, 'bag', 'Best for all crops, improves root growth', true),
        ('Urea Fertilizer', 'fertilizer', '💊', 800, 'bag', 'High nitrogen content for leafy growth', true),
        ('Organic Compost', 'fertilizer', '🌱', 300, 'bag', '100% organic, improves soil quality', true),
        ('Hand Sprayer 16L', 'tool', '🔧', 750, 'piece', 'Durable hand pump sprayer for pesticides', true),
        ('Sickle (Danti)', 'tool', '⚒️', 180, 'piece', 'Sharp steel sickle for harvesting', true)
    `);

    // Seed seeds
    await client.query(`
      INSERT INTO seeds (name, emoji, description, industries, states, season, yield_per_acre)
      VALUES
        ('Groundnut Seeds', '🥜', 'One of India''s most important oilseed crops',
         '[{"name":"Edible Oil","icon":"🫙"},{"name":"Food Processing","icon":"🍫"},{"name":"Animal Feed","icon":"🐄"},{"name":"Soap & Cosmetics","icon":"🧴"},{"name":"Pharma","icon":"💊"}]',
         '{"Gujarat","Andhra Pradesh","Tamil Nadu","Rajasthan"}', 'Kharif', '8-12 quintals'),
        ('Wheat Seeds', '🌾', 'Staple food crop grown across India',
         '[{"name":"Flour & Bread","icon":"🍞"},{"name":"Noodles & Pasta","icon":"🍝"},{"name":"Starch Industry","icon":"🏭"},{"name":"Animal Feed","icon":"🐄"},{"name":"Beer & Alcohol","icon":"🍺"}]',
         '{"Punjab","Haryana","UP","MP"}', 'Rabi', '15-20 quintals'),
        ('Soybean Seeds', '🌿', 'High protein crop used in food and industry',
         '[{"name":"Edible Oil","icon":"🫙"},{"name":"Protein Powder","icon":"💪"},{"name":"Tofu & Soy Milk","icon":"🥛"},{"name":"Biodiesel","icon":"⛽"},{"name":"Animal Feed","icon":"🐄"}]',
         '{"MP","Maharashtra","Rajasthan","Karnataka"}', 'Kharif', '8-12 quintals'),
        ('Cotton Seeds', '🌱', 'India''s white gold — textile and oil crop',
         '[{"name":"Textile Industry","icon":"👕"},{"name":"Cottonseed Oil","icon":"🫙"},{"name":"Paper Industry","icon":"📄"},{"name":"Medical Cotton","icon":"🏥"},{"name":"Animal Feed","icon":"🐄"}]',
         '{"Gujarat","Maharashtra","Telangana","Punjab"}', 'Kharif', '6-10 quintals'),
        ('Mustard Seeds', '🌻', 'Important rabi oilseed crop',
         '[{"name":"Mustard Oil","icon":"🫙"},{"name":"Condiments","icon":"🍯"},{"name":"Pickle Industry","icon":"🥒"},{"name":"Ayurveda","icon":"🌿"},{"name":"Animal Feed","icon":"🐄"}]',
         '{"Rajasthan","UP","MP","Haryana"}', 'Rabi', '6-8 quintals')
    `);

    await client.query("COMMIT");
    console.log("Database seeded successfully!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seed failed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
