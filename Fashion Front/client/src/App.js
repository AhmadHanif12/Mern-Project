
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/Signup';
import Checkout from './Components/Checkout/Checkout';
import Cart from './Components/Cart/Cart';
import Addproduct from './Components/AddProduct/AddProduct';
import Cookies from 'js-cookie';
import React, { Component } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";


export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: Cookies.get('token') || false
    }
  }
  setIsLogin = (value) => {
    this.setState({ isLogin: value })
  }
  render() {
    return (
      <div>
        <Header user={this.state.isLogin} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsLogin={this.setIsLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/addproduct" element={<Addproduct />} />

          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}

export default App