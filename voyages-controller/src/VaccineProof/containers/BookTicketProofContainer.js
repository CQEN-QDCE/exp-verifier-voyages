/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React              from 'react';
import { Container }      from 'reactstrap';
import BookTicketProofForm    from '../components/BookTicketProofForm'
import '../../assets/styles/LoginContainer.css'

function BookTicketProofContainer(props) {

	return (
		<div className="Root Container">
			<Container >
				<BookTicketProofForm  data={props.location.state} className="justify-content-center"  />
			</Container>
		</div >
	);
}

export default BookTicketProofContainer;