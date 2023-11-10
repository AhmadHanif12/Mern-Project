import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

class Login extends React.Component {

    render() {
        return (
            <div>
                <Container className="login-main">
                    <Row className="justify-content-md-center">
                        <Col md={{ span: 6 }}>
                            <h2>Login</h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md={{ span: 6 }}>
                            <Form>
                                <Form.Group controlId="formBasicEmail" className='mb-3'>

                                    <Form.Control className="customform no-outline" type="email" placeholder="Email" />

                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className='mb-3'>
                                    <Form.Control className="customform no-outline" type="password" placeholder="Password" />
                                    <div className="text-left mt-2">
                                        <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
                                    </div>
                                </Form.Group>

                                <div className='text-center pt-3' >
                                    <Button className='custombutton mb-3' type="submit">
                                        Sign in
                                    </Button>
                                    <p className="mt-2">
                                        <a href="/signup" className="create-account">Create account</a>
                                    </p>
                                </div>

                            </Form>
                        </Col>
                    </Row>
                </Container >
            </div>
        );
    }
}

export default Login;