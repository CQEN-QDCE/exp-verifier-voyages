/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React from 'react';
import QRCode from 'qrcode.react'

function QRComponent(props) {
	
	const content = JSON.parse(props.value); 

	//console.log(content.invitation.invitation_url)
	
	return (
        <QRCode value={content.invitation.invitation_url} size={400}/>
	);
}

export default QRComponent;