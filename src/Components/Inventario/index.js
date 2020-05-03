import React, {Component, useState} from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Navigation from "../NavBar/Navigation";
import * as ROUTES from "../../Routes/Routes.js";
import "firebase/database";
import './index.css'


var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


function Home(){
    const [add, setAdd] = useState("")    
    const [sub, setSub] = useState("") 
    const [original, setOriginal] = useState("1530")
    


    const handleSubmit = () =>{
        
        
        if(add>0){
            setOriginal(original-sub+parseInt(add));
        }else{
            
            setOriginal(original-sub);
        }
        
        if ((add-sub)<original){
            console.log(add-sub)
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
    <th>{original}
 </th>
                <th>
                    <input type = "text" onChange ={e => setSub(e.target.value)} id="inputText"/>
                    
                   </th>
                <th>
                <input type = "text" onChange ={e => setAdd(e.target.value)} id="inputText"/>
                   
                    
                </th>
                <th>
                <select>
                    <option value="litro">litro</option>
                    <option value="mililitro">mililitro</option>
                    <option value="metro">metro</option>
                </select>
                </th>
                <th><button className="botoncito" onClick = {handleSubmit}>Guardar</button></th>
                
            </tr>
        </table>

        </div> 
      </div>
    )
    }


export default withRouter(Home)