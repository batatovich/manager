import React, { createContext, useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveEntry, editEntry } from '../api';
import { formatDate, formatText } from '../utils/helpers';

const defaultData = {
    type: 'Expense',
    asset: '',
    amount: '',
    account_id: '',
    counterparty: '',
    completiondate: '',
    observations: '',
  };

// Create a context for the Entry Modal
const EntryModalContext = createContext();

// Custom hook to use EntryModalContext
export const useEntryModal = () => useContext(EntryModalContext);

// Provider component for the EntryModalContext
export const EntryModalProvider = ({ children }) => {
    const queryClient = useQueryClient(); // Access the QueryClient instance
    const [isEntryModalOpen, setIsEntryModalOpen] = useState(false); // Modal closed-open state
    const [entryData, setEntryData] = useState(defaultData); // Entry Data state

    // Function to open the modal and set entry data
    const openModal = (entry = defaultData) => {
        const formattedEntry = {
            ...entry,
            completiondate: formatDate(entry.completiondate),
            creationdate: formatDate(entry.creationdate),
          };
        setEntryData(formattedEntry);
        setIsEntryModalOpen(true);
    };

    const closeModal = () => {
        setIsEntryModalOpen(false);
        setEntryData(defaultData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntryData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Mutation for saving a new entry
    const saveMutation = useMutation({
        mutationFn: saveEntry,
        onSuccess: (savedEntry) => {
            // Update entries data in the query cache with the new entry
            queryClient.setQueryData(['entries'], (old) => [...old, savedEntry]);
            closeModal();
        },
        onError: (error) => {
            console.error('Error saving entry:', error);
        },
    });

    // Mutation for editing an existing entry
    const editMutation = useMutation({
        mutationFn: editEntry,
        onSuccess: (editedEntry) => {
            // Update the entries data in the query cache with the edited entry
            queryClient.setQueryData(['entries'], (old) =>
                old.map((entry) => (entry.id === editedEntry.id ? editedEntry : entry))
            );
            closeModal();
        },
        onError: (error) => {
            console.error('Error editing entry:', error);
        },
    });

    // Function to handle saving entry data (either new or existing)
    const handleSave = () => {
        const formattedEntryData = {
            ...entryData,
            asset: formatText(entryData.asset),
            counterparty: formatText(entryData.counterparty),
            observations: formatText(entryData.observations),
          };
      
        if (!entryData.id) {
            saveMutation.mutate(formattedEntryData); // Save new entry
        } else {
            editMutation.mutate(formattedEntryData); // Edit existing entry
        }
    };

    return (
        <EntryModalContext.Provider
            value={{
                isEntryModalOpen,
                entryData,
                openModal,
                closeModal,
                handleChange,
                handleSave,
            }}
        >
            {children}
        </EntryModalContext.Provider>
    );
};
