// ProductPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Carousel, Container, Row, Col } from 'react-bootstrap';
import Cookies from 'js-cookie';
import './Profile.css';

const ProfilePage = () => {
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


    useEffect(() => {
        fetchuser();
    }, []);

    

    return (
        
        <Container className="Product-Container">
             <Row className='customtitle'>
                <h3>Profile</h3>
            </Row>
            <Row>
                
                <Col md={6}>
                    <Card className='productbody'>
                        <Card.Body >
                        {User && (
                            <>
                                <Card.Title className="Card-Title">{User.firstName}</Card.Title>
                                <Card.Text className="Card-Text">{User.email}</Card.Text>
                            </>
                        )}
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
