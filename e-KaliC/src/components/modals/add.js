import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddModal = ({ show, handleClose, onSave }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un élément</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formItemName">
            <Form.Label>Nom de l'élément</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrer le nom de l'élément"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
