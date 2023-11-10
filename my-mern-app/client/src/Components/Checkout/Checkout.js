import React from 'react';
import logo from '../../logo.svg';
import './Checkout.css';
import { Nav, Navbar, Container, Row, Col, Form, Button } from 'react-bootstrap';

class Checkout extends React.Component {
    render() {
        return (
            <div className='checkout-main'>
                <Container>
                    <Row>
                        <Col>
                            <Navbar.Brand href="/">
                                <img
                                    src={logo}
                                    width="150"
                                    height="150"
                                    className="d-inline-block align-top logo"
                                    alt="Ecommerce Logo"
                                />
                            </Navbar.Brand>
                            <Form className='checkout-form'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='custom-label'>Contact</Form.Label>
                                    <Form.Control name='email' className='no-outline custom-field' type="email" placeholder="Email" />
                                    <Form.Check name='email-with-news' className='custom-check' type="checkbox" label="Email me with news and offers" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='custom-label'>Delivery</Form.Label>
                                    <Form.Select name='country' className='no-outline custom-field' >
                                        <option>Country/Region</option>
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>United Kingdom</option>
                                        <option>Australia</option>
                                    </Form.Select>

                                    <Row>
                                        <Col className='customCol'>
                                            <Form.Control name='first-name' className='no-outline custom-field' type="text" placeholder="First Name" />
                                        </Col>
                                        <Col className='customCol'>
                                            <Form.Control name='last-name' className='no-outline custom-field' type="text" placeholder="Last Name" />

                                        </Col>
                                    </Row>
                                    
                                    <Form.Control className='no-outline custom-field' type="text" placeholder="Address" />
                                    <Row>
                                        <Col className='customCol'>
                                            <Form.Control name='city' className='no-outline custom-field' type="text" placeholder="City" />
                                        </Col>
                                        <Col className='customCol'>
                                            <Form.Control name='postal-code' className='no-outline custom-field' type="text" placeholder="Postal Code" />
                                        </Col>
                                    </Row>
                                    <Form.Control className='no-outline custom-field' type="number" placeholder="Phone" />

                                    <Form.Check name='save-info-for-next-time' className='custom-check' type="checkbox" label="Save this information for next time." />
                                    <Form.Check name='text-for-news' className='custom-check' type="checkbox" label="Text me with news and offer." />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            Column 2
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Checkout;