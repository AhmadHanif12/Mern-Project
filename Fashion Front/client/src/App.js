
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/Signup';
import Checkout from './Components/Checkout/Checkout';
import Cart from './Components/Cart/Cart';
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  return (
    <div className="App">
      {console.log(isLogin)}
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login setIsLogin ={setIsLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </BrowserRouter>
      <Footer/>

      {console.log(isLogin)}
      {/* <div>
        <Header />
      </div>
      <div>
        {isLogin ? <LoginPage setIsLogin={setIsLogin} /> : <SignUp setIsLogin={setIsLogin} />}
      </div>

      <div>
        <Footer />
      </div> */}
    </div>

  );
}

export default App;
