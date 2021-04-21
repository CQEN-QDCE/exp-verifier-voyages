/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React              from 'react';
import { Container }      from 'reactstrap';
import BookTicketForm    from '../components/BookTicketForm'
import '../../assets/styles/LoginContainer.css';

function BookTicketContainer() {

	return (
		<div className="Root Container">
			<Container >
				<BookTicketForm className="justify-content-center" />
			</Container>
		</div >
	);
}

export default BookTicketContainer;