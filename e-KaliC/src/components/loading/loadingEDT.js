import React from "react";
import "./loadingEDT.css";

export default function LoadingEDT() {
  return (
    // <div className="flex-grow-1 d-flex justify-content-center align-items-center">
    //   <div className="loadingRow">
    //     <div className="loadingLight"></div>
    //     <div className="loadingCell">Chargement des données...</div>
    //   </div>
    // </div>
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="mb-2 mb-2 d-flex justify-content-center align-items-center contenu-corps-sous-cadre cardTrofel"
        >
          <div className="card-loading"></div>
        </div>
      ))}
    </>
  );
}
