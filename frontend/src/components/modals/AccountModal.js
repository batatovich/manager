import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import './AccountModal.css'; 
import { AccountTypes } from '../../utils/enums';

const AccountModal = ({ isOpen, onClose, accountData, handleChange, handleSave }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm(accountData);
  }, [accountData]);

  const validateForm = (data) => {
    const isValid = data.name.trim() !== '' && data.type.trim() !== '';
    setIsFormValid(isValid);
  };

  return (
    <Modal show={isOpen} onHide={onClose} className="custom-modal-content">
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>{accountData.id ? 'Edit Account' : 'New Account'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <Form onSubmit={handleSave}>
          <Row>
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
                />
              </Form.Group>
            </Col>
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
                  <option value="" style={{ opacity: 0.5 }}>Select a type</option>
                  {AccountTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
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

export default AccountModal;
