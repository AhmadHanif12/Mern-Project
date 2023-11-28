import React, { useState } from 'react'
import './ShopPageItem.css'
import { Card, Button, Col } from 'react-bootstrap'

function ShopPageItem(props) {
    const [message, setMessage] = useState('');
    const clickHandler = () => {
        props.addToCart(props._id)
        
        setMessage('Added to cart');
    }
    const viewProduct = () => {
        window.location.href = `/products/${props._id}`;
    }
    return (
        <Col className='customcol' md={3}>
            <Card className='customcard'>
                <Card.Img className="image" variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title className='title'>{props.name}</Card.Title>
                    <Card.Text className='  description'>
                        {props.description}
                    </Card.Text>
                    <Button onClick={clickHandler} className='custombutton2' variant="primary" type="submit">
                        Add to Cart
                    </Button>
                    <Button onClick={viewProduct} className='custombutton2' variant="primary" type="submit">
                        View
                    </Button>
                    <p className='custommessage'>{message}</p> {/* Add this line */}
                </Card.Body>
            </Card>
        </Col>

    )
}

export default ShopPageItem