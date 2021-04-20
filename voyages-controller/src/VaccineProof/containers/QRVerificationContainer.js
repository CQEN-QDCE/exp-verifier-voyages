/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState, useEffect }       from 'react'
import { Container, Button, Col, Spinner }  from 'reactstrap'
import { useTranslation } 					from 'react-i18next' 
import QRPreuveComponent                    from '../components/QRPreuveComponent'
import { GET_API_SECRET }                   from '../../config/constants'
import { GET_CRED_ID } 						from '../../config/constants'
import { fetchWithTimeout }                 from '../../helpers/fetchWithTimeout'
import                                           '../../assets/styles/LoginContainer.css'


function QRVerificationContainer(props){

	console.log("function QRVerificationContainer()")
	console.log(props.location.state);
	console.log("Cabin: " + props.location.state.ticket.cabin);
	const { t } = useTranslation(['translation', 'vaccine']); 
	let INTERVAL = 5000; 
	let TIMEOUT  = 3000; 

    const [showAuthButton, setAuthButton]  = useState(false);
	const [showLoader, setLoader]          = useState(false)

	let cred_def_id = 'MRKu4v1ECzY2vfsKZp9MMU:3:CL:123821:test'; 

    useEffect(() => {
        //cred_def_id = process.env.REACT_APP_CRED_DEF_VACCINE;
		//cred_def_id = '93sgLV7ev5PDWuP49xqiXC:3:CL:123709:test'
        getConnectionInfo()
    }, []);

    function getConnectionInfo() {
		console.log("function getConnectionInfo()")
		try {
			fetchWithTimeout(`/connections/${props.location.state.invitation.connection_id}`,
				{
					method : 'GET',
					headers: {
						'X-API-Key'    : `${GET_API_SECRET()}`,
						'Content-Type' : 'application/json; charset=utf-8',
					}
				}, TIMEOUT).then((
					resp => {
						try {
							resp.json().then((data => {
								if (data.state) {
									let intervalFunction;
									data.state === "invitation" ? intervalFunction = setTimeout(getConnectionInfo, INTERVAL) : clearIntervalFunction(intervalFunction);
								} else {
									console.log('En attent de réponse!');
									setTimeout(getConnectionInfo, INTERVAL)
								}
							}))
						} catch (error) {
							setTimeout(getConnectionInfo, INTERVAL)
						}
					}
				))
		} catch (error) {
			console.log(error);
			setTimeout(getConnectionInfo, INTERVAL)
		}
    }
    
    function clearIntervalFunction(intervalFunction) {
		console.log("function clearIntervalFunction(intervalFunction)")
		clearInterval(intervalFunction);
		setAuthButton(true);
    }
    

    function requestProof(){
		console.log("function requestProof()")
		console.log("Connection ID : " + props.location.state.invitation.connection_id); 
		console.log("CRED_DEF: " + cred_def_id); 
		
		fetch(`/present-proof/send-request`, 
			{
				method : 'POST', 
				headers: {
					'X-API-Key'    : `${GET_API_SECRET()}`,
					'Content-Type' : 'application/json; charset=utf-8',
				},
				body: JSON.stringify( 
				{
					"connection_id" : `${props.location.state.invitation.connection_id}`,
					"trace" : "true", 
					"comment" : "Vaccination proof validation", 
					"proof_request" : {
						"name"    : "vaccine", 
						"version" : "1.2", 
						"requested_attributes" : {
							
							"description": {
								"name": "description",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"expirationDate": {
								"name": "expirationDate",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"countryOfVaccination": {
								"name": "countryOfVaccination",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"credential_type": {
								"name": "credential_type",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							
							
							"recipient_birthDate": {
								"name": "recipient_birthDate",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"recipient_fullName": {
								"name": "recipient_fullName",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"recipient_type": {
								"name": "recipient_type",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							}, 
							"vaccine_dateOfVaccination": {
								"name": "vaccine_dateOfVaccination",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							}, 
							"vaccine_disease": {
								"name": "vaccine_disease",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"vaccine_type": {
								"name": "vaccine_type",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
                            }, 
                            "vaccine_medicinalProductName": {
								"name": "vaccine_medicinalProductName",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"vaccine_marketingAuthorizationHolder": {
								"name": "vaccine_marketingAuthorizationHolder",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							}
						}, 
						"requested_predicates" : {}
					}
				}	
				)}).then(response => response.json())
					.then(data => {
						props.history.push('/proofResult', {
							presentation_exchange_id: data.presentation_exchange_id,
							connection_id           : props.location.state.invitation.connection_id,
							ticketfrom              : props.location.state.ticket.from, 
							ticketTo                : props.location.state.ticket.to,
							ticketDeparture			: props.location.state.ticket.departureDate,
							ticketReturn			: props.location.state.ticket.returnDate,
							ticketPassenger			: props.location.state.ticket.passenger,
							ticketCabin				: props.location.state.ticket.cabin
						}
                    );
				});
	}

	const handleAuthorisation = () => {
		console.log("const handleAuthorisation = ()")
		setLoader(true);
		requestProof(); 
    }
    
    return(
        <div className="Root" style={{ backgroundColor: '#FCF8F7', display: "flex" }}>
			<Container >
				<Col>
					<QRPreuveComponent value={JSON.stringify(props.location.state)} />
				</Col>
				<Col className="mt-3">
					{showAuthButton && !showLoader ?
						<Button outline color="primary" onClick={handleAuthorisation}>{t('vaccine:btnVaccineQR')}</Button> : showLoader ? <Spinner /> : null}
				</Col>
			</Container>
		</div> 
    ); 
}

export default QRVerificationContainer; 