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
              /*let auth_login = Auth.getAuth();
              if (auth_login == null) {
                localStorage.setItem('demo', "PIA");
                history.push('/bookForm')
              }
              else {
                localStorage.setItem('demo', "PIA");
                VaccinationStatus.isVaccinated(false)*/
                history.push('/bookForm')
              //}
            }}>{t('vaccine:tryOnBookingButtonLabel')}</Button>
            {/*
            <Button className="mt-5 ml-3" color="primary" size="lg" onClick={() => {
              let auth_login = Auth.getAuth();
              if (auth_login == null) {
                localStorage.setItem('demo', "CAA");
                history.push('/login')
              }
              else {
                localStorage.setItem('demo', "CAA");
                history.push('/onlocation')
              }
            }}>{t('vaccine:tryOnLocationButtonLabel')}</Button> */}
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