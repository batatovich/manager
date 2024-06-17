import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllEntries, deleteEntry, saveEntry, editEntry } from '../api';
import EntryModal from './modals/EntryModal';
import './Entries.css';

const Log = () => {
  const queryClient = useQueryClient();
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [entryData, setEntryData] = useState({});

  const { data: entries = [], error, isLoading } = useQuery({
    queryKey: ['entries'],
    queryFn: fetchAllEntries,
  });

  const saveMutation = useMutation({
    mutationFn: saveEntry,
    onSuccess: () => {
      queryClient.invalidateQueries(['entries']);
      handleClose();
    },
    onError: (error) => {
      console.error('Error saving entry:', error);
    },
  });

  const editMutation = useMutation({
    mutationFn: editEntry,
    onSuccess: () => {
      queryClient.invalidateQueries(['entries']);
      handleClose();
    },
    onError: (error) => {
      console.error('Error editing entry:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEntry,
    onSuccess: () => {
      queryClient.invalidateQueries(['entries']);
    },
    onError: (error) => {
      console.error('Error deleting entry:', error);
    },
  });

  const handleNewEntry = () => {
    setEntryData({});
    setIsEntryModalOpen(true);
  };

  const handleEditEntry = (entry) => {
    setEntryData(entry);
    setIsEntryModalOpen(true);
  };

  const handleClose = () => {
    setIsEntryModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (!entryData.id) {
      saveMutation.mutate(entryData);
    } else {
      editMutation.mutate(entryData);
    }
  };

  const handleDelete = async (id) => {
    deleteMutation.mutate(id);
  };

  const renderCellWithTooltip = (content) => (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id={`tooltip-${content}`}>{content}</Tooltip>}
    >
      <span>{content}</span>
    </OverlayTrigger>
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading entries!</div>;

  return (
    <>
      <Button variant="primary" onClick={handleNewEntry}>
        Add New Entry
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Asset</th>
            <th>Amount</th>
            <th>Counterparty</th>
            <th>Creation Date</th>
            <th>Completion Date</th>
            <th>Observations</th>
            <th></th>
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
                <td>{entry.counterparty}</td>
                <td>{entry.creationdate}</td>
                <td>{entry.completiondate}</td>
                <td className='table-cell'>{renderCellWithTooltip(entry.observations)}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}
                  >
                    <Button variant="danger" size="sm" onClick={() => handleDelete(entry.id)}>
                      <FaTrash />
                    </Button>
                  </OverlayTrigger>
                  {' '}
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
                  >
                    <Button variant="primary" size="sm" onClick={() => handleEditEntry(entry)}>
                      <FaEdit />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <EntryModal
        isOpen={isEntryModalOpen}
        onClose={handleClose}
        entryData={entryData}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    </>
  );
};

export default Log;
