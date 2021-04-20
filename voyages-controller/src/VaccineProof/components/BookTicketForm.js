/*
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState }      from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter,
         Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardColumns} from 'reactstrap';
import { useHistory }           from 'react-router-dom'
import RightArrow from '../../assets/images/rightarrow.png'
import { useTranslation }       from 'react-i18next'
import '../../assets/styles/Forms.css'
import { GET_API_SECRET }                   from '../../config/constants'

const BookTicketForm = () => {

    const { t } = useTranslation(['translation','vaccine']);
    var cdate = new Date();
    cdate.setDate(cdate.getDate() + 7);
    const [fromdropdownOpen, setOpen] = useState(false)
    const fromtoggle = () => setOpen(!fromdropdownOpen)

    const [todropdownOpen, setoOpen] = useState(false)
    const totoggle = () => setoOpen(!todropdownOpen)

    const [from, setFrom] = useState('Montréal  - Pierre-Elliot Trudeau Intl. (YUL)')
    const [to, setTo] = useState('Vancouver - Vancouver Intl. (YVR)')
    const [departureDate, setDepartureDate] = useState(new Date().toISOString().substring(0, 10))
    const [returnDate, setReturnDate] = useState(cdate.toISOString().substring(0, 10))
    const [passenger, setPassenger] = useState('1 Adult, 0 Child')
    const [cabin, setCabin] = useState('Economy')
    const history = useHistory();

    const handleSubmit = () => {

        if (from === 'Select From Location' | 
            to === 'Select To Location' | 
            departureDate === '' | 
            returnDate === '' | 
            passenger === '') {
                alert('Please fill all fields')
        }
        else {
            createInvitation();
        }
    }

    function createInvitation(){
        fetch('/connections/create-invitation',{
            method: 'POST',
            headers: {
                'X-API-Key'                    : `${GET_API_SECRET()}`, 
                'Content-Type'                 : 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin'  : '*', 
                'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS', 
                'Access-Control-Allow-Headers' : 'Content-Type', 
                'Access-Control-Max-Age'       : '86400'
            }
            }).then((
            resp => resp.json().then((
                data => 
                history.push('/qrproof',
                    {
                    type: "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation", 
                    ticket: {
                        from          : from, 
                        to            : to, 
                        departureDate : departureDate, 
                        returnDate    : returnDate, 
                        passenger     : passenger, 
                        cabin         : cabin
                    },
                    invitation    : data
                    } 
                )
            ))
        ))
    }

    return(
        <Form className="text-center FormBox" >
            <h1 className="mb-5 pb-4 mt-2 piaheader">{t('vaccine:bookPageHeader')}</h1>
            <br />
            <Row form>
                <Col md={5}>
                    <Dropdown isOpen={fromdropdownOpen} toggle={fromtoggle} size="lg" color="success">
                        <DropdownToggle caret color="success" >
                            {from}
                        </DropdownToggle>
                        <DropdownMenu value={from} name="fromLocations" >
                            <DropdownItem name="calgary"   onClick={(e) => { setFrom(e.target.innerText) }} >Calgary   - Calgary Intl. (YYC)</DropdownItem>
                            <DropdownItem name="montreal"  onClick={(e) => { setFrom(e.target.innerText) }} >Montréal  - Pierre-Elliot Trudeau Intl. (YUL)</DropdownItem>
                            <DropdownItem name="quebec"    onClick={(e) => { setFrom(e.target.innerText) }} >Québec    - Jean Lesage Intl. (YQB)</DropdownItem>
                            <DropdownItem name="toronto"   onClick={(e) => { setFrom(e.target.innerText) }} >Toronto   - Pearson Intl. (YYZ)</DropdownItem>
                            <DropdownItem name="vancouver" onClick={(e) => { setFrom(e.target.innerText) }} >Vancouver - Vancouver Intl. (YVR)</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <Col md={2}>
                    <img src={RightArrow} alt="Logo" />
                </Col>
                <Col md={5}>
                    <Dropdown isOpen={todropdownOpen} toggle={totoggle} size="lg">
                        <DropdownToggle caret color="success">
                            {to}
                        </DropdownToggle>
                        <DropdownMenu value={to} name="toLocations" >
                            <DropdownItem name="calgary"   onClick={(e) => { setTo(e.target.innerText) }} >Calgary   - Calgary Intl. (YYC)</DropdownItem>
                            <DropdownItem name="montreal"  onClick={(e) => { setTo(e.target.innerText) }} >Montréal  - Pierre-Elliot Trudeau Intl. (YUL)</DropdownItem>
                            <DropdownItem name="quebec"    onClick={(e) => { setTo(e.target.innerText) }} >Québec    - Jean Lesage Intl. (YQB)</DropdownItem>
                            <DropdownItem name="toronto"   onClick={(e) => { setTo(e.target.innerText) }} >Toronto   - Pearson Intl. (YYZ)</DropdownItem>
                            <DropdownItem name="vancouver" onClick={(e) => { setTo(e.target.innerText) }} >Vancouver - Vancouver Intl. (YVR)</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
            <br />
            <Row form>
                <Col md={5}>
                    <FormGroup>
                        <Label for="departure">{t('vaccine:bookPageDepartureDate')}</Label>
                        <Input type="date" name="date" className='greeninputField rounded-pill'
                            id="departure" onChange={(e) => setDepartureDate(e.target.value)} placeholder="" value={departureDate} />
                    </FormGroup>
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                    <FormGroup>
                        <Label for="returndate">{t('vaccine:bookPageReturnDate')}</Label>
                        <Input type="date" name="returndate" className='greeninputField rounded-pill'
                            id="examplePassword" onChange={(e) => setReturnDate(e.target.value)} placeholder="" value={returnDate} />
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col md={5}>
                    <FormGroup>
                        <Label for="passenger">{t('vaccine:bookPagePassengers')}</Label>
                        <Input type="select" name="passenger" className='greeninputField rounded-pill'
                            id="passenger" onChange={(e) => setPassenger(e.target.value)} placeholder="" value={passenger} >
                            <option>1 Adult, 0 Child</option>
                            <option>2 Adult, 0 Child</option>
                            <option>2 Adult, 1 Child</option>
                            <option>2 Adult, 2 Child</option>
                            <option>2 Adult, 3 Child</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                    <FormGroup>
                        <Label for="cabin">{t('vaccine:bookPageCabin')}</Label>
                        <Input type="select" name="cabin" className='greeninputField rounded-pill'
                            id="examplePassword" onChange={(e) => setCabin(e.target.value)} placeholder="" value={cabin} >
                            <option>Economy</option>
                            <option>Executive</option>
                            <option>Business</option> 
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            
                <Button onClick={handleSubmit} outline color="success" className="m-3">{t('vaccine:btnNext')}</Button>
            
        </Form>
    ); 
}
export default BookTicketForm; 
