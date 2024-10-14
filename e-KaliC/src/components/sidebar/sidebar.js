import GetUserData from "../../contexts/api/udata";

import { Link, useLocation } from "react-router-dom";

import "./sidebar.css";
import lefort from "../../assets/images/lefort.jpg";

import {
  BsFolder2Open,
  BsGlobe2,
  BsGeoAlt,
  BsHouse,
  BsInfoLg,
  BsGoogle,
  BsPeople,
  BsStickies,
  BsReception4,
  BsGraphUp,
  BsGraphDown,
  BsCashStack,
  BsCashCoin,
  BsInfoCircle,
  BsGear,
  BsQuestionCircle,
} from "react-icons/bs";

export default function Sidebar() {
  const u_info = GetUserData();
  const location = useLocation();

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky">
        <div className="carte-visite">
          <img
            src={lefort}
            alt="bg-lefort"
            className="logo img-fluid rounded-circle me-2"
            style={{ width: "3.5rem", height:"3rem" }}
          />
          <div className="carte-visite-name">
            <p className="text-muted">Bonjour</p> <b>{u_info.u_nom}</b>
          </div>
        </div>

        <ul className="nav flex-column">
          <li className={location.pathname === "/home/" ? "active" : ""}>
            <Link to="/loka/">
              <span>
                <BsHouse />
              </span>
              <p>Menu</p>
            </Link>
          </li> 

          <div className="separator"></div>

          {u_info.u_karazana == 1 && (
            <li className={location.pathname === "/users/" ? "active" : ""}>
              <Link to="/users/">
                <span>
                  <BsPeople />
                </span>
                <p>Utilisateurs</p>
              </Link>
            </li>
          )}
          <li className={location.pathname === "/about/" ? "active" : ""}>
            <Link to="/about/">
              <span>
                <BsInfoCircle />
              </span>
              <p>Apropos</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
