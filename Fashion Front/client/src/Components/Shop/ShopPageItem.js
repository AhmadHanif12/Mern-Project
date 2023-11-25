import React from 'react'

import './ShopPageItem.css'
import { Card, Button, Col } from 'react-bootstrap'

function ShopPageItem(props) {
    const clickHandler = () => {
        props.addToCart(props._id)
    }
    return (
        <Col md={3} className='product'>
            <Card className='customcard'>
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title className='title'>{props.name}</Card.Title>
                    <Card.Text className='  description'>
                        {props.description}
                    </Card.Text>
                    <Button onClick={clickHandler} className='custombutton2' variant="primary" type="submit">
                        Add to Cart
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ShopPageItem