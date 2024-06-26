import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import './SellerProduct.css'
import Product from './Product'
import { Row, Col, Container } from 'react-bootstrap';

function SellerProduct() {
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios('http://localhost:8080/api/v1/myProducts', {
                headers: {
                    'authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            const productsData = await response.data.data; // Assuming the response contains an array directly
            setProducts(productsData);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    const viewProduct = (pid) => {
        
    }
    const removeProduct = async (pid) => {
        try {
            // Send delete request to the backend
            const response = await axios.delete(`http://localhost:8080/api/v1/products/${pid}`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('token')}`
                }
            });
    
            // Update the frontend state to remove the deleted product
            setProducts((prevProducts) => prevProducts.filter(product => product._id !== pid));
            console.log(products);
            console.log('Product removed successfully');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Container>
                <Row >
                    {/* Top Headings of Cart Page */}
                    <Col>
                        <h3 className='custom-heading'>Your Products</h3>
                    </Col>
                </Row>
                <Row className='top-distance'>
                    {/* Second Row of Headings of Cart Page */}

                    <Col>
                        <p>Product Name</p>
                    </Col>
                    <Col className='shift-leftin'>
                        <p>Actions</p>
                    </Col>
                </Row>
                {/* Div to display the individual item in the cart */}
                <div className='separator'></div>
                {!products ? <div className="flipping"></div> : products.map(product => (
                    <Product
                        key={product._id}
                        productId={product._id}
                        productName={product.name}
                        productPrice={product.price}
                        productDescription={product.description}
                        productStock={product.stock}
                        productImage={product.images[0]}
                        viewProduct={viewProduct}
                        removeProduct={removeProduct}
                    />

                ))}

                <div className='separator'></div>
            </Container>
        </div>
    )
}

export default SellerProduct