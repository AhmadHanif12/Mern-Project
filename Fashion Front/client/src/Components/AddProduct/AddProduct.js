import React from 'react'

import { Form, Button } from 'react-bootstrap'

function AddProduct() {
    return (
        <div>
            {/* Form to get data regarding the new product being launched by the seller */}
            <Form>

                <Form.Group controlId="productImage">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter product name" />
                </Form.Group>

                <Form.Group controlId="productDescription">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter product description" />
                </Form.Group>

                <Form.Group controlId="productPrice">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter product price" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Product
                </Button>
            </Form>

        </div>
    )
}

export default AddProduct