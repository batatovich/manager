const entryService = require('../services/entry-service');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const saveEntry = async (req, res) => {
  try {
    const entryData = req.body;
    const entry = await entryService.saveEntry(entryData);
    res.status(200).json(entry);
  } catch (error) {
    console.error('entry-controller > saveEntry: Error saving entry to database!', error.message);
    res.status(500).json({ error: 'Error saving Entry to database' });
  }
};

const getEntry = async (req, res) => {
  try {
    const { id } = req.body;
    const entry = await entryService.getEntry(id);
    res.status(200).json(entry);
  } catch (error) {
    console.error('entry-controller > getEntry: Error fetching entry from database!', error.message);
    res.status(500).json({ error: `Error fething entry from database with id ${id}` });
  }
};

const editEntry = async (req, res) => {
  try {
    const entryData  = req.body;
    const entry = await entryService.editEntry(entryData);
    res.status(200).json(entry);
  } catch (error) {
    console.error('entry-controller > editEntry: Error saving entry modifications!', error.message);
    res.status(500).json({ error: 'Error saving entry changes to database' });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const id = req.params.id;
    const entry = await entryService.deleteEntry(id);
    res.status(200).json(entry);
  } catch (error) {
    console.error('entry-controller > deleteEntry: Error deleting entry from database!', error.message);
    res.status(500).json({ error: `Error deleting entry from database with id ${id}` });
  }
};


const getAllEntries = async (req, res) => {
  try {
    const log = await entryService.getAllEntries();
    res.status(200).json(log);
  } catch (error) {
    console.error('entry-controller > getLog: Error fetching log!', error.message);
    res.status(500).json({ error: 'Error fetching log from database' });
  }
};

module.exports = {
  saveEntry,
  getEntry,
  editEntry,
  deleteEntry,
  getAllEntries
};