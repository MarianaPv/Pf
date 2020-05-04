import React, {useState, useEffect} from 'react'
import app from "firebase/app";
import { withRouter } from 'react-router-dom'
import Navigation from "../NavBar/Navigation";
import * as ROUTES from "../../Routes/Routes.js";
import "firebase/database";
import './index.css'
import _ from "lodash";


var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


function Home(){
    const [add, setAdd] = useState("")    
    const [sub, setSub] = useState("") 
    const [original, setOriginal] = useState("")
    const [allData, setAllData] = useState([])
    const [id, setId] = useState("0")
    
    
    const getAllData = () =>{
        
        return app
          .database()
          .ref("/messages")
          .on("value", snapshot => {
            const firebaseData = _.toArray(snapshot.val());
            setAllData(firebaseData); 
        })

      }

      useEffect(() => {
        getAllData();
      }, []);

      useEffect(() => {
        console.log(allData)
      }, [allData]);


    const handleSubmit = (ele) =>{

        if(add>0){
            setOriginal(ele.cantidadAlmacen-sub+parseInt(add));
        }else{
            
            setOriginal(ele.cantidadAlmacen-sub);
        }
        
        if ((add-sub)<ele.cantidadAlmacen){
            
        let resumen= {
            "cantidadAlmacen":original,
            "cantidadRetirada" :sub,
            "cantidadIngresada" :add
        }
        
        let messageRef = firebase.database().ref('messages').orderByKey( ).limitToLast
        firebase.database().ref('messages/'+ele.referencia).update(resumen);

        }else{

            alert("¡Se intenta retirar más de la cantidad disponible de producto!");
        }
    }
    
    let dataTable =  allData.length>0 && allData.map((ele,index) => {
        return(
            <tr>
                <td>{index}</td>
                <td>{ele.nombreItem}</td>
                <td>{ele.referencia}</td>
                <td>{ele.cantidadAlmacen}</td>
                <td><input type = "text" onChange ={e => setSub(e.target.value)} id="inputText"/></td>
                <td> <input type = "text" onChange ={e => setAdd(e.target.value)} id="inputText"/></td>
                <td>
                <select>
                    <option value="litro">litro</option>
                    <option value="mililitro">mililitro</option>
                    <option value="metro">metro</option>
                </select>
                </td>
                <td id="extra"><button className="botoncito" onClick = {() => handleSubmit(ele)} >Guardar</button></td>
            </tr>
        )
    })

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
            {dataTable}
        </table>

        </div> 
      </div>
    )
    }


export default withRouter(Home)
                 