/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                                      from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderComponent                            from '../components/HeaderComponent'
import FooterComponent                            from '../components/FooterComponent'
import MainContainer                              from '../containers/MainContainer'
import LoginContainer                             from '../containers/LoginContainer'
import NoAuthContainer                            from '../containers/NoAuthContainer'
import BookTicketContainer						  from '../VaccineProof/containers/BookTicketContainer'
import QRVerificationContainer 					  from '../VaccineProof/containers/QRVerificationContainer'
import ProofVerificationContainer                 from '../VaccineProof/containers/ProofVerificationContainer'
import BookTicketProofContainer                   from '../VaccineProof/containers/BookTicketProofContainer'
import Auth from '../helpers/Auth'

import LoginInformationContainer                  from '../containers/LoginInformationContainer'

const PrivateRoute = ({ component, ...options }) => {
	const finalComponent = Auth.getAuth() ? component : NoAuthContainer;
	return <Route {...options} component={finalComponent} />;
  };

function Routes() {
	return (
		<Router>
			<div>
				<Route component={HeaderComponent}/>
				<Switch>
					{ /* Routes de la preuve vaccinale */ } 
					<Route path="/bookForm" 		component={BookTicketContainer} />
					<Route path="/qrProof" 			component={QRVerificationContainer} />
					<Route path="/proofResult" 		component={ProofVerificationContainer} />
					<Route path="/bookProof" 		component={BookTicketProofContainer} />
					<Route path="/proofDisplay" 	component={BookTicketProofContainer} />

					{ /* Routes de base de l'app */ }
					<Route path="/noauth" 			component={NoAuthContainer} />
					<Route path="/login"  			component={LoginContainer} />
					<Route path="/" 				exact component={MainContainer} />

				</Switch>
				<FooterComponent />
			</div>
		</Router>
	)
}

export default Routes
