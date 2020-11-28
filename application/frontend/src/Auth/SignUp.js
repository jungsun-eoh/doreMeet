/*
**CSC 648 Team 02 DoReMeet
**File: SignUp.js
**Desc: This is the signup page. Contains all the fields that users must fill out in order to create an account
*/

import React, { Component } from 'react';
import { Button } from '../components/Navbar/Buttons';
import NavbarHome from '../components/Navbar/NavbarHome';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';

class SignUp extends Component {
    state = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        gender: '0',
        dob: '',
        phone: '',
        art:'M',
        skill: 'B',
        password: '',
        confirmpassword: '',
        emailError: '',
        formError: ''
      }
    
      handleChange = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value 
        })
        console.log(e.target.value)
        console.log(this);
      }
    
      signUp = (e) => {
         axios.post('/signup', this.state)
        .then(response => {
            window.location = "/retrive";
        })
        .catch(error => {
            console.log(error)
        });
        this.props.history.push('/login');


      }

      handleSubmit = event => {
          console.log("Entered handleSubmit");
          event.preventDefault();
          const isValid = this.validate();
          if(isValid){
            this.signUp();
          }
      }

      validate = () =>{
        let emailError = "";
        let formError = "";

        if(!this.state.email.includes("@")){
            emailError = "Invalid Email";
            formError = "Error: please review your form!"
        }

        if(emailError){
            this.setState({emailError});
            this.setState({formError});
            return false;
        }
        return true;
      }

    render() {
        const {firstname, lastname, username, email, gender, dob, phone, art, skill, password, confirmpassword} = this.state;
        return (
        <>
        <NavbarHome />
        <div className="container-signup">
            <form>
            <h1 className="heading-signup">Sign Up</h1>
            <p>Please fill the form to create an account with DoReMeet.</p>
            <small> All fields are required. </small>
            <br />
            <br />
            <div className="input">
                
                <table>
                    <tr><td>
                    <label htmlFor="firstname" className="sub-heading"> <b> First Name </b></label>
                    <input type="fname" name='firstname' value={this.state.firstname} placeholder="Enter First Name" required onChange={this.handleChange} />
                    </td><td>
                    <label htmlFor="lastname" className="sub-heading"> <b> Last Name </b></label>
                    <input type="lname" name='lastname' value={this.state.lastname} placeholder="Enter Last Name" required onChange={this.handleChange} />
                    </td></tr>
                </table>
            </div>

            <div className="input">
                <label htmlFor="username" className="sub-heading"> <b> Username </b>
                <input type="username" name='username' value={this.state.username} placeholder="Enter Username" required onChange={this.handleChange} /></label>
            </div>

            <div className="input">
                <label htmlFor="email" className="sub-heading"> <b> Email </b>
                <input style={{marginBottom: '0px'}} type="email" name='email' value={this.state.email} placeholder="Enter Email" required onChange={this.handleChange} /></label>
                <h4 style={{marginBottom: "20px", fontWeight: "600",color: 'red'}}>{this.state.emailError}</h4>
            </div>


            <div className="input">
                <label htmlFor="dob" className="sub-heading"> <b> Date of Birth </b>
                <input type="date" name="dob"  max="2002-01-01"  value={this.state.dob} placeholder="Enter Date of Birth" required onChange={this.handleChange}/></label>
            </div>

            <div className="input">
                <table>
                <tr><td>
                 <label htmlFor="gender" className="sub-heading"> <b> Gender </b></label> 
                 </td>&nbsp;  &nbsp; &nbsp;  &nbsp;
                <td>
                <input type="radio" name='gender' value='M' checked={this.state.gender === 'M'} onChange={this.handleChange} /> &nbsp; <label>Male</label>
                </td> &nbsp;  &nbsp; <td>
                <input type="radio" name='gender' value='F' checked={this.state.gender === 'F'} onChange={this.handleChange} />  &nbsp;  <label>Female</label>
                </td> &nbsp;  &nbsp; <td>
                <input type="radio" name='gender' value='O' checked={this.state.gender === 'O'} onChange={this.handleChange} /> &nbsp; <label>Other</label>
                </td>
                 </tr>
                </table>
                {console.log('You have selected:', this.state.selectedOption)}
            </div>

            <div className="input">
                <table><tr><td>{/*need default  */}
                <label htmlFor="art" className="sub-heading"> <b> Art Category </b>&nbsp;  &nbsp; &nbsp;</label>
                <select type="radio" required name="art" value={this.state.art} onChange={this.handleChange} >
                <option value={"M"}>Music</option>
                <option value={"D"}>Dance</option>
                <option value={"A"}>Art</option>
                <option value={"C"}>Cinema</option>
                <option value={"P"}>Photography</option></select>
                </td>
                </tr></table>
            </div>

            <br />

            <div className="input">
                <table><tr><td>
                <label htmlFor="skill" className="sub-heading"> <b> Skill Level </b> &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; </label>
                </td> <td> {/*need default  */}
                <select type="radio" required name="skill" value={this.state.skill} onChange={this.handleChange} >
                <option value={"B"}>Beginner</option>
                <option value={"I"}>Intermediate</option>
                <option value={"E"}>Expert</option>
                </select></td>
                </tr></table>
            </div>

            <br />

            <div className="input">
                <label htmlFor="phone" className="sub-heading"> <b> Phone Number </b>
                <input type="phone" name='phone' value={this.state.phone} placeholder="Enter Phone Number" required onChange={this.handleChange} /></label>
            </div>

            <div className="input">
                <label htmlFor="password" className="sub-heading"> <b> Password </b></label>
                <input type="password" name='password' value={this.state.password} placeholder="Enter Password" required onChange={this.handleChange} />
            </div>

            <div className="input">
                <label htmlFor="confirmpassword" className="sub-heading"> <b> Confirm Password </b></label>
                <input type="password" name="confirmpassword" value={this.state.confirmpassword} placeholder="Confirm Password" required onChange={this.handleChange} />
            </div> 
            
            <div className="input">
                <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large' onClick={this.handleSubmit}> Sign Up </Button>
                <h4 style={{marginBottom: "20px", fontWeight: "600",color: 'red'}}>{this.state.formError}</h4>
            </div>

            &nbsp; 
            
            <div className="input">
                <label><input type="checkbox" checked="checked" name="remember" /> Remember Me </label>
            </div>
            <br />
            <p>By creating an account you agree to our <a href="/Guidelines">Guidelines</a>, <a href="Terms">Terms &amp; Conditions</a> and <a href="Privacy">Privacy Policy.</a></p>
            <br /><br />
            <div className="input" style={{marginBottom: 50}}>
                <label className="sub-heading"> <b> Already have an account? </b> &nbsp;  &nbsp;  </label>
                <Link to='/login'><Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large'> Log In </Button></Link>
            </div>
                <br />

            </form>
        </div>
        <Footer />
        </>
        )
    }
}

export default SignUp;