import React, { useState, useEffect } from 'react';
import { saveEntry, editEntry } from '../api';
import { formatDate } from '../utils/helpers';

const defaultEntryData = {
  type: 'Expense',
  counterparty: '',
  asset: '',
  amount: '',
  creationdate: '',
  completiondate: '',
  observations: ''
};

const useEntryModal = (setEntries) => {
  const [isEntryModalOpen, setEntryModalOpen] = useState(false);
  const [entryData, setEntryData] = useState(defaultEntryData);

  useEffect(() => {
    if (isEntryModalOpen && entryData.id) {
      setEntryData({
        ...entryData,
        creationdate: entryData.creationdate ? formatDate(entryData.creationdate) : '',
        completiondate: entryData.completiondate ? formatDate(entryData.completiondate) : '',
      });
    }
  }, [isEntryModalOpen, entryData.id]);

  const handleNew = () => {
    setEntryData(defaultEntryData);
    setEntryModalOpen(true);
  };

  const handleEdit = (entry) => {
    setEntryData(entry);
    setEntryModalOpen(true);
  };

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
    }
    setEntryData(defaultEntryData);
    setEntryModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntryData({ ...entryData, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (!entryData.id) {
        const savedEntry = await saveEntry(entryData);
        setEntries(log => [...log, savedEntry]);
      } else {
        const editedEntry = await editEntry(entryData);
        setEntries(log => log.map(entry => entry.id === entryData.id ? editedEntry : entry));
      }
      handleClose();
    } catch (error) {
      console.error('Error saving or editing entry:', error);
    }
  };

  return {
    isEntryModalOpen,
    entryData,
    handleNew,
    handleEdit,
    handleClose,
    handleChange,
    handleSave
  };
};

export default useEntryModal;
