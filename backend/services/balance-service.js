const pool = require('../db');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const accountBalanceService = {
    getAccountBalances: async (accountId) => {
        const result = await pool.query('SELECT * FROM manager.account_balances WHERE account_id = $1', [accountId]);
        return result.rows;
    },

    updateAccountBalance: async (accountId, balances) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Delete existing balances for the account
            await client.query('DELETE FROM manager.account_balances WHERE account_id = $1', [accountId]);

            // Insert new balances
            for (const balance of balances) {
                await client.query(
                    'INSERT INTO manager.account_balances (account_id, asset, balance) VALUES ($1, $2, $3)',
                    [accountId, balance.asset, balance.balance]
                );
            }

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
};

module.exports = accountBalanceService;
