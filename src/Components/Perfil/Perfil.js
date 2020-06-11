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

    const [nombre1, setNombre1] = useState("")
    const [nombre2, setNombre2] = useState("")
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

      const sendEmail = () => {
        try {
            firebase
                .auth()
                .sendPasswordResetEmail(firebase.auth().currentUser.email)
                .then(() => {
                    alert("Revise su correo para cambiar la contraseña.");
                })
                .catch(err => {
                    alert(err);
                });
        } catch (error) {
            console.log(error.toString());
        }
      }

      useEffect(() => {
        getAllUsers();
      }, []);

      useEffect(() => {
        
      }, [allUsers]);



      const handleUpdate = () =>{

       if(nombre1.trim().length !== 0){
        firebase.database().ref('usuarios/'+firebase.auth().currentUser.displayName).update({primerNombre: nombre1});
       }
        
       if(nombre2.trim().length !== 0){
        firebase.database().ref('usuarios/'+firebase.auth().currentUser.displayName).update({segundoNombre: nombre2});
       }
       if(apellido1.trim().length !== 0){
        firebase.database().ref('usuarios/'+firebase.auth().currentUser.displayName).update({primerApellido: apellido1});
       }
       if(apellido2.trim().length !== 0){
        firebase.database().ref('usuarios/'+firebase.auth().currentUser.displayName).update({segundoApellido: apellido2});
       }
       if(user.trim().length !== 0){
        firebase.database().ref('usuarios/'+firebase.auth().currentUser.displayName).update({usuario: user});
       }
        
       if(cargo.trim().length !== 0){
        firebase.database().ref('usuarios/'+firebase.auth().currentUser.displayName).update({cargo: cargo});
       }

       setNombre1("")
       setNombre2("")
       setApellido1("")
       setApellido2("")
       setUser("")
       setCargo("")
        


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
            <input className = "division2" onChange = {e => setNombre1(e.target.value)} value={nombre1}></input>
            <div className = "contenido2">Segundo Nombre:</div>
            <input className = "division2" onChange = {e => setNombre2(e.target.value)} value={nombre2}></input></div>
            <div className = "divisionAux">
            <div className = "contenido2">Primer Apellido:</div>
            <input className = "division2"onChange = {e => setApellido1(e.target.value)} value={apellido1}></input>
            <div className = "contenido2">Segundo Apellido:</div>
            <input className = "division2" onChange = {e => setApellido2(e.target.value)}  value={apellido2}></input></div>

            <div className = "header2">Modificaciones de la cuenta:</div>
            <div className = "division">
            <div className = "contenido2">Usuario:</div>
            <input className = "division2" onChange = {e => setUser(e.target.value)}  value={user}></input>
            <div className = "contenido2">Cargo actual:</div>
            <input className = "division2" onChange = {e => setCargo(e.target.value)} value={cargo}></input></div>
            <div style={{display:"flex", flexDirection:"column"}}>
            <button className="botoncito4" onClick = {sendEmail}>Restablecer Contraseña</button>
            <button className="botoncito3" onClick = {handleUpdate}>Guardar Cambios</button>
            </div>

            
            </div>
        </div>
        </div>
        
    )
  
}

export default withRouter(Perfil)