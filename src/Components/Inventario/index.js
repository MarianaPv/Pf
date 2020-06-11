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
    const [counter, setCounter] = useState(0)
    
    app.auth().onAuthStateChanged(user => {
        if (!user) {
            props.history.push("/");
        }
    });



    const getAllData = () =>{
     
        return app
          .database()
          .ref("/messages")
          .once("value", snapshot => {
            const firebaseData = _.toArray(snapshot.val());
            setAllData(firebaseData); 
            
            firebaseData.map(ele => {
                firebase.database().ref('messages/'+ele.referencia).update({cantidadIngresada:0, cantidadRetirada:0})
              })
        })

      }

      const getAllData2 = () => {
        return app
        .database()
        .ref("/messages")
        .on("value", snapshot => {
          const firebaseData = _.toArray(snapshot.val());
          setAllData(firebaseData); 
         
      })
      }
    
      const handleAdd = (ele, value) => {
          let val = parseInt(value)
        firebase.database().ref('messages/'+ele.referencia).update({cantidadIngresada:value})
        console.log(ele, value)
      }

      const handleSub = (ele, value) => {
        firebase.database().ref('messages/'+ele.referencia).update({cantidadRetirada:value})
      }
      
      
      useEffect(() => {
        getAllData();
        getAllData2()
        
      
      }, []);

      useEffect(() => {
    
    
      
      }, [allData]);


    const handleSubmit = (ele) =>{
       
        if (ele.cantidadRetirada > ele.cantidadAlmacen){
            alert("¡La cantidad en almacén es menor a la que se desea retirar!")
        }else{

        let original = (ele.cantidadIngresada < 0) ? (ele.cantidadAlmacen-ele.cantidadRetirada+(ele.cantidadIngresada)) : (ele.cantidadAlmacen-ele.cantidadRetirada+parseInt(ele.cantidadIngresada)) 
            
        
        console.log(ele)
        console.log(add)
        console.log(original)

            
        let resumen= {
            "cantidadAlmacen":original,
            "cantidadRetirada" :0,
            "cantidadIngresada" :0
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
                <td><input type = "number"onChange ={e => handleSub(ele,e.target.value)} id="inputText" value={ele.cantidadRetirada}/></td>
                <td> <input type="number" onChange ={e => handleAdd(ele, e.target.value)} id="inputText" value={ele.cantidadIngresada}/></td>
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