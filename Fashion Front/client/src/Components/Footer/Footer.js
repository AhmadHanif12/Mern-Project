import React from 'react';
import logo from '../../flogo.png';
import facebook from './Icons/facebook.png';
import instagram from './Icons/instagram.png';
import twitter from './Icons/twitter.png';
import './Footer.css';
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap';

class Footer extends React.Component {
    render() {
        return (
            <div className='footer-main'>
                <Container>
                    <Row>
                        <Col>
                            <Navbar.Brand href="/">
                                <img
                                    src={logo}
                                    width="150"
                                    height="150"
                                    className="d-inline-block align-top logo"
                                    alt="Ecommerce Logo"
                                />
                            </Navbar.Brand>
                        </Col>
                        <Col>
                            <Nav.Link href="/" className='footer-link'>Wanna see our new deals?</Nav.Link>
                            <Nav.Link href="/shop" className='footer-link'>Visit our shop</Nav.Link>
                            <Nav.Link href="/clearance" className='footer-link'>Clearance deals are waiting for you!</Nav.Link>
                            <Nav.Link href="/minorFault" className='footer-link'>Minor Faults are available at great deals! </Nav.Link>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row className="social-media-icons">
                        <Col xs={1} className="copyright">© 2023</Col >
                        <Col>
                        <Nav.Link href="#facebook.com" className= 'footer-icons'><img src={facebook} alt='facebook Icon'/></Nav.Link>
                        <Nav.Link href="#instagram.com" className= 'footer-icons'><img src={instagram} alt='Instragram Icon'/></Nav.Link>
                        <Nav.Link href="#x.com" className= 'footer-icons'><img src={twitter} alt='Twitter Icon'/></Nav.Link>

                        </Col>
                        <Col xs={1}></Col>
            
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Footer;