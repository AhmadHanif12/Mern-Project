import React from 'react';
import './Home.css';
import { Form, Button, Container, Row, Col, Carousel } from 'react-bootstrap';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className='home-background'>
                    <Carousel>
                        <Carousel.Item>
                            <img src='http://localhost:8080/img/products/home1.jpg' text="First slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='http://localhost:8080/img/products/home2.jpg' text="Second slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src='http://localhost:8080/img/products/home3.jpg' text="Third slide" />
                        </Carousel.Item>
                    </Carousel>
                </div>
                
            </div >

        );
    }
}

export default Home;    