import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllEntries, deleteEntry } from '../api';
import EntryModal from './modals/EntryModal';
import { fetchAllAccounts } from '../api';
import { useEntryModal } from '../contexts/EntryModalContext';
import { formatDate } from '../utils/helpers';
import './Entries.css';

const Log = () => {
  const queryClient = useQueryClient();
  const { openModal } = useEntryModal();

  const { data: entries = [], error, isLoading } = useQuery({
    queryKey: ['entries'],
    queryFn: fetchAllEntries,
  });

  const { data: accounts = [] } = useQuery({
    queryKey: ['accounts'],
    queryFn: fetchAllAccounts,
  });

  const accountLookup = accounts.reduce((acc, account) => {
    acc[account.id] = account.name;
    return acc;
  }, {});

  const deleteMutation = useMutation({
    mutationFn: deleteEntry,
    onSuccess: () => {
      queryClient.invalidateQueries(['entries']);
    },
    onError: (error) => {
      console.error('Error deleting entry:', error);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading entries!</div>;

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Asset</th>
            <th>Amount</th>
            <th>Account</th>
            <th>Counterparty</th>
            <th>Creation Date</th>
            <th>Completion Date</th>
            <th>Observations</th>
            <th>
              <Button variant="primary" onClick={() => openModal()}>
                New Entry
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan="8">No entries found.</td>
            </tr>
          ) : (
            entries.slice().reverse().map((entry, index) => (
              <tr key={index}>
                <td className={`type-cell ${entry.type.toLowerCase()}`}>{entry.type}</td>
                <td>{entry.asset}</td>
                <td>{entry.amount}</td>
                <td>{accountLookup[entry.account_id]}</td>
                <td>{entry.counterparty}</td>
                <td>{formatDate(entry.creationdate)}</td>
                <td>{formatDate(entry.completiondate)}</td>
                <td className='table-cell'>{entry.observations}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}
                  >
                    <Button variant="light" size="sm" onClick={() => deleteMutation.mutate(entry.id)}>
                      <FaTrash />
                    </Button>
                  </OverlayTrigger>
                  {' '}
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
                  >
                    <Button variant="light" size="sm" onClick={() => openModal(entry)}>
                      <FaEdit />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <EntryModal />
    </>
  );
};

export default Log;
