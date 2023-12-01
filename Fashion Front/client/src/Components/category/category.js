import React, { useState, useEffect } from 'react';
import './category.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row } from 'react-bootstrap';
import CategoryItem from './categoryItem';
import { useParams } from 'react-router-dom';

const Category = (props) => {
    const [outproducts, setProducts] = useState([]);
    const { category } = useParams();
    //console.log(category);
    const fetchProductsbyCategory = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/category/${category}`);
            const productsData = response.data; // Assuming the response contains an array directly
           
            
        //    console.log(response.data.data.products);
            setProducts(productsData);
        } catch (error) {
            console.log( error);
        }
    };

    useEffect(() => {
        fetchProductsbyCategory();
    }, [category]);

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
                <h3>Category</h3>
            </Row>
            <Container className='customcontainer'>
                <Row>
                    <Row>
                        {!outproducts ? <div className="flipping"></div> : outproducts.map(product => (
                            <CategoryItem key={product._id} _id={product._id} name={product.name} description={product.description} image={product.images[0]} addToCart={addToCart} />
                        ))}
                    </Row>
                </Row>
            </Container>
        </div>
    );
};

export default Category;