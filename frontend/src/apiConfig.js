const API_BASE_URL = 'http://localhost:3000/api'; 

export const API_URLS = {
  SAVE_ENTRY: `${API_BASE_URL}/entries/save`,
  GET_ENTRY: `${API_BASE_URL}/entries/get`,
  EDIT_ENTRY: `${API_BASE_URL}/entries/edit`,
  DELETE_ENTRY: `${API_BASE_URL}/entries/delete`,
  GET_ALL_ENTRIES: `${API_BASE_URL}/entries/all`,
  SAVE_ACCOUNT: `${API_BASE_URL}/accounts/save`,
  EDIT_ACCOUNT: `${API_BASE_URL}/accounts/edit`,
  DELETE_ACCOUNT: `${API_BASE_URL}/accounts/delete`,
  GET_ALL_ACCOUNTS: `${API_BASE_URL}/accounts/all`,
};