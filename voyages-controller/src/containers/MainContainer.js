/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React               from 'react';
import { Container }       from 'reactstrap';
import LandingPageComponent  from '../components/LandingPageComponent';
import '../assets/styles/bootstrap-overrides.css';
import '../assets/styles/Container.css';

function MainContainer() {
	return (
		< Container fluid style={{ backgroundColor: '#FFF' }}>
			<LandingPageComponent/>
		</Container>
	);
}

export default MainContainer;