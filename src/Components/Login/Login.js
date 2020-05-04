import React, { useState } from 'react'
import {Input, InputLabel } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import * as ROUTES from "../../Routes/Routes.js";
import firebase from '../../firebase'
import "./Login.css";



function SignIn(props) {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
        
        <div className = "bodyb1">
		<div className="main">
			<div className="paper">
                <div className="claseUno">
				<div style={{color: "black", fontWeight: "bolder", fontSize: "20px", alignSelf:'center'}}>Ingresar</div>
				</div>	
       			
				<div className="form" onSubmit={e => e.preventDefault() && false}>
					<div margin="normal" >
						<InputLabel htmlFor="email">Correo Electrónico</InputLabel>
						<Input id="email" name="email" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
					</div>
					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Contraseña</InputLabel>
						<Input name="password" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
					</div>
					<button 
						type="submit"
						fullWidth
						variant="contained"
                        color="white"              
						onClick={login}
						className="submit">
						INGRESAR
          			</button>
					    <Link to={ROUTES.REGISTRO}>
                        <button	type="submit" fullWidth                     
						className="submit2">
                         REGISTRARSE  </button>
                        </Link>
						
                        </div>	
				</div>
			</div>
		</div>
        
	)

	async function login() {
		try {
            await firebase.login(email, password)
            props.history.replace('/home')
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(SignIn)