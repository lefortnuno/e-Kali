import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsEye, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

import EditModal from "../modals/edit";
import DeleteModal from "../modals/delete";

import './cardTrofel.css'

export default function CardTrofel({
  lnom,
  id,
  onEditSuccess,
  onDeleteSuccess,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  //#region //-modals

  const handleDetailClick = (entity) => {
    navigate(`/aboutLoka/${entity.id}`);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const handleEditSave = (updatedData) => {
    onEditSuccess(); // Trigger getData after edit
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    onDeleteSuccess(id); // Notify parent to refresh data
    setShowDeleteModal(false);
  };

  //#endregion
  return (
    <>
      <div className="mb-2 d-flex justify-content-center align-items-center contenu-corps-sous-cadre cardTrofel">
        <div className="card-underlay">{lnom}</div>
        <div className="card-overlay">
          <div className="co-top" onClick={handleDetailClick}>
            <div className="co-t-maso">
              <BsEye className="maso" />
            </div>
          </div>
          <div className="co-bottom">
            <div className="co-b-left" onClick={handleEditClick}>
              <BsPencilSquare className="flex-grow-1 ovao" />
            </div>
            <div className="co-b-right" onClick={handleDeleteClick}>
              <BsFillTrashFill className="flex-grow-1 fafao" />
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditModal
          lnom={lnom}
          id={id}
          onClose={handleModalClose}
          onSave={handleEditSave}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          lnom={lnom}
          id={id}
          onClose={handleModalClose}
          onDeleteConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
}
