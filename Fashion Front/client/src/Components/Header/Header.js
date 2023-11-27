import React, {useState}from 'react';
import logo from '../../logo.svg';
import cart from './Icons/cart.png';
import find from './Icons/find.png';
import profile from './Icons/profile.png';
import close from './Icons/close.png';
import Cookies from 'js-cookie';
import './Header.css';
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';

function Header(props) {
    const [isActive, setIsActive] = useState(false);
    const openSearch = () => {
        setIsActive(true);
    };
    const closeSearch = () => {
        setIsActive(false);
    };
    
    const logout = () => {
        Cookies.remove('token');
        window.location.href = '/login';
    }
    
    return (
        <div>
            <div className={`search-bar ${isActive ? 'search-bar-active' : ''}`}>
                    <div className='container'>
                        <Form className="d-flex ">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2 custom-search no-outine"
                                aria-label="Search"
                            />
                            <Button variant="outline-success nav-icons" className='nav-icons'><img alt="search icon" src={find} /></Button>
                            <Button variant="outline-success nav-icons" className='nav-icons' onClick={closeSearch}><img alt="close icon" src={close} /></Button>
                        </Form>
                    </div>
                </div>
                <Navbar bg="light" expand="lg" className="customNav">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                width="50"
                                height="50"
                                className="d-inline-block align-top logo"
                                alt="Ecommerce Logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/shop">Shop</Nav.Link>
                                <Nav.Link href="/clearence">Clearance</Nav.Link>
                                <Nav.Link href="/minorFault">Minor Fault</Nav.Link>

                                <NavDropdown title="New Arrivals" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Men</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Women</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Kids</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/contact">Contact</Nav.Link>
                                <Nav.Link href="/addseller">Become a seller</Nav.Link>
                                <Nav.Link href="/aboutUs">About Us</Nav.Link>
                            </Nav>
                            <Nav>
                                <Form className="d-flex">
                                    {/* <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2 custom-search"
                                    aria-label="Search"
                                    /> 
                                    <Button variant="outline-success search-icon nav-icons" onClick={this.openSearch}><img alt = "search icon" src={find}/></Button>*/}
                                </Form>

                                <Nav.Link href="#search" className='nav-icons search-icon' onClick={openSearch}><img alt="search icon" src={find} /></Nav.Link>
                                <NavDropdown className='nav-icons user-icon' title={<img src={profile} alt='profile-icon' />} id="basic-nav-dropdown">
                                    {
                                        props.user ?
                                            <div>
                                                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                            </div>
                                            :
                                            <div>
                                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                                <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                                            </div>
                                    }
                                    {/* <NavDropdown.Item href="#action/3.1">Men</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Women</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Kids</NavDropdown.Item> */}
                                </NavDropdown>
                                {/* <Nav.Link href='/login' className='nav-icons'><img src={profile} /></Nav.Link> */}
                                <Nav.Link href="/cart" className='nav-icons'><img src={cart} alt='cart-icon' /></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </div>
    )
}

export default Header;

