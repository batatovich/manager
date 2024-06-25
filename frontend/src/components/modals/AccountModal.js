import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useAccountModal } from '../../contexts/AccountModalContext';
import './AccountModal.css';
import { AccountTypes } from '../../utils/enums';

const AccountModal = () => {
  const queryClient = useQueryClient();
  const { isAccountModalOpen, accountData, closeModal, handleChange, handleSave } = useAccountModal();
  const [formValidated, setFormValidated] = useState(false);
  const [nameError, setNameError] = useState('');

  const isNameUnique = (name) => {
    const accounts = queryClient.getQueryData(['accounts']) || [];
    return !accounts.some(account => account.name === name && account.id !== accountData.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (isNameUnique(accountData.name)) {
      if (form.checkValidity()) {
        handleSave();
        setFormValidated(false);
      } else {
        e.stopPropagation();
        setNameError('Account name is mandatory!');
        setFormValidated(true);
      }
    } else {
      e.stopPropagation();
      setNameError('Account name already exists!');
      setFormValidated(true);
    }
  };

  const handleClose = () => {
    closeModal();
    setFormValidated(false);
    setNameError('');
  };

  return (
    <Modal show={isAccountModalOpen} onHide={handleClose} className="custom-modal-content">
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>{accountData.id ? 'Edit Account' : 'New Account'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={accountData.name}
                  onChange={handleChange}
                  placeholder="Account Name"
                  required
                  isInvalid={!!nameError}
                />
                <Form.Control.Feedback type="invalid">
                  {nameError || 'Please provide a name.'}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="type">
                <Form.Label>Type:</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={accountData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a type</option>
                  {AccountTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Account type is mandatory.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="custom-modal-footer">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AccountModal;
