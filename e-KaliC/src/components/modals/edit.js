import axios from "../../contexts/api/axios";
import GetUserData from "../../contexts/api/udata";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { BsEye, BsFillReplyAllFill } from "react-icons/bs";
import { BiSolidSave } from "react-icons/bi";

import { Modal, Button } from "react-bootstrap";
import "./maForm.css";

export default function EditModal({ lnom, id, onClose, onSave }) {
  const navigate = useNavigate();
  const u_info = GetUserData();

  const [editedLnom, setEditedLnom] = useState(lnom);
  const initialInputs = {
    lnom: "",
  };

  const [inputs, setInputs] = useState(initialInputs);
  const [erreurs, setErreurs] = useState({
    lnom: false,
  });
  const [messages, setMessages] = useState({
    lnom: "",
  });

  const handleDetailClick = (entity) => {
    navigate(`/aboutLoka/${entity.id}`);
  };

  const handleSave = () => { 
    if (!erreurs.lnom) {
      const finalInputs = {
        ...inputs,
        nom: inputs.lnom,
      };

      axios
        .put(`loka/${id}`, finalInputs, u_info.opts)
        .then((response) => {
          if (response.status === 200 && response.data.success) {
            onSave(); // Pass updated data to parent component
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message || "Échec de la modification!");
          }
        })
        .catch(() => {
          toast.error("Erreur lors de la modification!");
        })
        .finally(() => {});
    }
  };

  //#region //-handleChange
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, [name]: false }));
    setMessages((values) => ({ ...values, [name]: "" }));

    if (name === "lnom" && value.length > 25) {
      setErreurs((values) => ({ ...values, lnom: true }));
      setMessages((values) => ({
        ...values,
        lnom: "Le nom du plât est trop long",
      }));
    }
  };
  //#endregion

  //#region //-useEffect
  useEffect(() => {
    axios
      .get(`loka/${id}`, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          setInputs(response.data[0]);
        } else {
          toast.warning("Plât non disponibles!");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors du chargement du plât!");
      });
  }, []);

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Changer le Plat </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="input-field">
            {/* <label>Nom :</label> */}
            <input
              type="text"
              name="lnom"
              onChange={handleChange}
              value={inputs.lnom}
              placeholder="Entrez un plât"
              autoComplete="off"
            />
            <small className="text-danger d-block">
              {erreurs.lnom ? messages.lnom : null}
            </small>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="row w-100">
          <div className="col d-flex justify-content-start">
            <Button
              className="w-50"
              variant="success"
              onClick={handleDetailClick}
            >
              <BsEye className="maso" />
            </Button>
          </div>

          <div className="col d-flex justify-content-end">
            <Button className="w-100 me-2" variant="danger" onClick={onClose}>
              <BsFillReplyAllFill />
            </Button>
            <Button className="w-100" variant="primary" onClick={handleSave}>
              <BiSolidSave />
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
