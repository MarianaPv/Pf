import React from 'react'
import { Link } from 'react-router-dom'
import "firebase/auth";
import { withRouter } from 'react-router-dom'
import Navigation from "../NavBar/Navigation";
import * as ROUTES from "../../Routes/Routes.js";
import firebase from '../../firebase'
import './index.css'

function Home(){

    return(
        <div>
            <Navigation/>
<div>You're home</div>
<div className = "principal">
        <table className="tableClosed">
            <tr>
                <th>ID</th>
                <th>Nombre Ítem</th>
                <th>Referencia</th>
                <th>Cantidad en almacén</th>
                <th>Cantidad a retirar</th>
                <th>Unidad</th>
            </tr>
            <tr>
                <th>1 </th>
                <th> 2</th>
                <th> 2</th>
                <th> 3</th>
                <th>Cantidad a retirar</th>
                <th>Referencia</th>
            </tr>
        </table>

        </div> 
      </div>
    )
}

export default withRouter(Home)