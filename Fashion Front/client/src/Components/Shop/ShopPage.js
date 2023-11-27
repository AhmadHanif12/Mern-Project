import React, { useState, useEffect } from 'react';
import './ShopPage.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row } from 'react-bootstrap';
import ShopPageItem from './ShopPageItem';

const ShopPage = (props) => {
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios('http://localhost:8080/api/v1/products');
            const productsData = response.data.data.products; // Assuming the response contains an array directly
            
            
            console.log(response.data.data.products);
            setProducts(productsData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addToCart = async (product) => {
        if (Cookies.get('token')) {
            try{
                const response = await axios.post('http://localhost:8080/api/v1/cart', {
                    _id: product,
                }, {
                    headers: {
                        'authorization': `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
                    }
                },)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>

            <Row className='customtitle'>
                <h3>Shop</h3>
            </Row>
            <Container className='customcontainer'>
                <Row>
                    <Row>
                        {!products ? <div className="flipping"></div> : products.map(product => (
                            <ShopPageItem key={product._id} _id={product._id} name={product.name} description={product.description} image={product.images[0]} addToCart={addToCart} />
                        ))}
                    </Row>
                </Row>
            </Container>
        </div>
    );
};

export default ShopPage;