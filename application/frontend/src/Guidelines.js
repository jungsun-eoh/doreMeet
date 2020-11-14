import React, { Component } from 'react';
import NavbarHome from './components/Navbar/NavbarHome';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

class Guidelines extends Component {

    render(){
        return(
        <>
         <Router>
          <NavbarHome />
          <h1>Guidelines</h1>
          <Footer />
          </Router>
          </>
     );
}
}

export default Guidelines;