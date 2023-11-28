// import React from 'react';
import logo from '../../logo.svg';
import './Checkout.css';
import CheckoutItem from './CheckoutItem';
import { Navbar, Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Example array for the display. Will use database once integrated.
const products = [
    {productName: 'Black T-Shirt For Men',
    productImage: 'https://flyingcart.pk/cdn/shop/products/1_227b79f9-ee6b-4b72-bab4-7657a4b9461a.jpg?v=1678535186',
    productQuantity: 3,
    productPrice: 10},
    {productName: 'Black Jogger Pant For Men',
    productImage: 'https://flyingcart.pk/cdn/shop/products/1_fbec952c-b693-4a0d-83dc-38061c8090af.jpg?v=1678960153',
    productQuantity: 2,
    productPrice: 181},
    {productName: 'Meclay London Anti Dandruff Conditioner 180ML',
    productImage: 'https://flyingcart.pk/cdn/shop/files/MeclayLondonAntiDandruffConditioner.jpg?v=1699277741',
    productQuantity: 4,
    productPrice: 38},
    {productName: 'Royal Oud 50ML Eau De Perfume - For Men',
    productImage: 'https://flyingcart.pk/cdn/shop/files/Royaloud.webp?v=1699104386',
    productQuantity: 1,
    productPrice: 29}
]

function Checkout() {

    const [total, setTotal] = useState(799);
    const [shipping, setShipping] = useState(10);

    const getTotal = () => {
        let total = 0;
        products.map(product => {
            total += product.productPrice * product.productQuantity;
        });
        setTotal(total);
        console.log(total);
    }
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
                                        <h5 className='shipping shipping-right'>CAD 5.99</h5>
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
                                    <Link to="/" className="custombutton5 mb-3">Submit</Link>
                                </Form.Group>
                            </Form>
                        </Col>
                        {/*  This column will be done once we start working on backend */}

                        <Col className='default-font'>
                            {products.map(product => (
                                <CheckoutItem
                                    key={product.productId}  // Add a unique key to each item for React's efficiency
                                    className='item'
                                    productName={product.productName}
                                    productImage={product.productImage}
                                    productQuantity={product.productQuantity}
                                    productPrice={product.productPrice}
                                />
                            ))}
                            <Form className='coupon-form' name='couponForm'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control name='coupon' className='no-outline custom-field coupon' type="text" placeholder="Discount code or gift card" />
                                    <Button className='apply-coupon mb-3 activebutton'type="submit">
                                        Apply
                                    </Button>
                                </Form.Group>
                                {/* Display the total cost for the user */}
                            </Form>
                            <div className='separator'></div>
                            <div className='total'>
                                <h5 className='total-text'>Cost summary</h5>
                                <h6 className='total-text'>CAD {total}</h6>
                                <h5 className='total-text'>Shipping</h5>
                                <h6 className='total-text'>CAD {shipping}</h6>
                                <h5 className='total-text'>Total</h5>
                                <h6 className='total-text'>CAD {total+ shipping}</h6>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    
}

export default Checkout;