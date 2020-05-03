import React, {Component, useState} from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Navigation from "../NavBar/Navigation";
import * as ROUTES from "../../Routes/Routes.js";
import { Dropdown, Menu } from 'semantic-ui-react'
import "firebase/database";
import './index.css'


var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


function Home(){
    const [add, setAdd] = useState("")    
    const [sub, setSub] = useState("") 
    const [original, setOriginal] = useState("1530")

    const options = [
        { key: 1, text: 'Choice 1', value: 1 },
        { key: 2, text: 'Choice 2', value: 2 },
        { key: 3, text: 'Choice 3', value: 3 },
    ]



    const handleSubmit = () =>{
        const valorInicial = () =>{
            setOriginal(original-sub+add);
        }

        if ((add-sub)<original){
        let resumen= {
            "cantidad en almacen":original,
            "cantidad retirada" :sub,
            "cantidad ingresada" :add
        }
        
        let messageRef = firebase.database().ref('messages').orderByKey().limitToLast
        firebase.database().ref('messages').push(resumen);

        }else{
            alert("¡Se intenta retirar más de la cantidad disponible de producto!");
        }
    }
    

    return(
        <div>
            <Navigation/>
            <div className = "mensaje">¡Bienvenido! , estos son tus productos en almacén:</div>
        <div className = "principal">
            
        <table className="tableClosed">
            <tr>
                <th>ID</th>
                <th>Nombre Ítem</th>
                <th>Referencia</th>
                <th>Cantidad en almacén</th>
                <th>Cantidad a retirar</th>
                <th>Cantidad a ingresar</th>
                <th>Unidad</th>
                <th>   </th>
            </tr>
            <tr>
                <th>1 </th>
                <th> TUBO</th>
                <th> TUBO ESTRIADO CRUDO 1/2" FT-113</th>
    <th>{original}</th>
                <th>
                    <input type = "text" onChange ={e => setSub(e.target.value)} id="inputText"/>
                    
                   </th>
                <th>
                <input type = "text" onChange ={e => setAdd(e.target.value)} id="inputText"/>
                   
                    
                </th>
                <th>
                <Menu compact>
    <Dropdown text='Dropdown' options={options} simple item />
  </Menu>
                </th>
                <th><button onClick = {handleSubmit}>Guardar</button></th>
                
            </tr>
        </table>

        </div> 
      </div>
    )
    }


export default withRouter(Home)