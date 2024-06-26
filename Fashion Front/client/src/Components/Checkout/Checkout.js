// import React from 'react';
import logo from '../../logo.png';
import './Checkout.css';
import CheckoutItem from './CheckoutItem';
import { Navbar, Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
// Example array for the display. Will use database once integrated.

function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    let total = 0;
    const shipping = 5.99;
    if (cartItems) {
        total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    }
    const fetchProducts = async () => {
        try {
            const response = await axios('http://localhost:8080/api/v1/cart', {
                headers: {
                    'authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            const productsData = await response.data.user.products; // Assuming the response contains an array directly
            for (let i = 0; i < productsData.length; i++) {
                const item = productsData[i];
                const response = await axios.get(`http://localhost:8080/api/v1/products/${item._id}`);
                productsData[i] = { ...response.data, quantity: item.quantity };
            }
            setCartItems(productsData);
        } catch (error) {
            console.log(error);
        }
        // const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };
    const [User, SetUser] = useState();

    const fetchuser = async () => {
        if (Cookies.get('token')) {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users', {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                SetUser(response.data.data);
                console.log(response)
                console.log(User);

                
                
            } catch (error) {
                console.log(error);
            }
        }
    };
    const submitOrder = async (orderData) => {
        try {
            const response = await axios.post('/checkout', orderData);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //get user id
        fetchuser();

        const orderData = {
            customerId: User._id, // Replace with actual customer ID
            products: cartItems, // Replace with actual cart items
            totalCost: total + shipping, // Replace with actual total cost and shipping cost
            shippingAddress: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                country: document.getElementById('country').value,
                phone: document.getElementById('phone').value,
            },
        }

        // const order = await submitOrder(orderData);

        console.log(User);
    };



    useEffect(() => {
        fetchProducts();



    }, []);

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
                        {!cartItems ? <div className="flipping"></div> : cartItems.map(product => (
                            <CheckoutItem
                                key={product._id}  // Add a unique key to each item for React's efficiency
                                className='item'
                                productName={product.name}
                                productImage={product.images[0]}
                                productQuantity={product.quantity}
                                productPrice={product.price}
                            />
                        ))}
                        <Form className='coupon-form' name='couponForm'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control name='coupon' className='no-outline custom-field coupon' type="text" placeholder="Discount code or gift card" />
                                <Button className='apply-coupon mb-3 activebutton' onClick={handleFormSubmit} type="submit">
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
                            <h6 className='total-text'>CAD {total + shipping}</h6>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Checkout;