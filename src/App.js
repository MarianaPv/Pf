import React, { useState, useEffect } from 'react'
import './styles.css'
import HomePage from './Components/HomePage/index'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Inventario from './Components/Inventario/index'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from './firebase'


export default function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})


	return firebaseInitialized !== false ? (
		<div>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register } />
          <Route exact path="/home" component={Inventario} />
				</Switch>
			</Router>
      </div>
	) : <div id="loader"><CircularProgress /></div>
}