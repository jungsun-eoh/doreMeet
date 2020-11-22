/*
**CSC 648 Team 02 DoReMeet
**File: faq.js
**Desc: Simple FAQ page that can be accessed through the footer
*/

import React, {Component } from 'react';
import NavbarHome from '../components/Navbar/NavbarHome';
import Accordion from '../components/Accordion/Accordion';
import Footer from '../components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import '../App.css';

class FAQ extends Component {

    render(){
        return(
            <>
            <Router>
            <NavbarHome />
            <div className='FooterBanner'>
              <h1> FAQs </h1>
           </div>
           <h1 style={{fontSize: 44, marginTop: 20, marginBottom: 20, marginLeft: 30, marginRight: 30, textAlign:'center'}}> Need Help? </h1>
           <p style={{fontSize: 24, marginTop: 20, marginBottom: 20, marginLeft: 30, marginRight: 30, textAlign:'center'}}> 
           Check the popularly asked questions, and if you still can't find the answer <b><a href="/ContactUs">Contact Us here</a></b></p>
           <br />
           <Accordion 
               title="Question 1"
               content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
           <Accordion 
               title="Question 2"
               content="Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. 
               <br />
               Maecenas nisl est, ultrices nec congue eget, auctor vitae massa."/>
           <Accordion 
               title="Question 3"
               content="Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula 
               venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa."/>
           <Accordion 
               title="Question 4"
               content="Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio,
               <br /> vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, 
               <br />ultrices nec congue eget, auctor vitae massa."/>
           <Accordion 
               title="Question 5"
               content="vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, 
               <br />ultrices nec congue eget, auctor vitae massa."/>
           <Accordion
               title="Question 6"
               content="vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa." />
           <br />
           <br />
           <br />
           <Footer />
           </Router>
           </>
        );
    }
}

export default FAQ;