import React from "react";
import "./loadingEDT.css";

export default function LoadingEDT() {
  return Array.from({ length: 3 }).map((_, index) => (
    <div
      key={index}
      className="mb-2 mb-2 d-flex justify-content-center align-items-center contenu-corps-sous-cadre cardTrofel"
    >
      <div className="card-loading"></div>
    </div>
  ));
}
