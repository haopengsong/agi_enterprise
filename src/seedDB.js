require('dotenv').config();
const bcrypt = require('bcrypt')
const { Pool } = require( 'pg' );

async function dbConnection() {
//  console.log( process.env );
  const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
  });
  return pool.connect();
}

async function createUserTable( client ) {
    try {
        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        const createTable = await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                password TEXT NOT NULL
            );
        `);
        console.log( 'Created "users" table' );
        return createTable;
    } catch ( error ) {
        console.error( 'Error creating "users" table:', error );
        throw error;
    }
}

async function createPromptTable( client ) {
    // create prompts table using user_id as primary key from users table
    try {
        const createTable = await client.query(`
            CREATE TABLE IF NOT EXISTS prompts (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID REFERENCES users(id),
                prompt TEXT NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        console.log( 'Created "prompts" table' );
        return createTable;
    } catch ( error ) {
        console.error( 'Error creating "prompts" table:', error );
        throw error;
    }
}

async function insertUser( client, name, password) {
    try {
        const hashedPassword = await bcrypt.hash( password, 10 );
        const preparedQuery = `
            INSERT INTO users (name, password)
            VALUES ($1, $2)
            ON CONFLICT (id) DO NOTHING;
        `; 
        const preparedValues = [name, hashedPassword];
        return client.query(preparedQuery, preparedValues);
    } catch ( error ) {
        console.error( 'Error inserting user:', error );
        throw error;
    }
}


(async () => {
    const client = await dbConnection();
    console.log('DB connected!');
    try {
        await createUserTable( client );
        await createPromptTable( client );
        await insertUser( client, 'test', 'test' );
    } catch ( error ) {
        console.error( 'Error seeding database:', error );
    } finally {
        client.release();
    }
}) ();