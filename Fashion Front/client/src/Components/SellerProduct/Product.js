import React from 'react'
import './Product.css'
import { Row, Button } from 'react-bootstrap';

function Product(props) {
    const viewProduct = () => {

    }
    const removeProduct = () => {
        
    }
    return (
        <Row>
            <div className='seller'>
                <div className='seller-image'>
                    <img src={props.sellerImage} alt='Seller' />
                </div>
                <div className='seller-info'>
                    <h5>{props.productName}</h5>
                    <p>{props.productDescription}</p>
                </div>
                <div className='actions'>
                    <Button className='custombutton mb-3' type="submit" onClick={viewProduct}>
                        Remove
                    </Button>
                    <Button className='custombutton mb-3' type="submit" onClick={removeProduct}>
                        View
                    </Button>
                </div>
            </div>
        </Row>
    )
}

export default Product
