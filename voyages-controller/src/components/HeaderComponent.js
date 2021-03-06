/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { useLocation }                from 'react-router-dom';
import { useTranslation }             from 'react-i18next'
import { globalStyles }               from '../assets/styles/globalStyles';
import Auth                           from '../helpers/Auth';
import AppLogo                     from '../assets/images/airplane-logo.png';
import LangueComponent  from './LangueComponent'


const HeaderComponent = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  
  const location = useLocation();
  
  const { t } = useTranslation();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <Navbar expand="sm" fixed="top" style={globalStyles.navbar}>     
      <NavbarBrand className="navbar-brand oneliner">
        <a href="http://localhost:10000/"><img src={AppLogo} alt="air-secur-logo" style={globalStyles.navbarLogoMini} />
        <span style={{ color: '#fff', 'margin-left': '10px' }}>AIR-SECUR</span></a>
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
