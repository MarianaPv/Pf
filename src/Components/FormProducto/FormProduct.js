import React from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import "firebase/auth";
import { withRouter } from 'react-router-dom'
import Navigation from "../NavBar/Navigation";
import './FormProducto.css'

function FormProducto(){

    return(
        <div>
            <Navigation/>
        <div className = "mensaje2">Agrega tus nuevos productos al almacén:</div>
        <div className = "sheet">

        <div className = "afuera">
            <div className = "formato">Nombre ítem:
                <div className ="especificacion">(nombre general)</div>
            <div className = "formato">Referencia:</div>
            <div className = "formato">Cantidad a ingresar:</div>
            <div className = "formato">Unidad que se está ingresando:
                <div className ="especificacion">(latas, metros, etc.)</div></div>
            <button className = "botoncito2">Agregar producto</button>
        </div>
        </div>
        <div className ="fill"><input></input></div>
              
        
        </div>

        </div>
        
    )
}

export default withRouter(FormProducto)