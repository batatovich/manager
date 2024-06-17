import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import './EntryModal.css';

const EntryModal = ({ isOpen, onClose, entryData = {}, handleChange, handleSave }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm(entryData);
  }, [entryData]);

  const validateForm = (data) => {
    const isValid =
      data?.counterparty?.trim() !== '' &&
      data?.asset?.trim() !== '' &&
      data?.amount > 0 &&
      data?.creationdate?.trim() !== '' &&
      data?.completiondate?.trim() !== '';
    setIsFormValid(isValid);
  };

  return (
    <Modal show={isOpen} onHide={onClose} className="custom-modal-content">
      <Modal.Header closeButton className='custom-modal-header'>
        <Modal.Title>{entryData.id ? 'Edit Entry' : 'New Entry'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <Form onSubmit={handleSave}>
          <Row>
            <Col>
              <Form.Group controlId="type">
                <Form.Label>Type:</Form.Label>
                <Form.Check
                  type="radio"
                  label="Expense"
                  id="expense"
                  checked={entryData.type === 'Expense'}
                  onChange={() => handleChange({ target: { name: 'type', value: 'Expense' } })} />
                <Form.Check
                  type="radio"
                  label="Income"
                  id="income"
                  checked={entryData.type === 'Income'}
                  onChange={() => handleChange({ target: { name: 'type', value: 'Income' } })} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="counterparty">
                <Form.Label>Counterparty:</Form.Label>
                <Form.Control
                  type="text"
                  name="counterparty"
                  value={entryData.counterparty || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="asset">
                <Form.Label>Asset:</Form.Label>
                <Form.Control
                  type="text"
                  name="asset"
                  value={entryData.asset || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="amount">
                <Form.Label>Amount:</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={entryData.amount || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="creationdate">
                <Form.Label>Creation Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="creationdate"
                  value={entryData.creationdate || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="completiondate">
                <Form.Label>Completion Date:</Form.Label>
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
            <Form.Label>Observations:</Form.Label>
            <Form.Control
              as="textarea"
              name="observations"
              value={entryData.observations || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSave} disabled={!isFormValid}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EntryModal;
