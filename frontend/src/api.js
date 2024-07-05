import axios from 'axios';
import { API_URLS } from './apiConfig';

const axiosInstance = axios.create({
  baseURL: API_URLS.BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

//ENTRIES

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
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get(API_URLS.GET_ALL_ENTRIES, {
      headers: { Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    console.error('Error fetching entries:', error);
    throw error;
  }
};

// ACCOUNTS

export const saveAccount = async (accountData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post(API_URLS.SAVE_ACCOUNT, accountData, {
      headers: { Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    console.error('Error saving account:', error);
    throw error;
  }
};

export const editAccount = async (accountData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(API_URLS.EDIT_ACCOUNT, accountData, {
      headers: { Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    console.error('Error editing account:', error);
    throw error;
  }
};

export const deleteAccount = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axiosInstance.delete(`${API_URLS.DELETE_ACCOUNT}/${id}`, {
      headers: { Authorization: `Bearer ${token}`}});
  } catch (error) {
    console.error('Error deleting account:', error.message);
    throw error;
  }
};

export const fetchAllAccounts = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axiosInstance.get(API_URLS.GET_ALL_ACCOUNTS, {
      headers: { Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

// USERS

export const register = async (email, password) => {
  try {
    const response = await axiosInstance.post(API_URLS.REGISTER_USER, { email, password })
    return response.data;
  } catch (error) {
    console.error('Registration error', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.put(API_URLS.LOGIN_USER, { email, password })
    return response.data;
  } catch (error) {
    console.error('Authentication error', error);
    throw error;
  }
};


export default axiosInstance;