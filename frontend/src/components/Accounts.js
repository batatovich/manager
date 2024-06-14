import React, { useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { fetchAllAccounts, deleteAccount } from '../api';
import './Accounts.css';

const Accounts = ({ accounts, setAccounts, handleEdit }) => {
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const allAccounts = await fetchAllAccounts();
        setAccounts(allAccounts);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, [setAccounts]);

  const handleDelete = async (id) => {
    try {
      await deleteAccount(id);
      setAccounts(prevAccounts => prevAccounts.filter(account => account.id !== id));
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const renderCellWithTooltip = (content) => (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id={`tooltip-${content}`}>{content}</Tooltip>}
    >
      <span>{content}</span>
    </OverlayTrigger>
  );

  return (
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
                  <Button variant="danger" size="sm" onClick={() => handleDelete(account.id)}>
                    <FaTrash />
                  </Button>
                </OverlayTrigger>
                {' '}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
                >
                  <Button variant="primary" size="sm" onClick={() => handleEdit(account)}>
                    <FaEdit />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default Accounts;
