import React from 'react';
import './Contact.css';

const Contact = () => (
    <div className="contact-container">
        <h1>Contact Us</h1>
        <p>If you have any questions or need assistance, please reach out to us:</p>
        <div className="contact-info">
            <div className="contact-item">
                <label>Email:</label>
                <p>support@fashionfront.com</p>
            </div>
            <div className="contact-item">
                <label>Phone:</label>
                <p>(123) 456-7890</p>
            </div>
            <div className="contact-item">
                <label>Address:</label>
                <p>123 Fashion Ave, New York, NY 10001</p>
            </div>
        </div>
    
    </div>
);

export default Contact;