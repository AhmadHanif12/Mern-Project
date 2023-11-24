import React from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Login.css'

const Login = (props) => {
    const [err, setErr] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState({
        email: "",
        password: "",

    });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const login = async (e) => {
        e.preventDefault();
        setMessage("");
        setErr("");

        const { email, password } = user;

        if (email === "" || password === "") {
            setErr("Please fill all the fields");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/v1/users/login', {
                email,
                password
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            if (response.status === 200) {
                setMessage("Login successful.");
                Cookies.set('token',response.data.token, { expires: 7 });
                props.setIsLogin(true);
                window.location.replace("/");
            }

        } catch (error) {
            //console.log(error);
            setErr(error.response.data.message); // You can customize this error message.
        }
    }
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

                                <Form.Control name='email' value={user.email} className="customform no-outline" onChange={handleChange} type="email" placeholder="Email" />
                                <Form.Control name='password' value={user.password} className="customform no-outline" type="password" onChange={handleChange} placeholder="Password" />
                                <div className="text-left mt-2">
                                    <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
                                </div>

                                <div className='text-center pt-3' >
                                    <Button className='custombutton mb-3' type="submit" onClick={login}>
                                        Sign in
                                    </Button>
                                    {err !== "" ? (<Alert key='danger' variant='danger'>{err}</Alert>) : null}
                                    {message !== "" ? (<Alert key='success' variant='success'>{message}</Alert>) : null}
                                    <p className="mt-2">
                                        <a href="/signup" className="create-account">Create account</a>
                                    </p>
                                </div>

                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
            </Container >
        </div>
    );
}

export default Login;