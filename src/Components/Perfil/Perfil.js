import React from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import "firebase/auth";
import { withRouter } from 'react-router-dom'
import Navigation from "../NavBar/Navigation";

function Perfil(){

    return(
        <div>
            <Navigation/>
<div>You're perfil</div>
        </div>
        
    )
}

export default withRouter(Perfil)