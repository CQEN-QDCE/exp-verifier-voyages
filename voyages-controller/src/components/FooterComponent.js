/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React from 'react'
import { Container } from 'reactstrap'
import { useTranslation } from 'react-i18next'

function FooterComponent() {

	const { t } = useTranslation();

	return (
		<Container fluid className="fixed-bottom text-center p-3 border-top" style={{ backgroundColor: '#11172b', color: '#fff' }}>
			{t('translation:copyright')}
		</Container>
	)
}

export default FooterComponent;
