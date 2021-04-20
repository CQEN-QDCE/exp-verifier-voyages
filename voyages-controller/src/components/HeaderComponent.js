/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { useHistory, useLocation }    from 'react-router-dom';
import { useTranslation }             from 'react-i18next'
import { globalStyles }               from '../assets/styles/globalStyles';
import Auth                           from '../helpers/Auth';
import useWindowDimensions            from '../helpers/useWindowDimensions';
import AppLogo                     from '../assets/images/airplane-logo.png';
import LangueComponent  from './LangueComponent'

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { height, width } = useWindowDimensions();

  const history = useHistory();
  
  const location = useLocation();
  
  const { t } = useTranslation();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <Navbar expand="sm" fixed="top" style={globalStyles.navbar}>     
      <NavbarBrand className="navbar-brand oneliner">
        <img src={AppLogo} alt="air-secur-logo" style={globalStyles.navbarLogoMini} />
        <span style={{ color: '#fff', 'margin-left': '10px' }}>AIR-SECUR</span>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar className="ml-auto">
          {Auth.getAuth() ? (
            <NavItem>
            </NavItem>
          ) : (
              <NavItem>
              </NavItem>
            )}
        </Nav>
      </Collapse>
      <LangueComponent/>
    </Navbar>
  );
};

export default HeaderComponent;
