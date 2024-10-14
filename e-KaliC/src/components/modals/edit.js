import React, { useState, useEffect } from "react";
import axios from "../../contexts/api/axios";
import { toast } from "react-toastify";

import { Modal, Button } from "react-bootstrap";  

export default function EditModal({ lnom, id, onClose, onSave }) {
  const [editedLnom, setEditedLnom] = useState(lnom);

  const handleSave = () => {
    // Logic to save edited data
    const updatedData = {
      id,
      lnom: editedLnom,
    };
    onSave(updatedData); // Pass updated data to parent component
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Trofel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          value={editedLnom}
          onChange={(e) => setEditedLnom(e.target.value)}
          placeholder="Edit Name"
          className="form-control"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
