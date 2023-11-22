import React from 'react'
import './AddProduct.css'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'

function AddProduct() {
    const [product, setProduct] = React.useState({
        productName: '',
        productDescription: '',
        productPrice: 0,
        productImage: [],
        productBrand: '',
        productCategory: '',
        productStock: 0
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            // Handle file input separately to support multiple files
            const fileArray = Array.from(files);
            setProduct((prev) => ({
                ...prev,
                [name]: fileArray,
            }));
        } else {
            // Handle other input types
            setProduct((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        
    }

    return (

        <Col>
            <Row className='customtitle'>
                <h3>Add Product</h3>
            </Row>
            <Row className='customCol'>

                <Form>

                    <Form.Group controlId="productImage" className='customforms'>
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control name='productImage' onChange={handleChange} className='customform' type="file" multiple accept=".jpg, .jpeg, .png" />
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control name='productName' value={product.productName} onChange={handleChange} className='customform' type="text" placeholder="Enter Product name" />
                        <Form.Label>Product Brand</Form.Label>
                        <Form.Control name='productBrand' value={product.productBrand} onChange={handleChange} className='customform' type="text" placeholder="Enter Product Brand" />
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control name='productDescription' value={product.productDescription} onChange={handleChange} as="textarea" className='customform' rows={3} placeholder="Enter product description" />
                        <Form.Label>Product Category</Form.Label>

                        <Form.Select name='productCategory' value={product.productCategory} onChange={handleChange} className='customform'>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kids">Kids</option>
                            <option value="minor-fault">Minor Fault</option>
                            <option value="clearance">Clearance</option>
                        </Form.Select>
                        <Form.Label>Product Stock</Form.Label>
                        <Form.Control name='productStock' value={product.productStock} onChange={handleChange} className='customform' type="number" placeholder="Enter product Stock" />
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control name='productPrice' value={product.productPrice} onChange={handleChange} className='customform' type="number" placeholder="Enter product price" />
                    </Form.Group>
                    {/* <Form.Group controlId="productName">
                       
                    </Form.Group>

                    <Form.Group controlId="productDescription">
                       
                    </Form.Group>

                    <Form.Group controlId="productPrice">
                      
                    </Form.Group> */}

                    <Button className='custombutton1' variant="primary" type="submit">
                        Add Product
                    </Button>
                </Form>
            </Row>
                    {console.log(product)}
        </Col>

    )
}

export default AddProduct