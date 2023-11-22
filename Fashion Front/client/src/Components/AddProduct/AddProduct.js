import React, {useState} from 'react'
import './AddProduct.css'
import axios from 'axios'
import { Row, Col, Container, Form, Button, Alert } from 'react-bootstrap'

function AddProduct() {
    const [err, setErr] = useState("");
    const [message, setMessage] = useState("");
    const [product, setProduct] = React.useState({
        name: '',
        description: '',
        price: 0,
        images: [],
        brand: '',
        category: '',
        stock: 0
    });

    //Function to handle change
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

    //Function to handle submit
    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage("");
        setErr("");
    
        const { name, description, price, images, brand, category, stock } = product;
    
        if (name === "" || description === "" || price === "" || images.length === 0 || brand === "" || category === "" || stock === "") {
            setErr("Please fill all the fields");
            return;
        }
    
        try {
            const p = {
                name,
                description,
                price,
                images,
                brand,
                category,
                stock
            };
            
            console.log(p);
            const response = await axios.post('http://localhost:8080/api/v1/products/', p, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // handle response here...
            console.log(response);
        } catch (error) {
            // handle error here...
            console.error(error);
        }
    }

    return (

        <Col>
            <Row className='customtitle'>
                <h3>Add Product</h3>
            </Row>
            <Row className='customCol'>

                <Form>
                    {/* Complete Add Product Form */}
                    <Form.Group controlId="productImage" className='customforms'>
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control name='images' onChange={handleChange} className='customform' type="file" multiple accept=".jpg, .jpeg, .png" />
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control name='name' value={product.name} onChange={handleChange} className='customform' type="text" placeholder="Enter Product name" />
                        <Form.Label>Product Brand</Form.Label>
                        <Form.Control name='brand' value={product.brand} onChange={handleChange} className='customform' type="text" placeholder="Enter Product Brand" />
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control name='description' value={product.description} onChange={handleChange} as="textarea" className='customform' rows={3} placeholder="Enter product description" />
                        <Form.Label>Product Category</Form.Label>

                        <Form.Select name='category' value={product.category} onChange={handleChange} className='customform'>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kids">Kids</option>
                            <option value="minor-fault">Minor Fault</option>
                            <option value="clearance">Clearance</option>
                        </Form.Select>
                        <Form.Label>Product Stock</Form.Label>
                        <Form.Control name='stock' value={product.stock} onChange={handleChange} className='customform' type="number" placeholder="Enter product Stock" />
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control name='price' value={product.price} onChange={handleChange} className='customform' type="number" placeholder="Enter product price" />
                    </Form.Group>
                    {/* <Form.Group controlId="productName">
                       
                    </Form.Group>

                    <Form.Group controlId="productDescription">
                       
                    </Form.Group>

                    <Form.Group controlId="productPrice">
                      
                    </Form.Group> */}

                    <Button onClick={submitHandler} className='custombutton1' variant="primary" type="submit">
                        Add Product
                    </Button>
                    {err != "" ? (<Alert key='danger' variant='danger'>{err}</Alert>) : null}
                    {message != "" ? (<Alert key='success' variant='success'>{message}</Alert>) : null}
                </Form>
            </Row>
        </Col>

    )
}

export default AddProduct