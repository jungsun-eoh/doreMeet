import React, { Component } from 'react';
import NavbarHome from './components/Navbar/NavbarHome';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

class Company extends Component {

    render(){
        return(
        <>
         <Router>
          <NavbarHome />
          <h1>Company</h1>
          <Footer />
          </Router>
          </>
     );
}
}

export default Company;