import GetUserData from "../../contexts/api/udata";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsGearFill, BsGear, BsPower } from "react-icons/bs";

import "./header.css";
import eKali from "../../assets/images/eKali.png";

// Le composant Header avec un bouton hamburger pour le menu
export default function Header({ children }) {
  const u_info = GetUserData();
  const navigate = useNavigate();

  // Fonction pour se déconnecter et rediriger vers la page de connexion
  const seDeconnecterDuSession = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  // Fonction pour faire défiler vers le haut lorsque le menu est ouvert
  const scrollToTop = () => {
    const sidebar = document.getElementById("sidebarMenu");
    if (sidebar) {
      sidebar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Vérifie si l'utilisateur est connecté (u_token) avant d'afficher l'entête
  return (
    <>
      {u_info.u_token ? (
        <header className="py-3">
          <div className="header container-fluid d-flex justify-content-between align-items-center bg-white">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-light me-3 d-md-none text-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#sidebarMenu"
                  aria-controls="sidebarMenu"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={scrollToTop}
                >
                  &#9776; Menu
                </button>
              </div>

              <img
                src={eKali}
                alt="bg-eKali"
                className="logo img-fluid rounded-circle me-2"
              />
            </div>

            <div className="d-flex align-items-center">
              <div className="inputRecherche m-3">{children}</div>

              <div className="nav-item dropdown">
                <span
                  className="profile-pic"
                  onClick={(e) => seDeconnecterDuSession(e)}
                >
                  <span>Déconnection</span>
                </span>
              </div>
            </div>
          </div>
        </header>
      ) : null}
    </>
  );
}
