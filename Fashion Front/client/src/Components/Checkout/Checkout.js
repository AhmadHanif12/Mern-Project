import React from 'react';
import logo from '../../logo.svg';
import './Checkout.css';
//import CheckoutItem from './CheckoutItem';
import { Navbar, Container, Row, Col, Form, Button } from 'react-bootstrap';



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
                                {/*  Form group for Email information and also newsletter
                                        This part takes the email of the customer.*/}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='custom-label'>Contact</Form.Label>
                                    <Form.Control name='email' className='no-outline custom-field' type="email" placeholder="Email" />
                                    <Form.Check name='email-with-news' className='custom-check' type="checkbox" label="Email me with news and offers" />
                                </Form.Group>
                                {/*  Form group for Delivery information] 
                                        This part contains the static info about how we gather delivery information of the order.*/}
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

                                    {/*  Form group for shipping information] 
                                        This part contains the static info about how we process the payment of the order.*/}
                                   

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='custom-label'>Shipping method</Form.Label>
                                    <div className='customship'>
                                        <h5 className='shipping shipping-left'>Shipping Charges</h5>
                                        <h5 className='shipping shipping-right'>Rs 199.00</h5>
                                    </div>
                                </Form.Group>
                                    {/*  Form group for Payment information] */}

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className='custom-label'>Payment</Form.Label>
                                    <p className='custom-text'>All transactions are secure and encrypted</p>
                                    <div className='customship cod'>
                                        <h5 className='shipping shipping-left'>Cash on Delivery (COD)</h5>
                                    </div>
                                    {/*  Right now the only payment method we have is Cash on Delivery */}

                                    <div className='customship payment'>
                                        <p className='shipping shipping-left'>
                                            COD (Cash on Delivery) is a payment option that allows the buyer to pay when the
                                            product is delivered to him. Once the courier has received the money, only then will
                                            he give the parcel to the customer.
                                        </p>
                                    </div>
                                    <Button className='custombutton mb-3' type="submit">
                                        Complete Order
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                        {/*  This column will be done once we start working on backend */}

                        <Col>Column 2
                            {/* <CheckoutItem className='item' productName='Black T-Shirt For Men' productImage='https://flyingcart.pk/cdn/shop/products/1_227b79f9-ee6b-4b72-bab4-7657a4b9461a.jpg?v=1678535186' productQuantity='3' productPrice='900'/> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Checkout;