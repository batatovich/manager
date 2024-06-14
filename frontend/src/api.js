import axios from 'axios';
import { API_URLS } from './apiConfig';

const axiosInstance = axios.create({
  baseURL: API_URLS.BASE, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// POST request to save an entry to database. Returns the saved entry.
export const saveEntry = async (entryData) => {
    try {
      const response = await axiosInstance.post(API_URLS.SAVE_ENTRY, entryData);
      return response.data;
    } catch (error) {
      console.error('Error saving entry:', error);
      throw error;
    }
  };
  
  // PUT request to edit an entry in database. Returns the edited entry, fetched from database.
  export const editEntry = async (entryData) => {
    try {
      const response = await axiosInstance.put(API_URLS.EDIT_ENTRY, entryData);
      return response.data;
    } catch (error) {
      console.error('Error editing entry:', error);
      throw error;
    }
  };
  
  // DELETE request to remove entry from database by unique id. Does not return anything.
  export const deleteEntry = async (id) => {
    try {
      await axiosInstance.delete(`${API_URLS.DELETE_ENTRY}/${id}`);
    } catch (error) {
      console.error('Error deleting entry:', error.message);
      throw error;
    }
  };
  
  // GET request to get all entries stored in database. Returns an array of entries.
  export const fetchAllEntries = async () => {
    try {
      const response = await axiosInstance.get(API_URLS.GET_ALL_ENTRIES);
      return response.data;
    } catch (error) {
      console.error('Error fetching entries:', error);
      throw error;
    }
  };
  
export const saveAccount = async (accountData) => {
  try {
    const response = await axiosInstance.post(API_URLS.SAVE_ACCOUNT, accountData);
    return response.data;
  } catch (error) {
    console.error('Error saving account:', error);
    throw error;
  }
};

export const editAccount = async (accountData) => {
  try {
    const response = await axiosInstance.put(API_URLS.EDIT_ACCOUNT, accountData);
    return response.data;
  } catch (error) {
    console.error('Error editing account:', error);
    throw error;
  }
};

export const deleteAccount = async (id) => {
  try {
    await axiosInstance.delete(`${API_URLS.DELETE_ACCOUNT}/${id}`);
  } catch (error) {
    console.error('Error deleting account:', error.message);
    throw error;
  }
};

export const fetchAllAccounts = async () => {
  try {
    const response = await axiosInstance.get(API_URLS.GET_ALL_ACCOUNTS);
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export default axiosInstance;