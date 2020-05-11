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


function Home(props){
    const [add, setAdd] = useState("")    
    const [sub, setSub] = useState("")  
    const [original, setOriginal] = useState("")      
    const [allData, setAllData] = useState([])
    const [id, setId] = useState("0")
    
    app.auth().onAuthStateChanged(user => {
        if (!user) {
            props.history.push("/");
        }
    });



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
       
        if (sub > ele.cantidadAlmacen){
            alert("¡La cantidad en almacén es menor a la que se desea retirar!")
        }else{

        let original = (add < 0) ? (ele.cantidadAlmacen-sub+(add)) : (ele.cantidadAlmacen-sub+parseInt(add)) 
            
        
        console.log(ele)
        console.log(add)
        console.log(original)

            
        let resumen= {
            "cantidadAlmacen":original,
            "cantidadRetirada" :sub,
            "cantidadIngresada" :add
        }

        let messageRef = firebase.database().ref('messages').orderByKey( ).limitToLast
        firebase.database().ref('messages/'+ele.referencia).update(resumen);
    }

    }
    
    let dataTable =  allData.length>0 && allData.map((ele,index) => {
        return(
            <tr>
                <td>{index}</td>
                <td>{ele.nombreItem}</td>
                <td>{ele.referencia}</td>
                <td>{ele.cantidadAlmacen}</td>
                <td><input type = "number"onChange ={e => setSub(e.target.value)} id="inputText"/></td>
                <td> <input type="number" onChange ={e => setAdd(e.target.value)} id="inputText"/></td>
                <td>
                <select>
                    <option value="cartucho">{ele.unidad}</option>

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
                 