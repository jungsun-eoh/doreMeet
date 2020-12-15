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
        formError: '',
        passwordError: '',
        dobError: '',
        //locationIQ stuff
        street_num: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        latitude: '',
        longitude: '',
        geo_code: ''  
      }
    
      handleChange = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value 
        })
        console.log(e.target.value)
        console.log(this);
      }
    
      signUp = async (e) => {
        this.getAddress();
        await axios.post('/signup', this.state)
        .then(response => {
             axios.post('/profileInit', this.state);
             axios.post('/prefInit', this.state);
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

        let dobError = "";
        let passwordError = "";

        if(!(this.state.password == this.state.confirmpassword)){
            passwordError = "Passwords do not match";
            formError = "Error: please review your form!"
        }

        if(!this.state.email.includes("@")){
            emailError = "Invalid Email";
            formError = "Error: please review your form!"
        }

        var g1 = new Date("2002-01-01");
        var g2 = new Date(this.state.dob.toString());
        if(g2.getTime()>g1.getTime()){
            dobError = "Must be atleast 18 years of age!"
            formError = "Error: please review your form!"
        }

        if(emailError || dobError || passwordError){
            this.setState({dobError});
            this.setState({passwordError});
            this.setState({formError});
            return false;
        }
        return true;
      }

       getAddress = () =>{
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(this.showAddress);
        }
        else{
          this.state.latitude = "Geolocation is not supported in this broswer! Try using Chrome!"
        }
      }

      showAddress = (position) =>{

        const LAT = position.coords.latitude;
        const LNG = position.coords.longitude;

        const KEY = "pk.5ccd8f4faf59486715879cb50f809a39";

        let url = `https://us1.locationiq.com/v1/reverse.php?key=${KEY}&lat=${LAT}&lon=${LNG}&format=json`;

        fetch(url).then(response => response.json()).then(data => {
            this.setState({
                street_num: data.address.house_number,
                street: data.address.road,
                city: data.address.city,
                state: data.address.state,
                zipcode: data.address.postcode,
                country: data.address.country,
                latitude: data.lat,
                longitude: data.lon 
            })
        })
        .catch(err => console.warn(err.message));
      }

    render() {
        const {firstname, lastname, username, email, gender, dob, phone, art, skill, password, confirmpassword} = this.state;
        return (
        <>
        <NavbarHome /><div className="container-signup">
            <form>
            <h1 className="heading-signup">Sign Up</h1>
            <p>Please fill the form to create an account with DoReMeet.</p>
            <small> <b>All fields are required. </b></small>
            <br />
            <br /> 
            <div style={{marginLeft: '20%'}}>
            <div className="input" style={{textAlign:'left'}}>
                <label htmlFor="firstname" className="sub-heading" > <b> First Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;&nbsp;&nbsp;</b>
                <input type="fname" name='firstname' value={this.state.firstname} placeholder="Enter First Name" required onChange={this.handleChange} style={{width: '45%'}} /></label>
            </div >
            <div className="input" style={{textAlign:'left'}}>
                <label htmlFor="lastname" className="sub-heading"> <b> Last Name&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp;&nbsp;&nbsp;</b>
                <input type="lname" name='lastname' value={this.state.lastname} placeholder="Enter Last Name" required onChange={this.handleChange} style={{width: '45%'}} /></label>
            </div>
            
            <div className="input" style={{textAlign:'left'}}>
                <label htmlFor="email" className="sub-heading"> <b> Email &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp;&nbsp;&nbsp;</b>
                <input style={{marginBottom: '0px'}} type="email" name='email' value={this.state.email} placeholder="Enter Email" required onChange={this.handleChange} style={{width: '45%'}} />
                <p style={{fontWeight: "600",color: 'red'}}>{this.state.emailError}</p></label>
            </div>

            <div className="input" style={{textAlign:'left'}}>
                <label htmlFor="username" className="sub-heading"> <b> Username &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp;&nbsp;&nbsp;</b>
                <input type="username" name='username' value={this.state.username} placeholder="Enter Username" required onChange={this.handleChange} style={{width: '45%'}} /></label> 
            </div>
            <div className="input" style={{ textAlign:'left'}}>
                <label htmlFor="gender" className="sub-heading" style={{display: 'inline'}}> <b> Gender &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp;&nbsp;&nbsp;</b>
                        <input type="radio" name='gender' value='M' checked={this.state.gender === 'M'} onChange={this.handleChange}/> <label> Male</label> &nbsp;   &nbsp; 
                        <input type="radio" name='gender' value='F' checked={this.state.gender === 'F'} onChange={this.handleChange}/><label > Female</label>&nbsp;   &nbsp; 
                        <input type="radio" name='gender' value='O' checked={this.state.gender === 'O'} onChange={this.handleChange}/> <label > Other</label>
                    {console.log('You have selected:', this.state.selectedOption)}</label>
            </div>
            <div className="input" style={{textAlign:'left'}}>
                    <label htmlFor="dob" className="sub-heading"> <b> Date of Birth &nbsp; &nbsp; &nbsp;  &nbsp;&nbsp; &nbsp;</b>
                    <input type="date" name="dob"  value={this.state.dob} placeholder="Enter Date of Birth" required onChange={this.handleChange} style={{width: '45%'}}/></label>
                    <h4 style={{fontWeight: "600",color: 'red'}}>{this.state.dobError}</h4>
            </div>
            <div className="input" style={{textAlign:'left'}}>
                <label htmlFor="phone" className="sub-heading"> <b> Phone Number &nbsp;  &nbsp;&nbsp; &nbsp;</b>
                <input type="phone" name='phone' value={this.state.phone} placeholder="Enter Phone Number" required onChange={this.handleChange} style={{width: '45%'}}/></label>
            </div>

            <div className="input" style={{textAlign:'left'}}>
                <table><tr><td>{/*need default  */}
                <label htmlFor="art" className="sub-heading"> <b> Art Category </b>&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                <select type="radio" required name="art" value={this.state.art} onChange={this.handleChange} >
                <option value={"M"}>Music</option>
                <option value={"D"}>Dance</option>
                <option value={"A"}>Art</option>
                <option value={"C"}>Cinema</option>
                <option value={"P"}>Photography</option></select></label>
                </td>
                </tr></table>
                
            </div>
            <br />
            <div className="input" style={{textAlign:'left'}}>
                <table><tr><td>
                <label htmlFor="skill" className="sub-heading"> <b> Skill Level </b> &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp;</label>
                </td> <td> {/*need default  */}
                <select type="radio" required name="skill" value={this.state.skill} onChange={this.handleChange} >
                <option value={"B"}>Beginner</option>
                <option value={"I"}>Intermediate</option>
                <option value={"E"}>Expert</option>
                </select>
                </td>
                </tr></table>
            </div>
            <div className="input" style={{textAlign:'left'}}>
                <label htmlFor="password" className="sub-heading"> <b> Password  &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;</b>
                <input type="password" name='password' value={this.state.password} placeholder="Enter Password" required onChange={this.handleChange} style={{width: '45%'}}/></label>
            </div>
            <div className="input" style={{textAlign:'left'}}>
                <label htmlFor="confirmpassword" className="sub-heading"> <b> Confirm Password </b>
                <input type="password" name="confirmpassword" value={this.state.confirmpassword} placeholder="Confirm Password" required onChange={this.handleChange} style={{width: '45%'}}/>
                <p style={{fontWeight: "600",color: 'red'}}>{this.state.passwordError}</p></label>
            </div> 
        </div>
            <br />
            <p>By creating an account you agree to our <a href="/Guidelines">Guidelines</a>, <a href="Terms">Terms &amp; Conditions</a> and <a href="Privacy">Privacy Policy.</a></p>
            <br /><br />
            
            <div className="input">
                <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large' onClick={this.handleSubmit}>Sign Up</Button>
                <h4 style={{marginBottom: "20px", fontWeight: "600",color: 'red'}}>{this.state.formError}</h4>
            </div>
            <br />
            <div className="input" style={{marginBottom: 50}}>
                <label className="sub-heading"> <b> Already have an account? </b> &nbsp;  &nbsp;  </label>
                <Link to='/login'><Button className='btn' buttonStyle='btn--primary' buttonSize='btn--small'> Log In </Button></Link>
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