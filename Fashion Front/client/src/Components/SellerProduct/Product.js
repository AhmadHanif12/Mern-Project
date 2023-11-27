import React from 'react'
import './Product.css'
import { Row, Button } from 'react-bootstrap';

function Product(props) {
    const viewProduct = () => {
        window.location.href = `/products/${props.productId}`;
    }
    const removeProduct = () => {
        props.removeProduct(props.productId);
    }
    return (
        <div>
            <Row>
                <div className='product'>
                    <div className='product-image'>
                        <img src={props.productImage} alt='product' />
                    </div>
                    <div className='product-info'>
                        <h5>{props.productName}</h5>
                        <p>{props.productDescription}</p>
                        <div className='product-details'>
                            <h5>CAD. {props.productPrice}</h5>
                            <h5>{props.productStock} in stock</h5>
                        </div>
                    </div>
                    <div className='actions'>
                        <Button className='custombutton mb-3' type="submit" onClick={removeProduct}>
                            Remove
                        </Button>
                        <Button className='custombutton mb-3' type="submit" onClick={viewProduct}>
                            View
                        </Button>
                    </div>
                </div>
            </Row>
        </div>
    )
}

export default Product
