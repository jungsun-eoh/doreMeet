/*
**CSC 648 Team 02 DoReMeet
**File: RecoverPassword.js
**Desc: This is the page where users will be able to recover password. Can be accessed through login page
*/

import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import NavbarHome from '../components/Navbar/NavbarHome';
import { Button } from '../components/Navbar/Buttons';
import Footer from '../components/Footer/Footer';


class RecoverPassword extends Component {
    state = {
        email: ""
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

    handleSubmit = (e) => {
        e.preventDefault();
      }

    recoverPassword = e =>{
        e.preventDefault();
        axios.post('/recoverPassword', this.state).then(response =>{
            if(response.data){
                alert("We just sent email to the email account.");
                this.props.history.push('/login');
            }else{
                alert("We don't have an account for this email address.");
            }
        });
    }

    render(){
        return(
            <>
             <NavbarHome />
                <div className ="container-ban">
                    <label style={{position: "center", fontSize:'15', width: '20%', marginLeft:30, marginRight: 'auto', marginTop:10}} type='text'> <a href="/login">Back to login</a> </label><br/>
                    <header className="App-header">
                        <div className="Info">
                            <h1>Reset your password</h1>
                            <h4>We will send you a secure link to change your password.</h4><br/>
                        </div>                    
                        <form onSubmit={this.handleSubmit}>
                            <div className="input">
                                <label htmlFor="email" className="sub-heading">  </label>
                                <input style={{width: "480px"}} type="email" name='email' value={this.state.email} placeholder="Enter email address" required onChange={this.handleChange} />
                            </div>
                            <div className="input">
                                <Button style={{backgroundColor: "#FD7D7D", width: "480px"}} className='btn' buttonStyle='btn--primary' buttonSize='btn--large' onClick={this.recoverPassword} > Send Email </Button>
                            </div>
                        </form>
                        </header> 
                </div>
            <Footer />
            </>
        )   
    }
}

export default RecoverPassword;