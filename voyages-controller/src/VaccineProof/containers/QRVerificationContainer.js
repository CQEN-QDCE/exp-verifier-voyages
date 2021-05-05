/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState, useEffect }       from 'react'
import { Container, Button, Col, Spinner }  from 'reactstrap'
import { useTranslation } 					from 'react-i18next' 
import QRProofComponent                     from '../components/QRProofComponent'
import { GET_API_SECRET }                   from '../../config/constants'
import { fetchWithTimeout }                 from '../../helpers/fetchWithTimeout'
import { GET_SCHEMA_NAME }                  from '../../config/constants'
import { GET_SCHEMA_VERSION }               from '../../config/constants'
import                                           '../../assets/styles/LoginContainer.css'


function QRVerificationContainer(props){

	const { t } = useTranslation(['translation', 'vaccine']); 
	const [showAuthButton, setAuthButton]  = useState(false);
	const [showLoader, setLoader]          = useState(false);

	const [presentation_exchange_id, setPresentationExchangeId] = useState(props.location.state.invitation.presentation_exchange_id)

	let INTERVAL    = 5000; 
	let TIMEOUT     = 3000; 
	let schemaName = GET_SCHEMA_NAME();  
	let version = GET_SCHEMA_VERSION(); 

    useEffect(() => {
        getConnectionInfo2();
    }, []);

	function getConnectionInfo2() {
		try {
			fetchWithTimeout(`/present-proof/records/${presentation_exchange_id}`,
				{
					method: 'GET',
					headers: {
						'X-API-Key': `${GET_API_SECRET()}`,
						'Content-Type': 'application/json; charset=utf-8',
					}
				}, TIMEOUT).then((
					resp => {
						try {
							resp.json().then((data => {
								if (data.state) {
									let intervalFunction;
									data.state === "request_sent" ? intervalFunction = setTimeout(getConnectionInfo2, INTERVAL) : VerifyPresentation(presentation_exchange_id);
								} else {
									setTimeout(getConnectionInfo2, INTERVAL)
								}
							}))
						} catch (error) {
							setTimeout(getConnectionInfo2, INTERVAL)
						}
					}
				))
		} catch (error) {
			console.log(error);
			setTimeout(getConnectionInfo2, INTERVAL)
		}
	}

    const VerifyPresentation = (presentation_exchange_id) => {
        fetch('/present-proof/records/' + presentation_exchange_id + '/verify-presentation', 
			{
				method : 'POST', 
				headers: {
                    'X-API-Key'                         : `${GET_API_SECRET()}`,
					'Content-Type'                      : 'application/json; charset=utf-8',
					'Access-Control-Allow-Origin'       : '*', 
					'Access-Control-Allow-Methods'      : '*',
					'Access-Control-Allow-Headers'      : '*', 
					'Access-Control-Allow-Credentials'  : 'true'
				},
				body:{}
			}
		).then(response => response.json())
         .then(data => {

            props.history.push('/proofDisplay', {
                connection_id                               : props.location.state.connection_id,
                ticket                                      : props.location.state.ticket,
                vaccine: {
                    vaccine_medicinalProductName            : data.presentation.requested_proof.revealed_attrs.vaccine_medicinalProductName.raw,
                    countryOfVaccination                    : data.presentation.requested_proof.revealed_attrs.countryOfVaccination.raw,
                    recipient_birthDate                     : data.presentation.requested_proof.revealed_attrs.recipient_birthDate.raw,
                    credential_type                         : data.presentation.requested_proof.revealed_attrs.credential_type.raw,
                    expirationDate                          : data.presentation.requested_proof.revealed_attrs.expirationDate.raw,
                    recipient_fullName                      : data.presentation.requested_proof.revealed_attrs.recipient_fullName.raw,
                    vaccine_type                            : data.presentation.requested_proof.revealed_attrs.vaccine_type.raw,
                    recipient_type                          : data.presentation.requested_proof.revealed_attrs.recipient_type.raw,
                    description                             : data.presentation.requested_proof.revealed_attrs.description.raw,
                    vaccine_marketingAuthorizationHolder    : data.presentation.requested_proof.revealed_attrs.vaccine_marketingAuthorizationHolder.raw,
                    vaccine_dateOfVaccination               : data.presentation.requested_proof.revealed_attrs.vaccine_dateOfVaccination.raw,
                    vaccine_disease                         : data.presentation.requested_proof.revealed_attrs.vaccine_disease.raw,
                }
            })
        });
	}
	
    function getConnectionInfo() {
	
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
		clearInterval(intervalFunction);
		setAuthButton(true);
    }
    

    function requestProof(){
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
									{"schema_name": schemaName,
                        			"schema_version": version}
								]
							},
							"expirationDate": {
								"name": "expirationDate",
								"restrictions": [
									{"schema_name": schemaName,
                        			"schema_version": version}
								]
							},
							"countryOfVaccination": {
								"name": "countryOfVaccination",
								"restrictions": [
									{"schema_name": schemaName,
                        			"schema_version": version}
								]
							},
							"credential_type": {
								"name": "credential_type",
								"restrictions": [
									{"schema_name": schemaName,
                        			"schema_version": version}
								]
							},
							
							
							"recipient_birthDate": {
								"name": "recipient_birthDate",
								"restrictions": [
									{"schema_name": schemaName,
                        			"schema_version": version}
								]
							},
							"recipient_fullName": {
								"name": "recipient_fullName",
								"restrictions": [
									{"schema_name": schemaName,
                        			"schema_version": version}
								]
							},
							"recipient_type": {
								"name": "recipient_type",
								"restrictions": [
									{"schema_name": schemaName,
                        			"schema_version": version}
								]
							}, 
							"vaccine_dateOfVaccination": {
								"name": "vaccine_dateOfVaccination",
								"restrictions": [
									{"schema_name": schemaName,
                        			"schema_version": version}
								]
							}, 
							"vaccine_disease": {
								"name": "vaccine_disease",
								"restrictions": [
									{"schema_name": schemaName,
                        			"schema_version": version}
								]
							},
							"vaccine_type": {
								"name": "vaccine_type",
								"restrictions": [
									{"schema_name": schemaName,
                        			"schema_version": version}
								]
                            }, 
                            "vaccine_medicinalProductName": {
								"name": "vaccine_medicinalProductName",
								"restrictions": [
									{"schema_name": schemaName,
                        			"schema_version": version}
								]
							},
							"vaccine_marketingAuthorizationHolder": {
								"name": "vaccine_marketingAuthorizationHolder",
								"restrictions": [
									{"schema_name": schemaName,
                        			"schema_version": version}
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
							ticket					: props.location.state.ticket,
						}
                    );
				});
	}

	const handleAuthorisation = () => {
		setLoader(true);
		requestProof(); 
    }
    
    return(
        <div className="Root" style={{ backgroundColor: '#FCF8F7', display: "flex" }}>
			<Container >
				<Col>
					<QRProofComponent value={JSON.stringify(props.location.state)} />
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