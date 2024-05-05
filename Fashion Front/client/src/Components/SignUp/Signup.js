import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

import './SignUp.css';

const Signup = () => {
    const [err, setErr] = useState("");
    const [message, setMessage] = useState("");
    const [captchaValue, setCaptchaValue] = useState(null);

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "customer",
        password: "",
        passwordConfirm: "",
    });
    const onchange = (captchaValue) => {
        setCaptchaValue(captchaValue)
    }
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });

    }
    const register = async (e) => {
        e.preventDefault();
        setMessage("");
        setErr("");

        const { firstName, lastName, email, role, password, passwordConfirm } = user;

        if (firstName === "" || lastName === "" || email === "" || password === "" || passwordConfirm === "" || role === "") {
            setErr("Please fill all the fields");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/v1/users/signup', {
                firstName,
                lastName,
                email,
                role,
                password,
                passwordConfirm,
                captcha: captchaValue
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            if (response.status === 201) {
                setMessage("Registration successful. Please login.");
                window.location.replace("/login");
            }
            // redirect the user to the login page or show a success message.

        } catch (error) {
            // Handle error (e.g., show an error message)
            console.log(error);
            setErr(error.response.data.message); // You can customize this error message.
        }
    }
    const handleChangePassword = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        if (user.password === value) {
            setErr("");
        }
        else {
            setErr("Passwords do not match");
        }
    }
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
                        <Form.Group controlId="formBasicFirstName" className='mb-3 signup-form'>
                            <Form.Control name='firstName' value={user.firstName} onChange={handleChange} className="customform no-outline" type="name" placeholder="First name" />
                            <Form.Control name='lastName' value={user.lastName} onChange={handleChange} className="customform no-outline" type="name" placeholder="Last name" />
                            <Form.Control name='email' value={user.email} onChange={handleChange} className="customform no-outline" type="email" placeholder="Email" />
                            <Form.Control name='password' value={user.password} onChange={handleChange} className="customform no-outline" type="password" placeholder="Password" />
                            <Form.Control name='passwordConfirm' value={user.passwordConfirm} onChange={handleChangePassword} className="customform no-outline" type="password" placeholder="Confirm Password" />
                            <Form.Select name='role' value={user.role} onChange={handleChange} className='customform'>
                                <option value="customer">Customer</option>
                                <option value="seller">Seller</option>
                            </Form.Select>
                            <Button className='custombutton mb-3' type="submit" onClick={register}>
                                Create Account
                            </Button>
                            {err !== "" ? (<Alert key='danger' variant='danger'>{err}</Alert>) : null}
                            {message !== "" ? (<Alert key='success' variant='success'>{message}</Alert>) : null}
                        </Form.Group>
                        <div className='text-center pt-3' >
                            <p className="mt-2">
                                <a href="/login" className="create-account">Already a user?</a>
                            </p>
                        </div>
                        <ReCAPTCHA className='customcaptcha'
                                    sitekey="6LfQZtEpAAAAAJz7U75TBrjyd_Rod_lUbQnSBW9a"
                                    onChange={value => setCaptchaValue(value)}
                                    onExpired={() => setCaptchaValue(null)}
                                />

                    </Form>
                </Col>
            </Row>
        </Container >
    )
}


export default Signup;