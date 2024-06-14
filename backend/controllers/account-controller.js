const accountService = require('../services/account-service');
const newAccountSchema = require('../validations/account-schemas');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const saveAccount = async (req, res) => {
    try {

        // Validate request body using Joi schema
        const { error, value } = newAccountSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        // If validation is successful, pass the validated value to the service
        const savedAccount = await accountService.saveAccount(value);
        res.status(200).json(savedAccount);

    } catch (error) {
        console.error('account-controller > saveAccount: Error saving account to database!', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const getAccount = async (req, res) => {
    try {
        const { id } = req.body;
        const account = await accountService.getAccount(id);
        res.status(200).json(account);
    } catch (error) {
        console.error('account-controller > getAccount: Error fetching account from database!', error.message);
        res.status(500).json({ error: `Error fetching account from database with id ${id}` });
    }
};

const editAccount = async (req, res) => {
    try {
        const accountData = req.body;
        const account = await accountService.editAccount(accountData);
        res.status(200).json(account);
    } catch (error) {
        console.error('account-controller > editAccount: Error saving account modifications!', error.message);
        res.status(500).json({ error: 'Error saving account changes to database' });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const id = req.params.id;
        const account = await accountService.deleteAccount(id);
        res.status(200).json(account);
    } catch (error) {
        console.error('account-controller > deleteAccount: Error deleting account from database!', error.message);
        res.status(500).json({ error: `Error deleting account from database with id ${id}` });
    }
};

const getAllAccounts = async (req, res) => {
    try {
        const accounts = await accountService.getAllAccounts();
        res.status(200).json(accounts);
    } catch (error) {
        console.error('account-controller > getAllAccounts: Error fetching accounts!', error.message);
        res.status(500).json({ error: 'Error fetching accounts from database' });
    }
};

module.exports = {
    saveAccount,
    getAccount,
    editAccount,
    deleteAccount,
    getAllAccounts
};
