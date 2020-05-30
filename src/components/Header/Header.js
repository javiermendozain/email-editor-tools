// Dependencies
import * as React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";

// Assets
import "./header.css";
import { sumScore } from "../../helpers/";
import {
  LogoClaroNavbar,
  Desafios_Blanco,
  TorneoPro_Blanco,
  Ranking_Blanco,
} from "../../assets";

const Header = () => {
  const firebase = useFirebase();
  const { profile, auth } = useSelector((state) => state.firebase);
  const isLogged = isLoaded(auth) && !isEmpty(auth) && profile.TANDC;
  const history = useHistory();

  return (
    <header>
      <nav className="navbar navbar-expand-lg  ">
        <NavLink className="navbar-brand" to="/">
          <h3 className=" mx-3 mt-3 ">Lista de plantillas</h3>
        </NavLink>
      </nav>
    </header>
  );
};

const UserLogged = ({ profile, history, firebase }) => {
  return (
    <li key="Profile" className="nav-item" role="presentation">
      <li key="Profile-2" className="nav-item dropdown no-arrow">
        <div
          className="dropdown-toggle nav-link profile"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            className="picture-profile"
            src={profile.avatarUrl}
            alt="imagen perfil"
          />
          <small className="header-nickname">
            {profile.nickname}
            {" ( "}
            <strong>{sumScore(profile.enrolledChallenges || {}) || 0}</strong>
            {" )"}
          </small>
        </div>
        <div
          className="dropdown-menu shadow dropdown-menu-right animated--grow-in"
          role="menu"
        >
          <div
            onClick={() => history.push("/profile")}
            className="dropdown-item"
            role="presentation"
          >
            <i className="fas fa-user fa-sm fa-fw  fa-1x mr-2 text-gray-400"></i>
            &nbsp;Perfil
          </div>

          <div className="dropdown-divider"></div>
          <div
            onClick={firebase.logout}
            className="dropdown-item"
            role="presentation"
          >
            <i className="fas fa-sign-out-alt fa-sm fa-fw  fa-1x mr-2 text-gray-400"></i>
            &nbsp;Salir
          </div>
        </div>
      </li>
    </li>
  );
};

