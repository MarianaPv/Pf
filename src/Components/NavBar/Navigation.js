import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../Routes/Routes.js";
import { withRouter } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  const logout = () => {
    props.history.replace("/"); //Irse a página de login al hacer logout
  };

  return (
    <div className="bodyy">
      <section>
        <header>
          <div className="navBox">
            <ul className="extra" >
              <li>
                <Link to={ROUTES.HOME}>Productos en Almacén</Link>
                
              </li>
              <li>
                <Link to={ROUTES.AGREGAR}>Agregar Productos</Link>
              </li>
              <li>
                <Link to={ROUTES.PERFIL}>Mi Perfil</Link>
              </li>
            </ul>
          </div>
          <input className="logout" type="image" src="https://firebasestorage.googleapis.com/v0/b/covid-277603.appspot.com/o/Logo.png?alt=media&token=35b42d6b-a53a-4264-9243-4b75888baa81" />
        </header>
      </section>
    </div>
  );
}
export default withRouter(Navigation);
