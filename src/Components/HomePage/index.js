import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import './index.css'
import * as ROUTES from "../../Routes/Routes.js";



function HomePage(props) {
	

	return (
		<main className="main1">
			<div className="paper1">
    				<div>¡BIENVENIDO!</div>
                <Link to={ROUTES.LOGIN}>
				<button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"

					className="submit6">
					INGRESAR
          		</button>
                  </Link>
                  <Link to={ROUTES.REGISTRO}>
                  <button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"

					className="submit7">
					REGISTRARSE 
          		</button>
                  </Link>
				
			</div>
		</main>
	)
}

export default withRouter(HomePage)