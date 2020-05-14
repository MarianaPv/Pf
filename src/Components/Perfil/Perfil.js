import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom' 
import "firebase/auth";
import app from "firebase/app";
import { withRouter } from 'react-router-dom'
import Navigation from "../NavBar/Navigation";
import './Perfil.css'
import profile from './profile.png'
import logout2 from './logout2.png'
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
    const [cargo,setCargo] = useState("")
    const [user,setUser] = useState("")
    const [nuevaContraseña,setNuevaContraseña] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [final, setFinal] = useState("") 

    

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
        
      }, [allUsers]);



      const handleUpdate = () =>{

        let usuario2 = allUsers.length>0 && allUsers.filter(ele => ele.correoElectronico === firebase.auth().currentUser.email)
        

        if (nombre1 === " "){
            setNombre1(usuario2[0].primerNombre)
        }else{
            setNombre1(nombre1)
        }

        if (nombre2.length ===0){
            setNombre2(usuario2[0].segundoNombre)
        }else{
            setNombre2(nombre2)
        }

        if (apellido1.length ===0){
            setApellido1(usuario2[0].primerApellido)
        }else{
            setApellido1(apellido1)
        }
        
        if (apellido2.length ===0){
            setApellido2(usuario2[0].segundoApellido)
        }else{
            setApellido2(apellido2)
        }

        if (user.length ===0){
            setUser(usuario2[0].usuario)
        }else{
            setUser(user)
        }

        if (nuevaContraseña.length ===0){
            setNuevaContraseña(usuario2[0].contraseña)
        }else{
            setNuevaContraseña(nuevaContraseña)
        }

        if (cargo.length ===0){
            setCargo(usuario2[0].contraseña)
        }else{
            setCargo(nuevaContraseña)
        }

        let resumen2 = {
            "primerNombre": nombre1,
            "segundoNombre": nombre2,
            "primerApellido": apellido1,
            "segundoApellido": apellido2,  
            "usuario":user,
            "contraseña" :nuevaContraseña,
            "cargo" :cargo

        }

        let messageRef = firebase.database().ref('usuarios').orderByKey( ).limitToLast
        firebase.database().ref('usuarios/'+firebase.auth().currentUser.displayName).update(resumen2);

        alert("¡Los cambios se han efectuado!")
    

    }



    let usuario = allUsers.length>0 && allUsers.filter(ele => ele.correoElectronico === firebase.auth().currentUser.email)



   

    return(
        <div>
            <Navigation/>
        <div className ="mainP">
            <div className = "bodyP">
                <img className ="imagen" src={profile}/>
                <div className = "contenido">{firebase.auth().currentUser.displayName}</div>
                <div className = "cargo">{usuario.length>0 && usuario[0].cargo}</div>
                <img className ="imagen2" src={logout2} type="image" onClick = {logout} />
            
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
            <div className = "contenido2">Cargo actual:</div>
            <input className = "division2" onChange = {e => setCargo(e.target.value)}></input></div>
            <div className = "divisionAux">
            <div className = "contenido2">Contraseña Actual:</div>
            <input className = "division2"></input>
            <div className = "contenido2">Nueva Contraseña:</div>
            <button className = "division2" >cccccccccc</button></div>

            <button className="botoncito3" onClick = {handleUpdate}>Guardar Cambios</button>

            
            </div>
        </div>
        </div>
        
    )
  
}

export default withRouter(Perfil)