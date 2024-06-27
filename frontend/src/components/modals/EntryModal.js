import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { useEntryModal } from '../../contexts/EntryModalContext';
import { fetchAllAccounts } from '../../api';
import './EntryModal.css';

const EntryModal = () => {
  const { isEntryModalOpen, entryData, closeModal, handleChange, handleSave } = useEntryModal();
  const [formValidated, setFormValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      handleSave();
      setFormValidated(false);
    } else {
      e.stopPropagation();
      setFormValidated(true);
    }
  };

  const handleClose = () => {
    closeModal();
    setFormValidated(false);
  };

  // Fetch accounts for the account dropdown
  const { data: accounts = [] } = useQuery({
    queryKey: ['accounts'],
    queryFn: fetchAllAccounts,
  });

  return (
    <Modal show={isEntryModalOpen} onHide={closeModal} className="custom-modal-content">
      <div className="custom-modal-dialog">
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>{entryData.id ? 'Edit Entry' : 'New Entry'}</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
          <Modal.Body className="custom-modal-body">
            <Row>
              <Col>
                <Form.Group controlId="type">
                  <Form.Label>Type</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Expense"
                    id="expense"
                    checked={entryData.type === 'Expense'}
                    onChange={() => handleChange({ target: { name: 'type', value: 'Expense' } })}
                  />
                  <Form.Check
                    type="radio"
                    label="Income"
                    id="income"
                    checked={entryData.type === 'Income'}
                    onChange={() => handleChange({ target: { name: 'type', value: 'Income' } })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="counterparty">
                  <Form.Label>Counterparty</Form.Label>
                  <Form.Control
                    type="text"
                    name="counterparty"
                    value={entryData.counterparty || ''}
                    onChange={handleChange}
                    placeholder='Counterparty'
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="asset">
                  <Form.Label>Asset</Form.Label>
                  <Form.Control
                    type="text"
                    name="asset"
                    value={entryData.asset || ''}
                    onChange={handleChange}
                    placeholder='Asset'
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={entryData.amount || ''}
                    placeholder='Amount'
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="account_id">
                  <Form.Label>Account</Form.Label>
                  <Form.Control
                    as="select"
                    name="account_id"
                    value={entryData.account_id || ''}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled hidden>Select an account</option>
                    {accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="completiondate">
                  <Form.Label>Completion Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="completiondate"
                    value={entryData.completiondate || ''}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="observations">
              <Form.Label>Observations</Form.Label>
              <Form.Control
                as="textarea"
                name="observations"
                value={entryData.observations || ''}
                placeholder='Enter any relevant observations if needed'
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="custom-modal-footer">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" type="submit" >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};

export default EntryModal;
