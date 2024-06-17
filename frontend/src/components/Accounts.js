import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllAccounts, deleteAccount, saveAccount, editAccount } from '../api';
import AccountModal from './modals/AccountModal';
import './Accounts.css';

const Accounts = () => {
  const queryClient = useQueryClient();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountData, setAccountData] = useState({ name: '', type: '' });

  const { data: accounts = [], error, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: fetchAllAccounts,
  });

  /* Accounts state mutations */
  const saveMutation = useMutation({
    mutationFn: saveAccount,
    onSuccess: (savedAccount) => {
      queryClient.setQueryData(['accounts'], (old) => [...old, savedAccount]);
      handleClose();
    },
    onError: (error) => {
      console.error('Error saving account:', error);
    },
  });

  const editMutation = useMutation({
    mutationFn: editAccount,
    onSuccess: (editedAccount) => {
      queryClient.setQueryData(['accounts'], (old) =>
        old.map((account) =>
          account.id === editedAccount.id ? editedAccount : account
        ));
      handleClose();
    },
    onError: (error) => {
      console.error('Error editing account:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts']);
    },
    onError: (error) => {
      console.error('Error deleting account:', error);
    },
  });

  /* Accounts tab buttons handlers */
  const handleNewAccountBtn = () => {
    setAccountData({ name: '', type: '' });
    setIsAccountModalOpen(true);
  };

  const handleEditAccountBtn = (account) => {
    setAccountData({ name: account.name, type: account.type });
    setIsAccountModalOpen(true);
  };

  const handleDeleteAccountBtn = (id) => {
    deleteMutation.mutate(id);
  }

  /* Modal handlers */
  const handleClose = () => {
    setAccountData({ name: '', type: '' });
    setIsAccountModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const { name, type, id } = accountData; // Only keep the necessary fields
    if (!id) {
      saveMutation.mutate({ name, type });
    } else {
      editMutation.mutate({ id, name, type });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading accounts!</div>;

  return (
    <>
      <Button variant="primary" onClick={handleNewAccountBtn}>
        New Account
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Balance</th>
            <th>Created At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accounts.length === 0 ? (
            <tr>
              <td colSpan="5">No accounts found.</td>
            </tr>
          ) : (
            accounts.slice().reverse().map((account, index) => (
              <tr key={index}>
                <td>{account.name}</td>
                <td>{account.type}</td>
                <td>{account.balance}</td>
                <td>{account.createdAt}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}
                  >
                    <Button variant="danger" size="sm" onClick={() => handleDeleteAccountBtn(account.id)}>
                      <FaTrash />
                    </Button>
                  </OverlayTrigger>
                  {' '}
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
                  >
                    <Button variant="primary" size="sm" onClick={() => handleEditAccountBtn(account)}>
                      <FaEdit />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={handleClose}
        accountData={accountData}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    </>
  );
};

export default Accounts;
