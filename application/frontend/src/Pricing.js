import React, { Component } from 'react';
import NavbarHome from './components/Navbar/NavbarHome';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

class Pricing extends Component {

    render(){
        return(
        <>
         <Router>
          <NavbarHome />
          <h1>Pricing</h1>
          <Footer />
          </Router>
          </>
     );
}
}

export default Pricing;