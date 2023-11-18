import React from 'react'
import './CheckoutItem.css'

function CheckoutItem(props) {
  return (
    <div className='item'>
        <img src={props.productImage} className='image' alt="products" />
        <h6 className='name'>{props.productName}</h6><br/>
        <p className='quantity'>{props.productQuantity}</p>
        <h6 className='price'>CAD {props.productPrice * props.productQuantity}</h6>
    </div>
  )
}
export default CheckoutItem