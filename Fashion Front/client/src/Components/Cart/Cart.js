import './Cart.css';
import React, { useState, useEffect } from 'react';
import CartItem from '../CartItem/CartItem';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Row, Col, Container } from 'react-bootstrap';


//Each item in the cart is mapped to CartItem component
function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios('http://localhost:8080/api/v1/cart', {
        headers: {
          'authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      const productsData = await response.data.user.products; // Assuming the response contains an array directly
      //console.log('product', productsData);
      const temp = [];
      // productsData.map(async item => {
      //   const response = await axios.get(`http://localhost:8080/api/v1/products/${item._id}`);
      //   temp.push({ quantity: item.quantity, info: response.data });
      //   // console.log(temp);
      // });
      for(let i = 0; i < productsData.length; i++) {
        const item = productsData[i];
        const response = await axios.get(`http://localhost:8080/api/v1/products/${item._id}`);
        productsData[i] = { ...response.data, quantity: item.quantity };  
      }
      setCartItems(productsData);
      // setCartItems(temp);
      console.log(temp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const increaseQuantity = (itemId) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.id === itemId ? { ...item, productQuantity: item.productQuantity + 1 } : item
    ));
  };

  const decreaseQuantity = (itemId) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.id === itemId && item.productQuantity > 1 ? { ...item, productQuantity: item.productQuantity - 1 } : item
    ));
  };
  const total = cartItems.reduce((acc, item) => {
    return acc + item.productPrice * item.productQuantity;
  }, 0);
  return (
    <Container>
      <Row >
        {/* Top Headings of Cart Page */}
        <Col>
          <h3 className='custom-heading'>Your cart</h3>
        </Col>
        <Col className='shift-right'>
          <a href='/' className='custom-link' >Continue shopping</a>
        </Col>
      </Row>
      <Row className='top-distance'>
        {/* Second Row of Headings of Cart Page */}

        <Col>
          <p>PRODUCT</p>
        </Col>
        <Col className='shift-leftin'>
          <p>QUANTITY</p>
        </Col>
        <Col className='shift-leftin'>
          <p>TOTAL</p>
        </Col>
      </Row>
      {/* Div to display the individual item in the cart */}
      <div className='separator'></div>
      {!cartItems ? <div className="flipping"></div> : cartItems.map(item => (
        <CartItem
          key={item._id}
          productName={item.name}
          productPrice={item.price}
          productDescription={item.description}
          productQuantity={item.quantity}
          productImage={item.images[0]}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />

      ))}
      {console.log('cartItems = ', cartItems)}

      <div className='separator'></div>
      <Row>
        <div className='total'>
          <h4 className='total-text'>Estimated Total</h4>
          <h5 className='total-text'>CAD {total.toFixed(2)}</h5>
          <p>Tax included.Shipping and discounts calculated
            at checkout.</p>
        </div>
        <div className='checkout'>
          <button className='btn btn-primary' href='/checkout' type="submit" >Checkout</button>
        </div>
      </Row>
    </Container>
  )
}

export default Cart;
