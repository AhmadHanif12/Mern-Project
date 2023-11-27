import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import './AdminSeller.css'
import Seller from './Seller'
import { Row, Col, Container } from 'react-bootstrap';

function AdminSeller() {
    const [sellers, setSellers] = useState([]);
    const fetchSellers = async () => {
        try {
            const response = await axios('http://localhost:8080/api/v1/seller', {
                headers: {
                    'authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            const sellersData = await response.data.data; // Assuming the response contains an array directly
            setSellers(sellersData);
            console.log(sellersData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSellers();
    }, []);

    const viewSeller = () => {

    }
    const verifySeller = async (sid) => {
        try {
            // Send delete request to the backend
            const response = await axios.patch(`http://localhost:8080/api/v1/users/${sid}`, {
                verified: true
            }, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            // Check if the update was successful (status code 200)
            if (response.status === 200) {
                // Update the frontend state to reflect the change in verification status
                setSellers((prevSellers) => {
                    // Map through the sellers and update the verified status for the specific seller
                    return prevSellers.map(seller => {
                        if (seller._id === sid) {
                            return {
                                ...seller,
                                verified: true
                            };
                        }
                        return seller;
                    });
                });
            } else {
                console.log('Failed to verify seller. Status:', response.status);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const removeSeller = async (sid) => {
        try {
            // Send delete request to the backend
            const response = await axios.delete(`http://localhost:8080/api/v1/users/${sid}`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('token')}`
                }
            });

            // Update the frontend state to remove the deleted product
            setSellers((prevSellers) => prevSellers.filter(seller => seller._id !== sid));
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
                        <h3 className='custom-heading'>Your Sellers</h3>
                    </Col>
                </Row>
                <Row className='top-distance'>
                    {/* Second Row of Headings of Cart Page */}

                    <Col>
                        <p>Seller Name</p>
                    </Col>
                    <Col className='shift-leftin'>
                        <p>Actions</p>
                    </Col>
                </Row>
                {/* Div to display the individual item in the cart */}
                <div className='separator'></div>
                {!sellers ? <div className="flipping"></div> : sellers.map(seller => (
                    <Seller
                        key={seller._id}
                        sellerId={seller._id}
                        sellerName={seller.firstName + " " + seller.lastName}
                        sellerEmail={seller.email}
                        sellerImage={seller.photo}
                        isVerified={seller.verified} // Assuming 'isVerified' is a property of 'seller'
                        viewSeller={viewSeller}
                        removeSeller={removeSeller}
                        verifySeller={verifySeller}
                    />
                ))}
                {/* {!cartItems ? <div className="flipping"></div> : cartItems.map(item => (
                    <CartItem
                        key={item._id}
                        itemId={item._id}
                        sellerName={item.name}
                        sellerPrice={item.price}
                        sellerDescription={item.description}
                        sellerQuantity={item.quantity}
                        sellerImage={item.images[0]}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                    />

                ))} */}

                <div className='separator'></div>
            </Container>
        </div>
    )
}

export default AdminSeller