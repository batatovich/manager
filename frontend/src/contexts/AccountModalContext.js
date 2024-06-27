import React, { createContext, useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveAccount, editAccount } from '../api';

// Create a context for the Account Modal
const AccountModalContext = createContext();

// Custom hook to use the AccountModalContext
export const useAccountModal = () => useContext(AccountModalContext);

// Provider component for the AccountModalContext
export const AccountModalProvider = ({ children }) => {
  const queryClient = useQueryClient(); // Access the QueryClient instance
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false); // Modal open state
  const [accountData, setAccountData] = useState({ name: '', type: '' }); // Account data state

  // Function to open the modal and set account data
  const openModal = (account = { name: '', type: '' }) => {
    setAccountData(account);
    setIsAccountModalOpen(true);
  };

  // Function to close the modal and reset account data
  const closeModal = () => {
    setAccountData({ name: '', type: '' });
    setIsAccountModalOpen(false);
  };

  // Function to handle input changes and update account data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Mutation for saving a new account
  const saveMutation = useMutation({
    mutationFn: saveAccount,
    onSuccess: (savedAccount) => {
      // Update the accounts data in the query cache with the new account
      queryClient.setQueryData(['accounts'], (old) => [...old, savedAccount]);
      closeModal();
    },
    onError: (error) => {
      console.error('Error saving account:', error);
    },
  });

  // Mutation for editing an existing account
  const editMutation = useMutation({
    mutationFn: editAccount,
    onSuccess: (editedAccount) => {
      // Update the accounts data in the query cache with the edited account
      queryClient.setQueryData(['accounts'], (old) =>
        old.map((account) => (account.id === editedAccount.id ? editedAccount : account))
      );
      closeModal();
    },
    onError: (error) => {
      console.error('Error editing account:', error);
    },
  });

  // Function to handle saving account data (either new or existing)
  const handleSave = () => {
    if (!accountData.id) {
      saveMutation.mutate(accountData); // Save new account
    } else {
      editMutation.mutate(accountData); // Edit existing account
    }
  };

  return (
    // Provide context values to children components
    <AccountModalContext.Provider
      value={{
        isAccountModalOpen,
        accountData,
        openModal,
        closeModal,
        handleChange,
        handleSave,
      }}
    >
      {children}
    </AccountModalContext.Provider>
  );
};
