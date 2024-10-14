import axios from "../../contexts/api/axios";
import GetUserData from "../../contexts/api/udata";

import Header from "../../components/header/header";
import DeleteModal from "../../components/modals/delete";
import LoadingEDT from "../../components/loading/loadingEDT";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaPlus } from "react-icons/fa";
import {
  BsFillTrashFill,
  BsPencilSquare,
  BsEye,
  BsPersonPlusFill,
  BsSearch,
} from "react-icons/bs";

import "./loka.css";

const url_req = `loka/`;
const trofa = {
  lundi: 0,
  mardi: 5,
  mercredi: 10,
  jeudi: 15,
  vendredi: 20,
  samedi: 25,
  dimanche: 30,
  trofa69: 69,
};

export default function Loka() {
  //#region //-variable
  const navigate = useNavigate();

  const u_info = GetUserData();
  const [loka, setLoka] = useState([]);
  const [details, setDetails] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchVisible]);

  useEffect(() => {
    getLoka();
  }, []);
  //#endregion

  //#region //-Loka
  function getLoka() {
    axios
      .get(url_req + `rehetra/` + `${u_info.u_id}`, u_info.opts)
      .then(function (response) {
        if (response.status === 200) {
          let allLoka = response.data;

          // Si la longueur est inférieure à 35, ajouter les objets manquants
          if (allLoka.length < 35) {
            const missingCount = 35 - allLoka.length;

            for (let i = 1; i <= missingCount; i++) {
              allLoka.push({
                id: i, // Incrémente à partir du dernier id
                idM: u_info.u_id,
                lnom: "/",
                mnom: u_info.u_nom,
                prenom: u_info.u_prenom,
              });
            }
          }

          setLoka(allLoka);
          response.data.length != 0
            ? setDetails(allLoka[0].id)
            : setDetails(trofa.trofa69);
        } else {
          toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
        }
      })
      .catch((error) => {
        setLoka([]); // Gérer l'erreur en réinitialisant les Loka à un tableau vide
      });
  }
  //#endregion

  //#region //-modals
  const handleDeleteClick = (loka) => {
    setSelectedEntity(loka);
    setShowDeleteModal(true);
  };
  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    getLoka();
  };

  const handleEditClick = (entity) => {
    navigate(`/editLoka/${entity.id}`, { state: { entity } });
  };

  const handleDetailClick = (entity) => {
    navigate(`/aboutLoka/${entity.id}`, { state: { entity } });
  };
  //#endregion

  //#region //-search
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };
  const [contenuTab, setContenuTab] = useState(false);

  function rechercheElement(event) {
    const valeur = event.target.value;
    if (!valeur) {
      getLoka();
      setContenuTab(false);
    } else {
      const finalInputs = {
        idM: u_info.u_id,
        val: valeur,
      };

      axios.post(`recherche`, finalInputs, u_info.opts).then((response) => {
        if (response.data.success) {
          setLoka(response.data.res);
          setContenuTab(true);
        } else {
          setLoka(response.data.res);
          setContenuTab(false);
        }
      });
    }
  }
  //#endregion

  //#region //-html
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header>
        {!searchVisible && (
          <BsSearch className="searchIcon" onClick={toggleSearch} />
        )}
        {searchVisible && (
          <input
            type="text"
            name="searchValue"
            placeholder="Rechercher ...."
            autoComplete="off"
            className="form-control text-dark"
            ref={searchInputRef}
            onBlur={() => setSearchVisible(false)}
            onChange={rechercheElement}
          />
        )}
      </Header>

      <div className="container-fluid flex-grow-1">
        <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 main">
          <div className="row">
            <div className="col-md">
              <div className="row cadre">
                <div className="d-flex flex-column sous-cadre">
                  <div
                    className="mb-2 d-flex justify-content-center align-items-center titre-sous-cadre"
                    style={{
                      color: "transparent",
                      backgroundColor: "transparent",
                    }}
                  >
                    {" "}
                    ...{" "}
                  </div>
                  <div className="d-flex flex-column corps-sous-cadre">
                    <div className="bg-primary mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                      Petit Dejeuner
                    </div>
                    <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                      Gouter
                    </div>
                    <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                      Dejeuner
                    </div>
                    <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                      Souper
                    </div>
                    <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                      Dinner
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md">
              <div className="row cadre">
                <div className="d-flex flex-column sous-cadre">
                  <div className="mb-2 d-flex justify-content-center align-items-center titre-sous-cadre">
                    Lundi
                  </div>

                  <div className="d-flex flex-column corps-sous-cadre">
                    {!details ? (
                      <LoadingEDT />
                    ) : (
                      <>
                        {loka.length > 0 ? (
                          loka
                            .slice(trofa.lundi)
                            .slice(0, 5)
                            .map((s, key) => (
                              <div
                                className="mb-2 mb-2 d-flex justify-content-center align-items-center contenu-corps-sous-cadre cardTrofel"
                                key={key}
                              >
                                {s.lnom != "/" ? (
                                  <>
                                    <div className="card-underlay">
                                      {s.lnom}
                                    </div>
                                    <div className="card-overlay">
                                      <div className="co-top">
                                        <div className="co-t-maso">
                                          <BsEye
                                            onClick={() => handleDetailClick(s)}
                                            className="maso"
                                          />
                                        </div>
                                      </div>
                                      <div className="co-bottom">
                                        <div className="co-b-left">
                                          <BsPencilSquare
                                            onClick={() => handleEditClick(s)}
                                            className="flex-grow-1 ovao"
                                          />
                                        </div>
                                        <div className="co-b-right">
                                          <BsFillTrashFill
                                            onClick={() => handleDeleteClick(s)}
                                            className="flex-grow-1 fafao"
                                          />
                                        </div>
                                      </div>
                                    </div>{" "}
                                  </>
                                ) : (
                                  <div className="card-vide"></div>
                                )}
                              </div>
                            ))
                        ) : (
                          <>
                            {Array.from({ length: 5 }).map((_, index) => (
                              <div
                                key={index}
                                className="mb-2 mb-2 d-flex justify-content-center align-items-center contenu-corps-sous-cadre cardTrofel"
                              >
                                <div className="card-vide"></div>
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md">
              <div className="row cadre">
                <div className="d-flex flex-column">
                  <div className="mb-2 d-flex justify-content-center align-items-center titre-sous-cadre">
                    Mardi
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Petit Dejeuner
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Gouter
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dejeuner
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Souper
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dinner
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="row cadre">
                <div className="d-flex flex-column">
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Mercredi
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Petit Dejeuner
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Gouter
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dejeuner
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Souper
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dinner
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="row cadre">
                <div className="d-flex flex-column">
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Jeudi
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Petit Dejeuner
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Gouter
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dejeuner
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Souper
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dinner
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="row cadre">
                <div className="d-flex flex-column">
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Vendredi
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Petit Dejeuner
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Gouter
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dejeuner
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Souper
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dinner
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="row cadre">
                <div className="d-flex flex-column">
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Samedi
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Petit Dejeuner
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Gouter
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dejeuner
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Souper
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dinner
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="row cadre">
                <div className="d-flex flex-column">
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dimanche
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Petit Dejeuner
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Gouter
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dejeuner
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Souper
                  </div>
                  <div className="mb-2 flex-grow-1 d-flex justify-content-center align-items-center">
                    Dinner
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedEntity && (
            <DeleteModal
              show={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={handleDeleteConfirm}
              entity={selectedEntity}
              entityName={"histo"}
              auth={u_info.opts}
            />
          )}
        </main>
      </div>
    </div>
  );
  //#endregion
}
