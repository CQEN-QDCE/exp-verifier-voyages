/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React from 'react';
import { Button } from 'reactstrap';
import Auth from '../helpers/Auth';
import { useHistory } from 'react-router-dom';
import VaccinationStatus from '../helpers/VaccinationStatus';
import bannerImg from '../assets/images/banner-img-1.png';
import '../assets/styles/JumbotronComponent.css';
import { useTranslation }  from 'react-i18next'

const LandingPageComponent = () => {
  const history = useHistory();
  const { t } = useTranslation(['translation','vaccine']);

  function createInvitation(){
    fetch('/connections/create-invitation',{
        method: 'POST',
        headers: {
            'Content-Type'                 : 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin'  : '*', 
            'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS', 
            'Access-Control-Allow-Headers' : 'Content-Type', 
            'Access-Control-Max-Age'       : '86400'
        }
        }).then((
        resp => resp.json().then((
            data => 
            history.push('/qrproof',
                {
                type: "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation", 
                invitation    : data
                } 
            )
        ))
    ))
  }

  
  return (
    <header>
      <div className="pt-5 container-fluid text-center" >
        <div className="row" >
          <div className="col-md-7 col-sm-12" style={{ 'paddingTop': '0' }}>
            <h1 className="mt-5">{t('vaccine:travelCarefreeTitle')}</h1>
            <p>{t('vaccine:travelCarefreeSubTitle')}</p>
            <p className="lead">
            {t('vaccine:travelCarefreeDescription')}</p>
            
            <Button className="mt-5" size="lg" color="primary" onClick={() => {
                createInvitation();
            }}>{t('vaccine:tryOnBookingButtonLabel')}</Button>
            
          </div>
          <div class="col-md-4 col-sm-12">
            <img src={bannerImg} alt="CovidPerson" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingPageComponent;