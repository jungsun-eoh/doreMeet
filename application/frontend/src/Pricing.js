import React, { Component } from 'react';
import NavbarHome from './components/Navbar/NavbarHome';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

class Pricing extends Component {

    render(){
        return(
        <>
         <Router>
          <NavbarHome />
          <div className='FooterBanner'>
              <h1> PRICING </h1>
           </div>
          <Footer />
          </Router>
          </>
     );
}
}

export default Pricing;