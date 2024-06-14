import { useState } from 'react';
import { saveAccount, editAccount } from '../api';

const useAccountModal = (setAccounts) => {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountData, setAccountData] = useState({ name: '', type: '' });

  const handleNew = () => {
    setAccountData({ name: '', type: '' });
    setIsAccountModalOpen(true);
  };

  const handleEdit = (account) => {
    setAccountData(account);
    setIsAccountModalOpen(true);
  };

  const handleClose = () => {
    setIsAccountModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const { name, type } = accountData; // Only keep the necessary fields

      if (!accountData.id) {
        const savedAccount = await saveAccount({ name, type });
        setAccounts(log => [...log, savedAccount]);
      } else {
        const editedAccount = await editAccount({ id: accountData.id, name, type });
        setAccounts(log => log.map(account => account.id === accountData.id ? editedAccount : account));
      }
      handleClose();
    } catch (error) {
      console.error('Error saving or editing account:', error);
    }
  };


  return {
    isAccountModalOpen,
    accountData,
    handleNew,
    handleEdit,
    handleClose,
    handleChange,
    handleSave
  };
};

export default useAccountModal;
