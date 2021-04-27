/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState, useEffect }  from 'react';
import { Container, Spinner }          from 'reactstrap'
import { useTranslation }              from 'react-i18next'
import { GET_API_SECRET }              from '../../config/constants' 
import { fetchWithTimeout }            from '../../helpers/fetchWithTimeout'
import                                      '../../assets/styles/Forms.css';

function ProofVerificationContainer(props) {

    let INTERVAL = 5000; 
    let TIMEOUT  = 3000; 

    const { t } = useTranslation(['identite', 'vaccine']);

    const [presentation_exchange_id, setPresentationExchangeId] = useState(props.location.state.presentation_exchange_id)

    useEffect(() => {
        setPresentationExchangeId(props.location.state.presentation_exchange_id)
        getConnectionInfo()
    }
    , []);

	function getConnectionInfo() {
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
									data.state === "request_sent" ? intervalFunction = setTimeout(getConnectionInfo, INTERVAL) : VerifyPresentation(presentation_exchange_id);
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
 
    return (
        <Container className="mt-5 pt-5">
            <br /><br /><br /><br />
            <div className="text-center FormBox mt-5 pt-5">
                <h3 className="mb-5 pb-4 mt-2 header"> {t('identite:lblVerification')} </h3>
                <br />
                <p>
                    <h4>{t('identite:msgVerification1')} </h4>
                        {t('identite:msgVerification2')}
                </p>
                <p>
                    {t('identite:msgWait')}
                </p>
                <Spinner /> 
                
            </div>
        </Container>
    );
}

export default ProofVerificationContainer;