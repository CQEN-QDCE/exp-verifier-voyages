/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FormGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import '../assets/styles/Social.css'
import '../assets/styles/ProofContainer.css'

const LangueComponent = () => {
    
    const { t } = useTranslation(['translation','identite']);

    const { i18n } = useTranslation(); 

    const [languageChoice, setLanguageChoice] = useState('');
 
    const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
 
    const languageToggle = () => setLanguageDropdownOpen( !languageDropdownOpen);
    
    useEffect(() => {
        var userLanguage = navigator.language || navigator.userLanguage;
        if (userLanguage === 'fr-CA') {
            setLanguageChoice(t('translation:fr'));
        } else {
            setLanguageChoice(t('translation:en'));
        }
    });

    function changeLanguage(e) {
        let selection = e.target.innerText; 
        setLanguageChoice(selection)
        if (selection === t('translation:fr')) {
            i18n.changeLanguage('fr');
        } else {
            i18n.changeLanguage('en');
        }
    }

    return (
        <div>
            <FormGroup>
                <Dropdown isOpen={languageDropdownOpen} toggle={languageToggle}>
                    <DropdownToggle caret color="#707482" className="inputField rounded-pill" style={{backgroundColor: '#707482', color: '#ffffff'}}>
                        {languageChoice}
                    </DropdownToggle>
                    <DropdownMenu value={languageChoice} name="languageChoice">
                        <DropdownItem name="self"   onClick={ changeLanguage }>{t('translation:fr')}</DropdownItem>
                        <DropdownItem name="child"  onClick={ changeLanguage }>{t('translation:en')}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </FormGroup>
        </div>
    );
};

export default LangueComponent;