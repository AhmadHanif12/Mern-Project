// ProductPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Carousel, Container, Row, Col } from 'react-bootstrap';
import './Product.css';

const ProductPage = () => {
    const [product, setProducts] = useState({ images: [] });

    const fetchProducts = async () => {
        try {
            const urlParts = window.location.pathname.split('/');
            const productId = urlParts[urlParts.length - 1];
            const response = await axios(`http://localhost:8080/api/v1${window.location.pathname}`);
            const productsData = await response.data;
            setProducts(productsData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container className="Product-Container">
            <Row>
                <Col md={6}>
                    <Carousel>
                        {product.images ? (
                            product.images.length === 0 ? (
                                <div className="flipping"></div>
                            ) : (
                                product.images.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img className="d-block w-100" src={image} alt={product.name} />
                                    </Carousel.Item>
                                ))
                            )
                        ) : (
                            <div className="flipping"></div>
                        )}
                    </Carousel>
                    </Col>
                <Col md={6}>
                    <Card className='productbody'>
                        <Card.Body >
                            <Card.Title className="Card-Title">{product.name}</Card.Title>
                            <Card.Text className="Card-Text">{product.description}</Card.Text>
                            <Card.Text className="Price">
                            <small className="text-muted">Price:</small>
                                <strong>${product.price}</strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;
