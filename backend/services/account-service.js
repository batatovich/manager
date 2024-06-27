const pool = require('../db');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const accountService = {

    // Save new account in database
    saveAccount: async (accountData) => {
        const table = process.env.DB_ACCOUNTS_TABLE;
        const schema = process.env.DB_SCHEMA;
        const query = `
        INSERT INTO ${schema}.${table} (name, type)
        VALUES ($1, $2)
        RETURNING *;`;
        try {
            const client = await pool.connect();
            const { name, type } = accountData;
            const values = [name, type];
            const account = await client.query(query, values);
            client.release();
            return account.rows[0];

        } catch (error) {
            console.error('account-service | saveAccount: Error saving account to database!', error.message);
            throw error;
        }
    },

    // Get account from database by unique id
    getAccount: async (id) => {
        const table = process.env.DB_ACCOUNTS_TABLE;
        const schema = process.env.DB_SCHEMA;
        const query = `
        SELECT * FROM ${schema}.${table}
        WHERE id = $1;`;
        try {
            const client = await pool.connect();
            const account = await client.query(query, [id]);
            client.release();
            return account.rows[0]; // Return the found account

        } catch (error) {
            console.error('account-service | getAccount: Error finding account by ID:', error.message);
            throw error;
        }
    },

    // Edit account using account data provided by the frontend
    editAccount: async (accountData) => {
        const table = process.env.DB_ACCOUNTS_TABLE;
        const schema = process.env.DB_SCHEMA;
        const query = `
            UPDATE ${schema}.${table}
            SET 
                name = $1,
                type = $2
            WHERE id = $3
            RETURNING *;
        `;
        try {
            const client = await pool.connect();
            const result = await client.query(query, [
                accountData.name,
                accountData.type,
                accountData.id
            ]);
            client.release();
            return result.rows[0];
        } catch (error) {
            console.error('account-service | editAccount: Error editing account:', error.message);
            throw error;
        }
    },

    // Delete account from the database using unique id
    deleteAccount: async (id) => {
        const accounts_table = process.env.DB_ACCOUNTS_TABLE;
        const entries_table = process.env.DB_ENTRIES_TABLE;
        const schema = process.env.DB_SCHEMA;
    
        let client;
        try {
            client = await pool.connect();
            const result = await client.query(`SELECT COUNT(*) FROM ${schema}.${entries_table} WHERE account_id = $1;`, [id]);
            if (parseInt(result.rows[0].count, 10) > 0) {
                throw new Error('The account has associated entries and cannot be deleted.');
            }
            await client.query(`DELETE FROM ${schema}.${accounts_table} WHERE id = $1;`, [id]);
    
        } catch (error) {
            console.error('account-service | deleteAccount: Error deleting account by ID:', error.message);
            throw error;
        } finally {
            if (client) {
                client.release();
            }
        }
    },

    // Get all accounts stored in database
    getAllAccounts: async () => {
        const table = process.env.DB_ACCOUNTS_TABLE;
        const schema = process.env.DB_SCHEMA;
        const query = `SELECT * FROM ${schema}.${table} ORDER BY "createdat" ASC;`;
        try {
            const client = await pool.connect();
            const allAccounts = await client.query(query);
            client.release();
            return allAccounts.rows;

        } catch (error) {
            console.error('account-service | getAllAccounts: Error fetching accounts!', error.message);
            throw error;
        }
    }
};

module.exports = accountService;
