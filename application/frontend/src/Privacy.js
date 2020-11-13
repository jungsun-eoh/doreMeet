import React, { Component } from 'react';
import NavbarHome from './components/Navbar/NavbarHome';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

class Privacy extends Component {

    render(){
        return(
        <>
         <Router>
          <NavbarHome />
          <h1>Privacy</h1>
          <Footer />
          </Router>
          </>
     );
}
}

export default Privacy;