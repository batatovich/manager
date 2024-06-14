import { API_URLS } from './apiConfig';

//POST request to save an entry to database. Returns the saved entry.
export const saveEntry = async (entryData) => {
    try {
        const response = await fetch(API_URLS.SAVE_ENTRY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entryData)
        });
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error saving entry:', error);
        throw error;
    }
};

//PUT request to edit an entry in database. Returns the edited entry, fetched from database.
export const editEntry = async (entryData) => {
    try {
        const response = await fetch(API_URLS.EDIT_ENTRY, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entryData)
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error editing entry:', error);
        throw error;
    }
};

//DELETE request to remove entry from database by unique id. Does not return anything.
export const deleteEntry = async (id) => {
    try {
        const response = await fetch(`${API_URLS.DELETE_ENTRY}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete entry!');
        }
    } catch (error) {
        console.error('Error deleting entry:', error.message);
        throw error;
    }
};

//GET request to get all entries stored in database. Returns an array of entries.
export const fetchAllEntries = async () => {
    try {
        const response = await fetch(API_URLS.GET_ALL_ENTRIES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching entries:', error);
        throw error;
    }
};

export const saveAccount = async (accountData) => {g
    try {

        const response = await fetch(API_URLS.SAVE_ACCOUNT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountData)
        });
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error saving entry:', error);
        throw error;
    }
};

export const editAccount = async (accountData) => {
    try {
        const response = await fetch(API_URLS.EDIT_ACCOUNT, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountData)
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error editing entry:', error);
        throw error;
    }
};

export const deleteAccount = async (id) => {
    try {
        const response = await fetch(`${API_URLS.DELETE_ACCOUNT}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete entry!');
        }
    } catch (error) {
        console.error('Error deleting entry:', error.message);
        throw error;
    }
};

export const fetchAllAccounts = async () => {
    try {
        const response = await fetch(API_URLS.GET_ALL_ACCOUNTS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching entries:', error);
        throw error;
    }
};