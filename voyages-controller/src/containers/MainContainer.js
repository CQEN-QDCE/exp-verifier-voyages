/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React               from 'react';
import { Container }       from 'reactstrap';
import JumbotronComponent  from '../components/JumbotronComponent';

function MainContainer() {
	return (

		< Container fluid style={{ backgroundColor: '#FFF' }}>
			<JumbotronComponent />
		</Container >
	);
}

export default MainContainer;