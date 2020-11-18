import React, {Component } from 'react';
import NavbarHome from './components/Navbar/NavbarHome';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

class FAQ extends Component {

    render(){
        return(
            <>
            <Router>
            <NavbarHome />
            <div className='FooterBanner'>
              <h1> FAQs </h1>
           </div>
           <Footer />
           </Router>
           </>
        );
    }
}

export default FAQ;