import React from 'react'
import './CartItem.css'
import { Row } from 'react-bootstrap';

function CartItem(props) {
    const increaseQuantity = () => {
        props.increaseQuantity(props.itemId);
    }
    const decreaseQuantity = () => {
        props.decreaseQuantity(props.itemId);
    }
    return (
        <Row>
            <div className='cart-item'>
                <div className='product-image'>
                    <img src={props.productImage} alt='Product' />
                </div>
                <div className='product-info'>
                    <h5>{props.productName}</h5>
                    <p>{props.productDescription}</p>
                </div>
                <div className='product-quantity'>
                    <button className='btn btn-primary' onClick={decreaseQuantity}>-</button>
                    <p>{props.productQuantity}</p>
                    <button className='btn btn-primary' onClick={increaseQuantity}>+</button>
                </div>
                <div className='product-total'>
                    <h6>CAD {props.productPrice * props.productQuantity}</h6>
                </div>
            </div>
        </Row>
    )
}

export default CartItem
