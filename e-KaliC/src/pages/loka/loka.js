import axios from "../../contexts/api/axios";
import GetUserData from "../../contexts/api/udata";

import Header from "../../components/header/header";
import LoadingEDT from "../../components/loading/loadingEDT";
import EmptyCard from "../../components/template/emptyCard";
import CardTrofel from "../../components/template/cardTrofel";
import LokaTitre from "../../components/template/lokaTitre";
import LokaCorps from "../../components/template/lokaCorps";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { FaPlus } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

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

  const u_info = GetUserData();
  const [loka, setLoka] = useState([]);
  const [details, setDetails] = useState(null);
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

  //#region //-search
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible == false) getLoka();
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

      axios
        .post(url_req + `recherche/`, finalInputs, u_info.opts)
        .then((response) => {
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

      <div className="container-fluid flex-grow-1 mt-3">
        <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 main">
          <div className="row">
            <LokaTitre />

            <LokaCorps jour={"Lundi"}>
              <div className="d-flex flex-column corps-sous-cadre">
                {!details ? (
                  <LoadingEDT />
                ) : loka.length > 0 ? (
                  loka
                    .slice(trofa.lundi)
                    .slice(0, 5)
                    .map((s, key) =>
                      s.lnom != "/" ? (
                        <CardTrofel
                          key={key}
                          lnom={s.lnom}
                          id={s.id}
                          onEditSuccess={getLoka}
                          onDeleteSuccess={getLoka}
                        />
                      ) : (
                        <EmptyCard key={key} />
                      )
                    )
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <EmptyCard key={index} onSave={getLoka} />
                  ))
                )}
              </div>
            </LokaCorps>

            <LokaCorps jour={"Mardi"}>
              <div className="d-flex flex-column corps-sous-cadre">
                {!details ? (
                  <LoadingEDT />
                ) : loka.length > 0 ? (
                  loka
                    .slice(trofa.mardi)
                    .slice(0, 5)
                    .map((s, key) =>
                      s.lnom != "/" ? (
                        <CardTrofel
                          key={key}
                          lnom={s.lnom}
                          id={s.id}
                          onEditSuccess={getLoka}
                          onDeleteSuccess={getLoka}
                        />
                      ) : (
                        <EmptyCard key={key} />
                      )
                    )
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <EmptyCard key={index} onSave={getLoka} />
                  ))
                )}
              </div>
            </LokaCorps>

            <LokaCorps jour={"Mercredi"}>
              <div className="d-flex flex-column corps-sous-cadre">
                {!details ? (
                  <LoadingEDT />
                ) : loka.length > 0 ? (
                  loka
                    .slice(trofa.mercredi)
                    .slice(0, 5)
                    .map((s, key) =>
                      s.lnom != "/" ? (
                        <CardTrofel
                          key={key}
                          lnom={s.lnom}
                          id={s.id}
                          onEditSuccess={getLoka}
                          onDeleteSuccess={getLoka}
                        />
                      ) : (
                        <EmptyCard key={key} />
                      )
                    )
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <EmptyCard key={index} onSave={getLoka} />
                  ))
                )}
              </div>
            </LokaCorps>

            <LokaCorps jour={"Jeudi"}>
              <div className="d-flex flex-column corps-sous-cadre">
                {!details ? (
                  <LoadingEDT />
                ) : loka.length > 0 ? (
                  loka
                    .slice(trofa.jeudi)
                    .slice(0, 5)
                    .map((s, key) =>
                      s.lnom != "/" ? (
                        <CardTrofel
                          key={key}
                          lnom={s.lnom}
                          id={s.id}
                          onEditSuccess={getLoka}
                          onDeleteSuccess={getLoka}
                        />
                      ) : (
                        <EmptyCard key={key} />
                      )
                    )
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <EmptyCard key={index} onSave={getLoka} />
                  ))
                )}
              </div>
            </LokaCorps>

            <LokaCorps jour={"Vendredi"}>
              <div className="d-flex flex-column corps-sous-cadre">
                {!details ? (
                  <LoadingEDT />
                ) : loka.length > 0 ? (
                  loka
                    .slice(trofa.vendredi)
                    .slice(0, 5)
                    .map((s, key) =>
                      s.lnom != "/" ? (
                        <CardTrofel
                          key={key}
                          lnom={s.lnom}
                          id={s.id}
                          onEditSuccess={getLoka}
                          onDeleteSuccess={getLoka}
                        />
                      ) : (
                        <EmptyCard key={key} />
                      )
                    )
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <EmptyCard key={index} onSave={getLoka} />
                  ))
                )}
              </div>
            </LokaCorps>

            <LokaCorps jour={"Samedi"}>
              <div className="d-flex flex-column corps-sous-cadre">
                {!details ? (
                  <LoadingEDT />
                ) : loka.length > 0 ? (
                  loka
                    .slice(trofa.samedi)
                    .slice(0, 5)
                    .map((s, key) =>
                      s.lnom != "/" ? (
                        <CardTrofel
                          key={key}
                          lnom={s.lnom}
                          id={s.id}
                          onEditSuccess={getLoka}
                          onDeleteSuccess={getLoka}
                        />
                      ) : (
                        <EmptyCard key={key} />
                      )
                    )
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <EmptyCard key={index} onSave={getLoka} />
                  ))
                )}
              </div>
            </LokaCorps>

            <LokaCorps jour={"Dimanche"}>
              <div className="d-flex flex-column corps-sous-cadre">
                {!details ? (
                  <LoadingEDT />
                ) : loka.length > 0 ? (
                  loka
                    .slice(trofa.dimanche)
                    .slice(0, 5)
                    .map((s, key) =>
                      s.lnom != "/" ? (
                        <CardTrofel
                          key={key}
                          lnom={s.lnom}
                          id={s.id}
                          onEditSuccess={getLoka}
                          onDeleteSuccess={getLoka}
                        />
                      ) : (
                        <EmptyCard key={key} />
                      )
                    )
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <EmptyCard key={index} onSave={getLoka} />
                  ))
                )}
              </div>
            </LokaCorps>
          </div>
        </main>
      </div>
    </div>
  );
  //#endregion
}
