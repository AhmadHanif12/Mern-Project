// ViewSellerPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './Seller.css';

const ViewSellerPage = () => {
    const [seller, setSeller] = useState({});

    const fetchSeller = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1${window.location.pathname}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                }
            }); // Replace with the actual endpoint
            const sellerData = await response.data.data;
            console.log(sellerData);
            setSeller(sellerData);
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        fetchSeller();
    }, []);

    return (
        <Container className="ViewSeller-Container">
            <Row>
                <Col md={6}>
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title className="Seller-Name">{`${seller.firstName} ${seller.lastName}`}</Card.Title>
                            <Card.Text className="Seller-Email">
                                <strong>Email:</strong> {seller.email}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ViewSellerPage;
