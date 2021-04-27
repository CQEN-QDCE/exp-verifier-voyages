/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState } from 'react';
import { Col, FormGroup, Label, Input,   } from 'reactstrap';

import { useTranslation } from 'react-i18next'

function BookTicketProofForm(props) {

    const [vaccine_medicinalProductName, setvaccine_medicinalProductName] = useState(props.data.vaccine.vaccine_medicinalProductName)
    const [countryOfVaccination, setCountryOfVaccination] = useState(props.data.vaccine.countryOfVaccination); 
    const [recipient_birthDate, setrecipient_birthDate] = useState(props.data.vaccine.recipient_birthDate);
    const [credential_type, setcredential_type] = useState(props.data.vaccine.credential_type); 
    const [expirationDate, setExpirationDate] = useState(props.data.vaccine.expirationDate); 
    const [recipient_fullName, setrecipient_fullName] = useState(props.data.vaccine.recipient_fullName); 
    const [vaccine_type, setvaccine_type] = useState(props.data.vaccine.vaccine_type); 
    const [recipient_type, setrecipient_type] = useState(props.data.vaccine.recipient_type); 
    const [description, setDescription] = useState(props.data.vaccine.description); 
    const [vaccine_marketingAuthorizationHolder, setvaccine_marketingAuthorizationHolder] = useState(props.data.vaccine.vaccine_marketingAuthorizationHolder); 
    const [vaccine_dateOfVaccination, setvaccine_dateOfVaccination] = useState(props.data.vaccine.vaccine_dateOfVaccination); 
    const [vaccine_disease, setvaccine_disease] = useState(props.data.vaccine.vaccine_disease); 

    const [from, setFrom] = useState(props.data.ticket.from); 
    const [to, setTo] = useState(props.data.ticket.to); 
    const [departureDate, setDepartureDate] = useState(props.data.ticket.departure); 
    const [returnDate, setReturnDate] = useState(props.data.ticket.return); 
    const [passenger, setPassenger] = useState([props.data.ticket.passenger]); 
    const [cabin, setCabin] = useState(props.data.ticket.cabin); 

    const { t } = useTranslation(['translation','vaccine']); 
    
    return (
       
        <Col lg={12}>
        <h1 className="mb-4 pb-4 mt-2 text-center">{t('vaccine:vaccine_verified')}</h1>

        <h2>Ticket Reservation</h2>
        <hr />
        <FormGroup row>
            <Label for="from" sm={3}>
            {t('vaccine:from')}
            </Label>
            <Col sm={10}>
                <Input type="text" name="from" id="from" value={from} disabled />
            </Col>
        </FormGroup>

        <FormGroup row>
            <Label for="to" sm={3}>
            {t('vaccine:to')}
            </Label>
            <Col sm={10}>
                <Input type="text" name="to" id="to" value={to} disabled />
            </Col>
        </FormGroup>

        <FormGroup row>
            <Label for="departureDate" sm={3}>
            {t('vaccine:departureDate')}
            </Label>
            <Col sm={10}>
                <Input type="text" name="departureDate" id="departureDate" value={departureDate} disabled />
            </Col>
        </FormGroup>

        <FormGroup row>
            <Label for="returnDate" sm={3}>
            {t('vaccine:returnDate')}
            </Label>
            <Col sm={10}>
                <Input type="text" name="returnDate" id="returnDate" value={returnDate} disabled />
            </Col>
        </FormGroup>

        <FormGroup row>
            <Label for="passenger" sm={3}>
            {t('vaccine:passenger')}
            </Label>
            <Col sm={10}>
                <Input type="text" name="passenger" id="passenger" value={passenger} disabled />
            </Col>
        </FormGroup>

        <FormGroup row>
            <Label for="cabin" sm={3}>
            {t('vaccine:cabin')}
            </Label>
            <Col sm={10}>
                <Input type="text" name="cabin" id="cabin" value={cabin} disabled />
            </Col>
        </FormGroup>
        <h2>Vaccination Proof</h2>
        <hr />

      <FormGroup row>
        <Label for="countryOfVaccination" sm={3}>
        {t('vaccine:countryOfVaccination')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="countryOfVaccination" id="countryOfVaccination" value={countryOfVaccination} disabled />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="credential_type" sm={3}>
        {t('vaccine:credential_type')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="credential_type" id="credential_type" value={credential_type} disabled />
        </Col>
      </FormGroup>
      
      <FormGroup row>
        <Label for="description" sm={3}>
        {t('vaccine:description')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="description" id="description" value={description} disabled />
        </Col>
      </FormGroup>
 
      <FormGroup row>
        <Label for="expirationDate" sm={3}>
        {t('vaccine:expirationDate')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="expirationDate" id="expirationDate" value={expirationDate} disabled />
        </Col>
      </FormGroup>
      <h3>Recipient</h3>

      <FormGroup row>
        <Label for="recipient_type" sm={3}>
        {t('vaccine:recipient_type')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="recipient_type" id="recipient_type" value={recipient_type} disabled />
        </Col>
      </FormGroup>
    
      <FormGroup row>
        <Label for="recipient_fullName" sm={3}>
        {t('vaccine:recipient_fullName')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="recipient_fullName" id="recipient_fullName" value={recipient_fullName} disabled />
        </Col>
      </FormGroup>
      
      <FormGroup row>
        <Label for="recipient_birthDate" sm={3}>
        {t('vaccine:recipient_birthDate')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="recipient_birthDate" id="recipient_birthDate" value={recipient_birthDate} disabled />
        </Col>
      </FormGroup>

        <h3>Vaccine</h3>

      <FormGroup row>
        <Label for="vaccine_type" sm={3}>
        {t('vaccine:vaccine_type')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="vaccine_type" id="vaccine_type" value={vaccine_type} disabled />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="vaccine_disease" sm={3}>
        {t('vaccine:vaccine_disease')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="vaccine_disease" id="vaccine_disease" value={vaccine_disease} disabled />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="vaccine_dateOfVaccination" sm={3}>
        {t('vaccine:vaccine_dateOfVaccination')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="vaccine_dateOfVaccination" id="vaccine_dateOfVaccination" value={vaccine_dateOfVaccination} disabled />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="vaccine_marketingAuthorizationHolder" sm={3}>
        {t('vaccine:vaccine_marketingAuthorizationHolder')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="vaccine_marketingAuthorizationHolder" id="vaccine_marketingAuthorizationHolder" value={vaccine_marketingAuthorizationHolder} disabled />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="vaccine_medicinalProductName" sm={3}>
        {t('vaccine:vaccine_medicinalProductName')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="vaccine_medicinalProductName" id="vaccine_medicinalProductName" value={vaccine_medicinalProductName} disabled />
        </Col>
      </FormGroup> 
      <br />&nbps;<br />
      <hr />
    </Col>
    );
}
export default BookTicketProofForm;