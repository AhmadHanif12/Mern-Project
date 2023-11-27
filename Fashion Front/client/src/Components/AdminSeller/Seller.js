import React from 'react'
import './Seller.css'
import { Row, Button } from 'react-bootstrap';

function Seller(props) {
    const viewSeller = () => {
        window.location.href = `/seller/${props.sellerId}`;
    }
    const removeSeller = () => {
        props.removeSeller(props.sellerId);
    }
    const verifySeller = () => {
        console.log(props.sellerId);
        props.verifySeller(props.sellerId);
    }

    return (
        <Row>
            <div className='seller'>
                <div className='seller-image'>
                    <img src={props.sellerImage} alt='Seller' />
                </div>
                <div className='seller-info'>
                    <h5>{props.sellerName}</h5>
                    <p>{props.sellerEmail}</p>
                </div>
                <div className='actions'>
                    <Button className='custombutton mb-3' type="submit" onClick={removeSeller}>
                        Remove
                    </Button>
                    {!props.isVerified ? <Button className='custombutton mb-3' type="submit" onClick={verifySeller} >Verify</Button> :
                    <Button className='custombutton mb-3' type="submit" onClick={viewSeller}>
                        View
                    </Button>}

                </div>
            </div>
        </Row>
    )
}

export default Seller
