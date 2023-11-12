import './Cart.css';
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export class Cart extends Component {
  render() {
    return (
      <Col>
        <Row >
          {/* Top Headings of Cart Page */}
          <Col>
            <h3 className='custom-heading'>Your cart</h3>
          </Col>
          <Col className='shift-left'>
            <a href='/' className='custom-link' >Continue shopping</a>
          </Col>
        </Row>
        <Row className=''>
          {/* Second Row of Headings of Cart Page */}

        <Col> 
        <p>PRODUCT</p>
        </Col>
        <Col className='shift-left'> 
        <p>QUANTITY</p>
        </Col>
        <Col className='shift-left'> 
        <p>TOTAL</p>
        </Col>
        </Row>
      </Col>


    )
  }
}

export default Cart