import React, {useState} from "react";
import { Link } from "react-router-dom";
import "firebase/auth";
import app from "firebase/app";
import { withRouter } from "react-router-dom";
import Navigation from "../NavBar/Navigation";
import "./FormProducto.css";
import "firebase/database";


var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

function FormProducto(props) {

  app.auth().onAuthStateChanged(user => {
    if (!user) {
        props.history.push("/");
    }
  });

 const [item, setItem] = useState('');
 const [referencia, setReferencia] = useState('');
 const [add, setAdd] = useState('');
 const [unidad, setUnidad] = useState('');

    const handleSubmit2 = () =>{

        
        let resumen= {
            "nombreItem": item,
            "referencia": referencia,
            "cantidadAlmacen": add,
            "cantidadRetirada": " ",
            "cantidadIngresada": " ",
            "unidad": unidad
        }
        
        let messageRef = firebase.database().ref('messages')
        firebase.database().ref('messages/'+referencia).update(resumen);
        alert("¡Se ha añadido su producto!");
    }
    
  return (
    <div>
      <Navigation />
      <div className="mensaje2">Agrega tus nuevos productos al almacén:</div>
      <div className="sheet">
        <div className="afuera">
          <div className="formato">
            Nombre ítem:
            <div className="especificacion">(nombre general)</div>
            <div className="formato">Referencia:</div>
            <div className="formato">Cantidad a ingresar:</div>
            <div className="formato">
              Unidad que se está ingresando:
              <div className="especificacion">(latas, metros, etc.)</div>
            </div>
            <button className="botoncito2" onClick = {handleSubmit2}>Agregar producto</button>
          </div>
        </div>
        <div className="fillafuera">
          <input autocomplete= "off" id="item" onChange = {e => setItem(e.target.value)}></input>
          <div className="fill">
            <input autocomplete= "off" id="referencia" onChange = {e => setReferencia(e.target.value)}></input>
          </div>
          <div className="fill" >
            <input autocomplete= "off" id="ingresar" onChange = {e => setAdd(e.target.value)}></input>
          </div>
          <div className="fill">
            <input autocomplete= "off" onChange = {e => setUnidad(e.target.value)}></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(FormProducto);
