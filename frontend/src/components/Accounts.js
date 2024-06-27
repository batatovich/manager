import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllAccounts, deleteAccount } from '../api';
import AccountModal from './modals/AccountModal';
import { useAccountModal } from '../contexts/AccountModalContext';
import './Accounts.css';

const Accounts = () => {
  const queryClient = useQueryClient();
  const { openModal } = useAccountModal();

  const { data: accounts = [], error, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: fetchAllAccounts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts']);
    },
    onError: (error) => {
      console.error('Error deleting account:', error);
      const errorMessage = error.response?.data?.error || 'An unexpected error occurred';
      alert(`Error deleting account: ${errorMessage}`);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading accounts!</div>;

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Balance</th>
            <th>Creation Date</th>
            <th>
              <Button variant="primary" onClick={() => openModal()}>
                New Account
              </Button>
            </th>
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
                <td>{account.createdat}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}
                  >
                    <Button variant="light" size="sm" onClick={() => deleteMutation.mutate(account.id)}>
                      <FaTrash />
                    </Button>
                  </OverlayTrigger>
                  {' '}
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
                  >
                    <Button variant="light" size="sm" onClick={() => openModal(account)}>
                      <FaEdit />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <AccountModal />
    </>
  );
};

export default Accounts;
