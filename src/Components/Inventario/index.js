import React from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import "firebase/auth";
import { withRouter } from 'react-router-dom'
import Navigation from "../NavBar/Navigation";

function Home(){

    return(
        <div>
            <Navigation/>
<div>You're home</div>
        </div>
        
    )
}

export default withRouter(Home)