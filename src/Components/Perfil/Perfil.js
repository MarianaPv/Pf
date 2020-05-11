import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom' 
import "firebase/auth";
import app from "firebase/app";
import { withRouter } from 'react-router-dom'
import Navigation from "../NavBar/Navigation";
import './Perfil.css'
import profile from './profile.png'
import logout from './logout2.png'
import "firebase/database";
import _ from "lodash";

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

function Perfil(props){
    
    app.auth().onAuthStateChanged(user => {
        if (!user) {
            props.history.push("/");
        }
    });

    const [nombre1,setNombre1] = useState("")
    const [nombre2,setNombre2] = useState("")
    const [apellido1,setApellido1] = useState("")
    const [apellido2,setApellido2] = useState("")
    const [email,setEmail] = useState("")
    const [user,setUser] = useState("")
    const [nuevaContraseña,setNuevaContraseña] = useState("")
    const [allUsers, setAllUsers] = useState([])

    

    const logout = () => {
        firebase.auth().signOut()
        props.history.replace("/"); 
      };

      const getAllUsers = () =>{
        
        return app
          .database()
          .ref("/usuarios")
          .on("value", snapshot => {
            const firebaseData = _.toArray(snapshot.val());
            setAllUsers(firebaseData); 
        })

      }

      useEffect(() => {
        getAllUsers();
      }, []);

      useEffect(() => {
        console.log(allUsers)
      }, [allUsers]);

      

      const handleUpdate = () =>{

        
        const changePassword = (currentPassword, nuevaContraseña) => {
            this.reauthenticate(currentPassword).then(() => {
                var user1 = firebase.auth().currentUser;
              user.updatePassword(nuevaContraseña).then(() => {
                console.log("Password updated!");
              }).catch((error) => { console.log(error); });
            }).catch((error) => { console.log(error); });
          }


        let resumen2 = {
            "Primer nombre": nombre1,
            "Segundo nombre": nombre2,
            "Primer apellido": apellido1,
            "Segundo apellido": apellido2,  
            "usuario":user,
			"correoElectronico" :email,
			"contraseña" :nuevaContraseña
          

        }

        let messageRef = firebase.database().ref('usuarios').orderByKey( ).limitToLast
        firebase.database().ref('usuarios/').update(resumen2);

        alert("¡Los cambios se han efectuado!")

     

    }
    return(
        <div>
            <Navigation/>
        <div className ="mainP">
            <div className = "bodyP">
                <img className ="imagen" src={profile}/>
                <div className = "contenido">{firebase.auth().currentUser.displayName}</div>
                <div className = "cargo">Jefe de Ventas</div>
                <img className ="imagen2"  onClick = {logout} src={logout} type="image"/>
            
            </div>
            <div className = "body2P">
            <div className = "aclaracion">*En la siguiente sección podrás realizar los cambios que desees a tu perfil, los cuales serán actualizados para tu usuario:</div>
            <div className = "header">Datos Personales:</div>
            <div className = "division">
            <div className = "contenido2">Primer Nombre:</div>
            <input className = "division2" onChange = {e => setNombre1(e.target.value)}></input>
            <div className = "contenido2">Segundo Nombre:</div>
            <input className = "division2" onChange = {e => setNombre2(e.target.value)}></input></div>
            <div className = "divisionAux">
            <div className = "contenido2">Primer Apellido:</div>
            <input className = "division2"onChange = {e => setApellido1(e.target.value)}></input>
            <div className = "contenido2">Segundo Apellido:</div>
            <input className = "division2" onChange = {e => setApellido2(e.target.value)}></input></div>

            <div className = "header2">Modificaciones de la cuenta:</div>
            <div className = "division">
            <div className = "contenido2">Usuario:</div>
            <input className = "division2" onChange = {e => setUser(e.target.value)}></input>
            <div className = "contenido2">E-mail:</div>
            <input className = "division2" onChange = {e => setEmail(e.target.value)}></input></div>
            <div className = "divisionAux">
            <div className = "contenido2">Contraseña Actual:</div>
            <input className = "division2"></input>
            <div className = "contenido2">Nueva Contraseña:</div>
            <input className = "division2" onChange = {e => setNuevaContraseña(e.target.value)}></input></div>

            <button className="botoncito3" onClick = {() => handleUpdate()}>Guardar Cambios</button>

            
            </div>
        </div>
        </div>
        
    )
}
export default withRouter(Perfil)