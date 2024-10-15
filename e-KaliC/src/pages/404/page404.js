import React from "react";
import { useNavigate } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";

import Header from "../../components/header/header";
import page404 from "../../assets/images/page404.svg";
import Loading from "../../components/loading/loading";

import "./pageNotFound.css";

export default function PageNotFound() {
  const navigate = useNavigate();
  const redirectedToHome = () => {
    navigate("/loka/");
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ overflow: "hidden" }}
    >
      <Header />
      <div className="container-fluid flex-grow-1">
        <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 mt-5">
          <div className="bg-white card mb-3 ">
            <header className="bg-primary text-white py-2 d-flex align-items-center">
              <BsInfoCircle className="ms-4 fs-5" />
              <h4 className="me-4 m-0 flex-grow-1 text-center">
                Détails du Plât
              </h4>
            </header>

            <div className="mt-2">
              <div className="row">
                <div className="col-md-4">
                  <div className="u-img">
                    <img src={page404} alt="pdp" />
                  </div>
                </div>
                <div className="col-md-8">
                <Loading text={"Nous ne trouvons la page que vous demandez..."} />
                </div>
              </div>
              <button
                onClick={redirectedToHome}
                className="btn btn-primary w-50 m-2"
              >
                Retour
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
