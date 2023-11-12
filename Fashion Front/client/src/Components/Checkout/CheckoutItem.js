import React from 'react'
import './CheckoutItem.css'

function CheckoutItem(props) {
  return (
    <div className='item'>
        <img src={props.productImage} className='image' alt="products" />
        <h6 className='name'>{props.productName}</h6>
        <p className='quantity'>x{props.productQuantity}</p>
        <h6 className='price'>{props.productPrice * props.productQuantity}</h6>
    </div>
  )
}
    
export default CheckoutItem