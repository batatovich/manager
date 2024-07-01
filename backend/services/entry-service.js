const pool = require('../db');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const entryService = {

    // Save new entry in database
    saveEntry: async (entryData) => {
        const table = process.env.DB_ENTRIES_TABLE;
        const schema = process.env.DB_SCHEMA;
        const query = `
        INSERT INTO ${schema}.${table} (type, amount, asset, completiondate, counterparty, observations, account_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;`;
        try {
            const client = await pool.connect();
            const { type, amount, asset, account_id, completiondate, counterparty, observations } = entryData;
            const values = [type, amount, asset, completiondate, counterparty, observations, account_id];
            const entry = await client.query(query, values);
            client.release();
            return entry.rows[0];

        } catch (error) {
            console.error('entry-service | saveEntry: Error saving entry to database!', error.message);
            throw error;
        }
    },

    // Get entry from database by unique id
    getEntry: async (id) => {
        const table = process.env.DB_ENTRIES_TABLE;
        const schema = process.env.DB_SCHEMA;
        const query = `
        SELECT * FROM ${schema}.${table}
        WHERE id = $1;`;
        try {
            const client = await pool.connect();
            const entry = await client.query(query, [id]);
            client.release();
            return entry; // Return the found entry

        } catch (error) {
            console.error('Error finding entry by ID:', error.message);
            throw error;
        }
    },

    // Edit entry using entry data provided by the frontend
    editEntry: async (entryData) => {
        const table = process.env.DB_ENTRIES_TABLE;
        const schema = process.env.DB_SCHEMA;
        const query = `
            UPDATE ${schema}.${table}
            SET 
                type = $1,
                counterparty = $2,
                asset = $3,
                amount = $4,
                completiondate = $5,
                observations = $6,
                account_id = $7
            WHERE id = $8
            RETURNING *;
        `;
        try {
            const client = await pool.connect();
            const result = await client.query(query, [
                entryData.type,
                entryData.counterparty,
                entryData.asset,
                entryData.amount,
                entryData.completiondate,
                entryData.observations,
                entryData.account_id,
                entryData.id
            ]);
            client.release();
            return result.rows[0];
        } catch (error) {
            console.error('Error editing entry:', error.message);
            throw error;
        }
    },

    // Delete entry from the database using unique id
    deleteEntry: async (id) => {
        const table = process.env.DB_ENTRIES_TABLE;
        const schema = process.env.DB_SCHEMA;
        const query = `
          DELETE FROM ${schema}.${table}
          WHERE id = $1;`;
        try {
            const client = await pool.connect();
            await client.query(query, [id]);
            client.release();

        } catch (error) {
            console.error('Error deleting entry by ID:', error.message);
            throw error;
        }
    },

    // Get all entries stored in database
    getAllEntries: async () => {
        const table = process.env.DB_ENTRIES_TABLE;
        const schema = process.env.DB_SCHEMA;
        const query = `SELECT * FROM ${schema}.${table} ORDER BY creationdate ASC;`;
        try {
            const client = await pool.connect();
            const allEntries = await client.query(query);
            client.release();
            return allEntries.rows;

        } catch (error) {
            console.error('entry-service | getAllEntries: Error fetching log!', error.message);
            throw error;
        }
    }
};

module.exports = entryService;
