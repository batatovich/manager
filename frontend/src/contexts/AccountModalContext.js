import React, { createContext, useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveAccount, editAccount } from '../api';

const AccountModalContext = createContext();

export const useAccountModal = () => useContext(AccountModalContext);

export const AccountModalProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountData, setAccountData] = useState({ name: '', type: '' });

  const openModal = (account = { name: '', type: '' }) => {
    setAccountData(account);
    setIsAccountModalOpen(true);
  };

  const closeModal = () => {
    setAccountData({ name: '', type: '' });
    setIsAccountModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({ ...prevData, [name]: value }));
  };

  const saveMutation = useMutation({
    mutationFn: saveAccount,
    onSuccess: (savedAccount) => {
      queryClient.setQueryData(['accounts'], (old) => [...old, savedAccount]);
      closeModal();
    },
    onError: (error) => {
      console.error('Error saving account:', error);
    },
  });

  const editMutation = useMutation({
    mutationFn: editAccount,
    onSuccess: (editedAccount) => {
      queryClient.setQueryData(['accounts'], (old) =>
        old.map((account) => (account.id === editedAccount.id ? editedAccount : account))
      );
      closeModal();
    },
    onError: (error) => {
      console.error('Error editing account:', error);
    },
  });

  const handleSave = () => {
    const { name, type, id } = accountData;
    if (!id) {
      saveMutation.mutate({ name, type });
    } else {
      editMutation.mutate({ id, name, type });
    }
  };

  return (
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

