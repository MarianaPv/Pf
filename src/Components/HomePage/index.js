import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import './index.css'
import * as ROUTES from "../../Routes/Routes.js";



function HomePage(props) {
	

	return (
        <div className = "bodyb">
		<div className="main1">
			<div className="paper1">
    				<div className ="claseUno3" style={{color: "black", fontWeight: "bolder", fontSize: "20px", alignSelf:'center'}}>¡BIENVENIDO!</div>
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
		</div>
        </div>
	)
}

export default withRouter(HomePage)