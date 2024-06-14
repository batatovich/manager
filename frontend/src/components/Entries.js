import React, { useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { fetchAllEntries, deleteEntry } from '../api';
import './Entries.css';

const Log = ({ entries, setEntries, handleEdit }) => {
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const allEntries = await fetchAllEntries();
        setEntries(allEntries);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchEntries();
  }, [setEntries]);

  const handleDelete = async (id) => {
    try {
      await deleteEntry(id);
      setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
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
                  <Button variant="primary" size="sm" onClick={() => handleEdit(entry)}>
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

export default Log;
