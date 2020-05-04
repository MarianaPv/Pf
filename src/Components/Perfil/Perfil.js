import React from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import "firebase/auth";
import { withRouter } from 'react-router-dom'
import Navigation from "../NavBar/Navigation";
import './Perfil.css'
import profile from './profile.png'
import logout from './logout2.png'

function Perfil(){

    return(
        <div>
            <Navigation/>
        <div className ="mainP">
            <div className = "bodyP">
                <img className ="imagen" src={profile}/>
                <div className = "contenido">Mónica Ortega</div>
                <div className = "cargo">Jefe de Ventas</div>
                <img className ="imagen2" src={logout}/>
            
            </div>
            <div className = "body2P">
            <div className = "aclaracion">*En la siguiente sección podrás realizar los cambios que desees a tu perfil, los cuales serán actualizados para tu usuario:</div>
            <div className = "header">Datos Personales:</div>
            <div className = "division">
            <div className = "contenido2">Primer Nombre:</div>
            <input className = "division2"></input>
            <div className = "contenido2">Segundo Nombre:</div>
            <input className = "division2"></input></div>
            <div className = "divisionAux">
            <div className = "contenido2">Primer Apellido:</div>
            <input className = "division2"></input>
            <div className = "contenido2">Segundo Apellido:</div>
            <input className = "division2"></input></div>

            <div className = "header2">Modificaciones de la cuenta:</div>
            <div className = "division">
            <div className = "contenido2">Usuario:</div>
            <input className = "division2"></input>
            <div className = "contenido2">E-mail:</div>
            <input className = "division2"></input></div>
            <div className = "divisionAux">
            <div className = "contenido2">Contraseña Actual:</div>
            <input className = "division2"></input>
            <div className = "contenido2">Nueva Contraseña:</div>
            <input className = "division2"></input></div>

            <button className="botoncito3">Guardar Cambios</button>

            
            </div>
        </div>
        </div>
        
    )
}

export default withRouter(Perfil)