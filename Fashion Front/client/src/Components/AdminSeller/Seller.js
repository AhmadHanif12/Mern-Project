import React from 'react'
import './Seller.css'
import { Row, Button } from 'react-bootstrap';

function CartItem(props) {
    const viewSeller = () => {

    }
    const removeSeller = () => {
        
    }
    return (
        <Row>
            <div className='seller'>
                <div className='seller-image'>
                    <img src={props.productImage} alt='Product' />
                </div>
                <div className='seller-info'>
                    <h5>{props.productName}</h5>
                    <p>{props.productDescription}</p>
                </div>
                <div className='actions'>
                    <Button className='custombutton mb-3' type="submit" onClick={viewSeller}>
                        View
                    </Button>
                    <Button className='custombutton mb-3' type="submit" onClick={removeSeller}>
                        Remove
                    </Button>
                </div>
            </div>
        </Row>
    )
}

export default CartItem
