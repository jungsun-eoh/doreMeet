import React, { Component } from 'react';
import NavbarHome from './components/Navbar/NavbarHome';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

class Careers extends Component {

    render(){
        return(
        <>
         <Router>
          <NavbarHome />
          <div className='FooterBanner'>
              <h1> CAREERS </h1>
           </div>
          <Footer />
          </Router>
          </>
     );
}
}

export default Careers;