const GeneralUI = ({ history }) => {
  return (
    <li key="GeneralUI" className="nav-item" role="presentation">
      <li key="GeneralUI-2" className="nav-item dropdown no-arrow">
        <div
          className="dropdown-toggle nav-link"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-columns  "></i>
          {/* <span className="badge badge-danger badge-counter">7</span> */}
        </div>
        <div
          className="dropdown-menu dropdown-menu-right dropdown-list dropdown-menu-right animated--grow-in"
          role="menu"
        >
          <h6 className="dropdown-header bg-success border-success">
            Dashboard
          </h6>
          {/* start-create-challenge */}
          <div
            onClick={() => history.push("/edit-home")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-user fa-sm fa-fw  fa-2x mr-2 text-gray-400"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>Landing page</span>
              </div>
              <p className="small text-gray-500 mb-0">Editar página inicio</p>
            </div>
          </div>
          {/* end-create-challenge */}
          {/* start-create-challenge */}
          <div
            onClick={() => history.push("/edit-home-after-login")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-user fa-sm fa-fw  fa-2x mr-2 text-gray-400"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>Inicio logeado</span>
              </div>
              <p className="small text-gray-500 mb-0">
                Editar página inicio después del login
              </p>
            </div>
          </div>
          {/* end-create-challenge */}
          {/* start-tems-and-conditions */}
          <div
            onClick={() => history.push("/edit-terminos-condiciones")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-user fa-sm fa-fw  fa-2x mr-2 text-gray-400"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>Terminos y condiciones</span>
              </div>
              <p className="small text-gray-500 mb-0">
                Editar página de terminos y condiciones
              </p>
            </div>
          </div>
          {/* end-tems-and-conditions */}
          {/* start-datas */}
          <div
            onClick={() => history.push("/edit-tratamiento-datos")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-user fa-sm fa-fw  fa-2x mr-2 text-gray-400"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>Tratamiento de datos</span>
              </div>
              <p className="small text-gray-500 mb-0">
                Editar página de tratamiento de datos
              </p>
            </div>
          </div>
          {/* end-data*/}
          {/* start-about-us */}
          <div
            onClick={() => history.push("/edit-about-us")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-user fa-sm fa-fw  fa-2x mr-2 text-gray-400"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>Acerca de</span>
              </div>
              <p className="small text-gray-500 mb-0">
                Editar página de acerca de
              </p>
            </div>
          </div>
          {/* end-about-us*/}
          {/* start-how-work */}
          <div
            onClick={() => history.push("/edit-how-work")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-user fa-sm fa-fw  fa-2x mr-2 text-gray-400"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>Como funciona</span>
              </div>
              <p className="small text-gray-500 mb-0">
                Editar página de como funciona
              </p>
            </div>
          </div>
          {/* end-how-work*/}
        </div>
      </li>
      <div
        className="shadow dropdown-list dropdown-menu dropdown-menu-right"
        aria-labelledby="alertsDropdown"
      ></div>
    </li>
  );
};

const ChallengeUI = ({ history }) => {
  return (
    <li key="ChallengeUI" className="nav-item" role="presentation">
      <li key="ChallengeUI-2" className="nav-item dropdown no-arrow">
        <div
          className="dropdown-toggle nav-link"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-user-astronaut  "></i>
        </div>
        <div
          className="dropdown-menu dropdown-menu-right dropdown-list dropdown-menu-right animated--grow-in"
          role="menu"
        >
          <h6 className="dropdown-header bg-warning border-warning">
            Challenges
          </h6>
          {/* start-Challenge */}
          <div
            onClick={() => history.push("/create-challenge")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-dumbbell fa-sm fa-fw  fa-2x fa-2x mr-2 text-gray-800"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>Desafíos</span>
              </div>
              <p className="small text-gray-500 mb-0">
                Crear desafíos y torneos PRO
              </p>
            </div>
          </div>
          {/* end-Challenge */}
          {/* start-Challenge */}
          <div
            onClick={() => history.push("/redirect")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-dumbbell fa-sm fa-fw  fa-2x fa-2x mr-2 text-gray-800"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>Redirect Mapper</span>
              </div>
              <p className="small text-gray-500 mb-0">Rutas dinámicas</p>
            </div>
          </div>
          {/* end-Challenge */}
          {/* start-news */}
          <div
            onClick={() => history.push("/create-news")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-dumbbell fa-sm fa-fw  fa-2x fa-2x mr-2 text-gray-800"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>Noticias</span>
              </div>
              <p className="small text-gray-500 mb-0">Crear noticias</p>
            </div>
          </div>
          {/* end-news */}
          {/* start-users */}
          <div
            onClick={() => history.push("/users")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-user fa-sm fa-fw  fa-2x fa-2x mr-2 text-gray-800"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>Usuarios</span>
              </div>
              <p className="small text-gray-500 mb-0">
                Lista de usuarios resgistrados
              </p>
            </div>
          </div>
          {/* end-users */}
        </div>
      </li>
      <div
        className="shadow dropdown-list dropdown-menu dropdown-menu-right"
        aria-labelledby="alertsDropdown"
      ></div>
    </li>
  );
};

const UpLoadFileUI = ({ history }) => {
  return (
    <li key="UpLoadFileUI" className="nav-item" role="presentation">
      <li key="UpLoadFileUI-2" className="nav-item dropdown no-arrow">
        <div
          className="dropdown-toggle nav-link"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-box-open   "></i>
        </div>
        <div
          className="dropdown-menu dropdown-menu-right dropdown-list dropdown-menu-right animated--grow-in"
          role="menu"
        >
          <h6 className="dropdown-header bg-info border-info">Archivos</h6>
          {/* start-multimedia */}
          <div
            onClick={() => history.push("/multimedia")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-file-upload fa-sm fa-fw  fa-2x fa-2x mr-2 text-gray-800"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>Multimedia</span>
              </div>
              <p className="small text-gray-500 mb-0">Gestionar archivos</p>
            </div>
          </div>
          {/* end-multimedia */}
        </div>
      </li>
      <div
        className="shadow dropdown-list dropdown-menu dropdown-menu-right"
        aria-labelledby="alertsDropdown"
      ></div>
    </li>
  );
};

const GeneralSetupUI = ({ history }) => {
  return (
    <li key="GeneralSetupUI-1" className="nav-item " role="presentation">
      <li key="GeneralSetupUI-2" className="nav-item dropdown no-arrow">
        <div
          className="dropdown-toggle nav-link"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-code  "></i>
        </div>
        <div
          className="dropdown-menu dropdown-menu-right dropdown-list dropdown-menu-right animated--grow-in"
          role="menu"
        >
          <h6 className="dropdown-header bg-danger border-danger">General</h6>
          {/* start-change-logo */}
          <div
            onClick={() => history.push("/edit-head")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-user fa-sm fa-fw  fa-2x mr-2 text-gray-400"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>TAG Head</span>
              </div>
              <p className="small text-gray-500 mb-0">Agrega tags en head</p>
            </div>
          </div>
          {/* end-change-logo */}
          {/* start-input-html-inside-header
           */}
          {/* <div
            onClick={() => history.push("/put-head")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-user fa-sm fa-fw  fa-2x mr-2 text-gray-400"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>HTML en head</span>
              </div>
              <p className="small text-gray-500 mb-0">Agrega html en el head</p>
            </div>
          </div> */}
          {/* end-input-html-inside-header
           */}
          {/* start-input-html-inside-body
           */}
          <div
            onClick={() => history.push("/put-body")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-user fa-sm fa-fw  fa-2x mr-2 text-gray-400"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>HTML en body</span>
              </div>
              <p className="small text-gray-500 mb-0">Agrega html en el body</p>
            </div>
          </div>
          {/* end-input-html-inside-body
           */}
          {/* start-input-html-inside-body
           */}
          <div
            onClick={() => history.push("/put-footer")}
            className="d-flex align-items-center dropdown-item"
          >
            <i className="fas fa-user fa-sm fa-fw  fa-2x mr-2 text-gray-400"></i>
            <div className="font-weight-bold">
              <div className="text-truncate">
                <span>HTML en footer</span>
              </div>
              <p className="small text-gray-500 mb-0">
                Agrega html en el footer
              </p>
            </div>
          </div>
          {/* end-input-html-inside-body
           */}
        </div>
      </li>

      <div
        className="shadow dropdown-list dropdown-menu dropdown-menu-right"
        aria-labelledby="alertsDropdown"
      ></div>
    </li>
  );
};

export default Header;
