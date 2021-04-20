/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React               from 'react'
import { Button }          from 'reactstrap'
import { useTranslation }  from 'react-i18next'
import '../assets/styles/JumbotronComponent.css'
import { useHistory }      from 'react-router-dom'

const handleSubmit = () => {
    window.location = '/bookForm';
}

const JumbotronComponent = () => {
  const { t } = useTranslation(['translation', 'vaccine']);
  return (
    <header>
      <div className="pt-5 container-fluid text-center" >

        <div className="row" >
          <div className="col-md-7 col-sm-12">
            <h1>{t('vaccine:welcomeTitle')}</h1>
            <p className="lead">
              {t('vaccine:welcomeMessage')}
            </p>
            <div>
            <Button className="mt-2" outline color="primary" size="lg" onClick={handleSubmit}>{t('vaccine:btnBook')}</Button>
          </div>
          </div>
    
        </div>
      </div>
    </header>
  );
};

export default JumbotronComponent;