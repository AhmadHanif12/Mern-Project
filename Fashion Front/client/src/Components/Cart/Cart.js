import './Cart.css';
import React, { useState } from 'react';
import CartItem from '../CartItem/CartItem';
import { Row, Col, Container } from 'react-bootstrap';


//Each item in the cart is mapped to CartItem component
function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productName: 'Black T-Shirt For Men',
      productImage: 'https://flyingcart.pk/cdn/shop/products/1_227b79f9-ee6b-4b72-bab4-7657a4b9461a.jpg?v=1678535186',
      productQuantity: 3,
      productPrice: 900
    },
    {
      id: 2,
      productName: 'Black Jogger Pant For Men',
      productImage: 'https://flyingcart.pk/cdn/shop/products/1_fbec952c-b693-4a0d-83dc-38061c8090af.jpg?v=1678960153',
      productQuantity: 2,
      productPrice: 1811
    },
    {
      id: 3,
      productName: 'Meclay London Anti Dandruff Conditioner 180ML',
      productImage: 'https://flyingcart.pk/cdn/shop/files/MeclayLondonAntiDandruffConditioner.jpg?v=1699277741',
      productQuantity: 4,
      productPrice: 381
    },
    {
      id: 4,
      productName: 'Royal Oud 50ML Eau De Perfume - For Men',
      productImage: 'https://flyingcart.pk/cdn/shop/files/Royaloud.webp?v=1699104386',
      productQuantity: 1,
      productPrice: 2999
    }
  ]);

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
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          productName={item.productName}
          productPrice={item.productPrice}
          productQuantity={item.productQuantity}
          productImage={item.productImage}
          increaseQuantity={() => increaseQuantity(item.id)}
          decreaseQuantity={() => decreaseQuantity(item.id)}
        />
      ))}
      <div className='separator'></div>
      <Row>
        <div className='total'>
          <h4 className='total-text'>Estimated Total</h4>
          <h5 className='total-text'>PKR {total.toFixed(2)}</h5>
          <p>Tax included.Shipping and discounts calculated
at checkout.</p>
        </div>
        <div className='checkout'>
          <button className='btn btn-primary' href='/checkout'  type="submit" >Checkout</button>
        </div>
      </Row>
    </Container>
  )
}

export default Cart;
