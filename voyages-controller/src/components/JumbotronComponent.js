import React from 'react';
import { Button } from 'reactstrap';
import Auth from '../helpers/Auth';
import { useHistory } from 'react-router-dom';
import VaccinationStatus from '../helpers/VaccinationStatus';
import bannerImg from '../assets/images/banner-img-1.png'
import '../assets/styles/JumbotronComponent.css';
import { useTranslation }  from 'react-i18next'

const JumbotronComponent = () => {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <header>
      <div className="pt-5 container-fluid text-center" >
        <div className="row mt-5 pt-5" >
          <div className="col-md-7 mt-5 pt-5 col-sm-12">
            <h1 className="mt-5">{t('vacine:travelCarefreeTitle')}</h1>
            <p>{t('vacine:travelCarefreeSubTitle')}</p>
            <p className="lead">
            {t('vacine:travelCarefreeDescription')}</p>
            <Button className="mt-5" size="lg" color="success" onClick={() => {
              let auth_login = Auth.getAuth();
              if (auth_login == null) {
                localStorage.setItem('demo', "PIA");
                history.push('/login')
              }
              else {
                localStorage.setItem('demo', "PIA");
                VaccinationStatus.isVaccinated(false)
                history.push('/bookticket')
              }
            }}>{t('vacine:tryOnBookingButtonLabel')}</Button>

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
            }}>{t('vacine:tryOnLocationButtonLabel')}</Button>
          </div>
          <div class="col-md-5 mt-4 p-5 col-sm-12">
            <img src={bannerImg} alt="CovidPerson" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default JumbotronComponent;