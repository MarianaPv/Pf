import React, { useState, useEffect } from 'react'
import './styles.css'
import HomePage from './Components/HomePage/index'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Inventario from './Components/Inventario/index'
import Agregar from './Components/FormProducto/FormProduct'
import Perfil from './Components/Perfil/Perfil'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from './firebase'
  
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/firebase-database";
import "firebase/storage";
import "firebase/messaging";

function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)


	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		});
  })
  

	return firebaseInitialized !== false ? (
		<div>
			<CssBaseline />
			<Router basename="Pf">
				<Switch>
        <Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Inventario} />
          <Route exact path="/agregar-productos" component={Agregar} />
          <Route exact path="/mi-perfil" component={Perfil} />
				</Switch>
			</Router>
      </div>
	) : <div id="loader"><CircularProgress /></div>
}

export default App;