import React, { Component } from 'react';
import { Button } from '../components/Navbar/Buttons';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './Auth.css';

class LogIn extends Component {

    state = {
      email: '',
      password: ''
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

    render(){
    <Navbar />
        return (
            <>
                <div className="container">
                    <form className="white" onSubmit={this.handleSubmit}>
                        <h1 className="heading">Log In</h1>

                        <div className="input">
                            <label htmlFor="username" className="sub-heading"> <b> Username </b></label>
                            <input type="username" id='username' placeholder="Enter Username" required onChange={this.handleChange} />
                        </div>

                        <div className="input">
                            <label htmlFor="password" className="sub-heading"> <b> Password </b></label>
                            <input type="password" id='password' placeholder="Enter Password" required onChange={this.handleChange} />
                        </div>

                        &nbsp; 

                        <div className="input">
                            <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large'> Log In </Button>
                        </div>

                        &nbsp; 

                        <div className="input">
                            <label><input type="checkbox" checked="checked" name="remember" /> Remember Me </label>
                        </div>
                    </form>
                </div>
                <Footer />
            </>
        )
    }
}
  
  export default LogIn
