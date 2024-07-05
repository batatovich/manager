const accountService = require('../services/account-service');
const newAccountSchema = require('../validations/account-schemas');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const saveAccount = async (req, res) => {
    try {
        // If validation is successful, pass the validated value to the service
        const accountData = { ...req.body, user_id: req.user.id };
        const savedAccount = await accountService.saveAccount(accountData);
        res.status(200).json(savedAccount);

    } catch (error) {
        console.error('account-controller > saveAccount: Error saving account to database!', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const getAccount = async (req, res) => {
    try {
        const account = await accountService.getAccount(req.body.id, req.user.id);
        res.status(200).json(account);
    } catch (error) {
        console.error('account-controller > getAccount: Error fetching account from database!', error.message);
        res.status(500).json({ error: `Error fetching account from database with id ${req.body.id}` });
    }
};

const editAccount = async (req, res) => {
    try {
        const account = await accountService.editAccount(req.body, req.user.id);
        res.status(200).json(account);
    } catch (error) {
        console.error('account-controller > editAccount: Error saving account modifications!', error.message);
        res.status(500).json({ error: 'Error saving account changes to database' });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const account = await accountService.deleteAccount(req.params.id, req.user.id);
        res.status(200).json(account);
    } catch (error) {
        console.error('account-controller > deleteAccount: Error deleting account from database!', error.message);
        res.status(400).json({ error: error.message });
    }
};

const getAllAccounts = async (req, res) => {
    try {
        const accounts = await accountService.getAllAccounts(req.user.id);
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
