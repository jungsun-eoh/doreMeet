import React, { Component } from 'react';
import { Button } from '../components/Navbar/Buttons';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './Auth.css';

class SignUp extends Component {
    state = {
        name: '',
        username: '',
        email: '',
        dob: '',
        password: '',
        confirmpassword: '',
      }
    
      //placeholder functionality - to be updated
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
      }
      
    render() {
        <Navbar />
        return (
        <>
        <div className="container">
            <form className="white" onSubmit={console.log('Submit')}>
            <h1 className="heading">Sign Up</h1>
            <p>Please fill the form to create an account with DoReMeet.</p>
            <small> All fields are required. </small>

            <div className="input">
                <label htmlFor="name" className="sub-heading"> <b> Name </b>
                <input type="name" id='name' placeholder="Enter Name" required onChange={this.handleChange} /></label>
            </div>

            <div className="input">
                <label htmlFor="username" className="sub-heading"> <b> Username </b>
                <input type="username" id='username' placeholder="Enter Username" required onChange={this.handleChange} /></label>
            </div>

            <div className="input">
                <label htmlFor="email" className="sub-heading"> <b> Email </b>
                <input type="email" id='email' placeholder="Enter Email" required onChange={this.handleChange} /></label>
            </div>

            <div className="input">
                <label htmlFor="dob" className="sub-heading"> <b> Date of Birth (MM/DD/YYYY) </b>
                <input type="dob" id="dob" placeholder="Enter Date of Birth" required onChange={this.handleChange}/></label>
            </div>

            <div className="input">
                <label htmlFor="password" className="sub-heading"> <b> Password </b></label>
                <input type="password" id='password' placeholder="Enter Password" required onChange={this.handleChange} />
            </div>

            <div className="input">
                <label htmlFor="confirmpassword" className="sub-heading"> <b> Confirm Password </b></label>
                <input type="password" id="confirmpassword" placeholder="Confirm Password" required onChange={this.handleChange} />
            </div>
            
            <div className="input">
                <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large'> Sign Up </Button>
            </div>
            
            &nbsp; 
            
            <div className="input">
                <label><input type="checkbox" checked="checked" name="remember" /> Remember Me </label>
            </div>

            <p>By creating an account you agree to our Terms &amp; Privacy.</p>
           
            &nbsp; 

            </form>
        </div>
        <Footer />
        </>
        )   
    }
}

export default SignUp;