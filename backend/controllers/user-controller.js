const userService = require('../services/user-service');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const userController = {
    register: async (req, res) => {
        const { email, password } = req.body;
        try {
            const id = await userService.createUser(email, password);
            return res.status(201).json(id);
        } catch (error) {
            if (error.message === 'ExistingEmail') {
                return res.status(400).json({ error: 'Email already in use.' })
            }
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const result = await userService.authenticateUser(email, password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(401).json({ error: error.message })
        }
    },

    get: async (req, res) => {
        const { id } = req.body;
        try {
            const result = await userService.get(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    delete: async (req, res) => {
        const { id } = req.params.id;
        try {
            await userService.delete(id);
            return res.status(200).json({ message: 'User deleted successfully.' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = userController;