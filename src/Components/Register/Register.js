import React, { useState } from 'react'
import {Input, InputLabel } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import * as ROUTES from "../../Routes/Routes.js";
import "./Register.css";


function Register(props) {


	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [quote, setQuote] = useState('')

	return (
		<main className="main2">
			<div className="paper2">
            <div className="claseUno2">
				<div style={{color: "black", fontWeight: "bolder", fontSize: "20px", alignSelf:'center'}}>Registrarse</div>
       			</div>
				<form className="form" onSubmit={e => e.preventDefault() && false }>
					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="name">Nombre</InputLabel>
						<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
					</div>
					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Correo Electrónico</InputLabel>
						<Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
					</div>
					<div margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Contraseña</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
					</div>


					<button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={onRegister}
						className="submit3">
						REGISTRARSE
          			</button>
                     
					    <Link to={ROUTES.LOGIN}>
                        <button	
                        type="submit" 
                        fullWidth                     
						className="submit4">
                        IR ATRÁS </button>
                        </Link>

				</form>
			</div>
		</main>
	)

	async function onRegister() {
		try {
			await firebase.register(name, email, password)
			
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(Register)