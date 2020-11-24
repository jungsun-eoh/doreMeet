/*
**CSC 648 Team 02 DoReMeet
**File: ContactUs.js
**Desc: Contact page that users can use to voice concerns or ask questions, accessed through footer
*/
import React, { Component } from 'react';
import NavbarHome from '../components/Navbar/NavbarHome';
import { Button } from '../components/Navbar/Buttons';
import Footer from '../components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import '../Auth/Auth.css';
import '../App.css';

class ContactUs extends Component {
    state = {
        name: '',
        email: '',
        message: '',
      }

      handleChange = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value 
        })
        console.log(e.target.value)
        console.log(this);
    }
    
      handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
      }

    render(){
        return(
        <>
         <Router>
          <NavbarHome />
          <div className='FooterBanner'>
              <h1> CONTACT US </h1>
           </div>
           <div className="FooterContent">
            <p>Please fill out the form with any questions/concerns/suggestions you have, and we will get back to you as soon as possible.</p>
            <br /><br />
            <p>Thank you for being a valued customer!</p>
           </div>
           <form onSubmit={this.handleSubmit}>
               <div className="containerContact">
           <div className="input">
                    <label htmlFor="name" className="sub-heading"> <b> Name </b></label>
                    <input type="name" name='name' value={this.state.name} placeholder="Enter Name" required onChange={this.handleChange} />
            </div>

            <div className="input">
                <label htmlFor="email" className="sub-heading"> <b> Email </b>
                <input type="email" name='email' value={this.state.email} placeholder="Enter Email" required onChange={this.handleChange} /></label>
            </div>

            <div className="input">
                <label htmlFor="message" className="sub-heading"> <b> Message/Question? </b>
                <input type="text" name='message' value={this.state.message} placeholder="Share your Questions/Concerns/Suggestions" required onChange={this.handleChange} /></label>
            </div>

            <br />

            <div style={{alignItems:'center', justifyContent:'center', marginLeft: 320}}><Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large' onClick={this.register}> Send Message </Button></div>
            </div>
           </form>
          
          <Footer />
          </Router>
          </>
     );
}
}

export default ContactUs;