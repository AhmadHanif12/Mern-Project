import React from 'react';
import './About.css';

const About = () => (
    <div className="container">
        <div className="about-section">
            <h1>About Fashion Front</h1>
            <p>Welcome to Fashion Front, the premier online destination for fashion sellers to showcase and sell their clothing to a wide audience of customers.</p>
        </div>

        <div className="platform-introduction">
            <h2>Our Platform</h2>
            <p>Fashion Front provides a robust platform for sellers to reach fashion-forward individuals. Our site is designed to make it easy for you to connect with buyers who appreciate your unique style.</p>
        </div>

        <div className="seller-benefits">
            <h2>Seller Benefits</h2>
            <ul>
                <li>Access to a dedicated community of fashion enthusiasts</li>
                <li>Simple and intuitive listing process</li>
                <li>Secure transactions and reliable customer service</li>
                <li>Insights and analytics to grow your business</li>
            </ul>
        </div>

        <div className="call-to-action">
            <h2>Join Us</h2>
            <p>Are you ready to take your fashion business to the next level? Join Fashion Front today and start connecting with customers around the globe.</p>
        </div>
    </div>
);

export default About;