import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

class SignUp extends React.Component {
    render() {
        return (
            <Container className="login-main">
                <Row className="justify-content-md-center">
                    <Col md={{ span: 6 }}>
                        <h2>Create Account</h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={{ span: 6 }}>
                        <Form>
                            <Form.Group controlId="formBasicFirstName" className='mb-3'>

                                <Form.Control className="customform no-outline" type="name" placeholder="First name" />

                            </Form.Group>
                            <Form.Group controlId="formBasicLastName" className='mb-3'>

                                <Form.Control className="customform no-outline" type="name" placeholder="Last name" />

                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className='mb-3'>

                                <Form.Control className="customform no-outline" type="email" placeholder="Email" />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className='mb-3'>
                                <Form.Control className="customform no-outline" type="password" placeholder="Password" />
    
                            </Form.Group>

                            <div className='text-center pt-3' >
                                <Button className='custombutton mb-3' type="submit">
                                    Create
                                </Button>
                                <p className="mt-2">
                                    <a href="/login"  className="create-account">Already a user?</a>
                                </p>
                            </div>

                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }
}

export default SignUp;