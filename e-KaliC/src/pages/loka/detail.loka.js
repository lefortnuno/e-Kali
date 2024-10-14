import axios from "../../contexts/api/axios";
import GetUserData from "../../contexts/api/udata";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 

import Header from "../../components/header/header"; 
import Loading from "../../components/loading/loading";

import eKali from "../../assets/images/eKali.png";

export default function InComingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const u_info = GetUserData();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`loka/${id}`, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          setDetails(response.data[0]);
        } else {
          console.log("Détails non disponibles.");
        }
      })
      .catch((error) => {});
  }, []);

  const onClose = () => {
    navigate("/loka/");
  };
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header> 
        </Header>

        <div className="container-fluid flex-grow-1">
          <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 mt-5">
            <div className="monContainer bg-white card mb-3 ">
              <header>Détails du met</header>

              <div className="mt-2">
                <div className="row">
                  <div className="col-md-4">
                    <div className="u-img">
                      <img src={eKali} alt="pdp" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    {!details ? (
                      <Loading />
                    ) : (
                      <div>
                        <p>
                          <b>- </b>
                          Le produit numéroté <b>N°{details.id}</b>, nommé{" "}
                          <b>{details.snom}</b>, est proposé à un prix unitaire
                          de <b>{details.prix}</b>dhs (en{" "}
                          <b>{details.fandrefesana}</b>). Vous pouvez le trouver
                          au lieu suivant: "<b>{details.fandrefesana}</b>"!
                        </p>
                        <p>
                          <b>- </b>
                          <b>{details.hk == 1 ? "Gain" : "Dépense"}</b> d'argent
                          pour{" "}
                          <b>
                            {details.mnom} {details.prenom}
                          </b>{" "}
                          réalisé le <b>{details.date}</b> pour une quantité de{" "}
                          <b>{details.qte}</b>, soit un montant total de{" "}
                          <b>{details.montant}</b>dhs, lié à un service de type{" "}
                          <b>{details.sk == 1 ? "Intellectuel" : "Matériel"}</b>
                          .
                        </p>
                        <p>
                          <b>- Commentaire : </b>
                          {details.coms !== ""
                            ? details.coms
                            : "Aucun commentaire"}
                          .
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={onClose} className="retourBtn btn btn-primary">
                  Retour
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
