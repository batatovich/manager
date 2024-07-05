const pool = require('../db');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const secretKey = process.env.JWT_SECRET_KEY;

const userService = {

    // Function to create a new user
    createUser: async (email, password) => {
        try {
            const table = process.env.DB_USERS_TABLE;
            const schema = process.env.DB_SCHEMA;
            const client = await pool.connect();

            const check = await client.query(`SELECT * FROM ${schema}.${table} WHERE email = $1 `, [email]);
            if (check.rows.length > 0) {
                client.release();
                throw new Error('ExistingEmail');
            };

            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await pool.query(
                `INSERT INTO ${schema}.${table} (email, password) VALUES ($1, $2) RETURNING id`,
                [email, hashedPassword]
            );

            client.release();
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw error;
        }
    },

    // Function to authenticate a user
    authenticateUser: async (email, password) => {
        try {
            const table = process.env.DB_USERS_TABLE;
            const schema = process.env.DB_SCHEMA;
            const client = await pool.connect();
            const result = await client.query(
                `SELECT id, email, password FROM ${schema}.${table} WHERE email = $1`,
                [email]
            );
            client.release();

            const user = result.rows[0]; // User = {id, email, password}
            if (!user) {
                throw new Error('User not found');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
            return { token };
        } catch (error) {
            console.error('Error authenticating user:', error.message);
            throw error;
        }
    },

    // Function to get user by ID
    get: async (id) => {
        try {
            const table = process.env.DB_USERS_TABLE;
            const schema = process.env.DB_SCHEMA;
            const client = await pool.connect();
            const result = await client.query(
                `SELECT id, email, createdat FROM ${schema}.${table} WHERE id = $1`,
                [id]
            );
            client.release();

            return result.rows[0];
        } catch (error) {
            console.error('Error fetching user by ID:', error.message);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const table = process.env.DB_USERS_TABLE;
            const schema = process.env.DB_SCHEMA;
            const client = await pool.connect();
            await client.query(`DELETE FROM ${schema}.${table} WHERE id = $1`, [id]);
            client.release();
        } catch (error) {
            console.error('Error deleting user:', error.message);
            throw error;
        }
    }
};

module.exports = userService;