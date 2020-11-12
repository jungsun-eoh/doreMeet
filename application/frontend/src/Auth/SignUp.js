import React, { Component } from 'react';
import { Button } from '../components/Navbar/Buttons';
import NavbarHome from '../components/Navbar/NavbarHome';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import './Auth.css';

class SignUp extends Component {
    state = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        gender: '',
        dob: '',
        phone: '',
        art:'',
        skill: '',
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
        return (
        <>
        <NavbarHome />
        <div className="container">
            <form onSubmit={console.log('Submit')}>
            <h1 className="heading-signup">Sign Up</h1>
            <p>Please fill the form to create an account with DoReMeet.</p>
            <small> All fields are required. </small>

            <div className="input">
                
                <table>
                    <tr><td>
                    <label htmlFor="firstname" className="sub-heading"> <b> First Name </b></label>
                <input type="name" id='firstname' placeholder="Enter First Name" required onChange={this.handleChange} />
                </td><td>
                <label htmlFor="lastname" className="sub-heading"> <b> Last Name </b></label>
                <input type="name" id='lastname' placeholder="Enter Last Name" required onChange={this.handleChange} />
                </td></tr>
                </table>
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
                <label htmlFor="dob" className="sub-heading"> <b> Date of Birth </b>
                <input type="date" id="dob" placeholder="Enter Date of Birth" required onChange={this.handleChange}/></label>
            </div>

            <div className="input">
                <table>
                <tr><td>
                 <label htmlFor="gender" className="sub-heading"> <b> Gender </b></label> 
                 </td>&nbsp;  &nbsp; &nbsp;  &nbsp;
                <td>
                <input type="radio" id='gender' onChange={this.handleChange} /> &nbsp; <label>Male</label>
                </td> &nbsp;  &nbsp; <td>
                <input type="radio" id='gender' onChange={this.handleChange} />  &nbsp;  <label>Female</label>
                </td> &nbsp;  &nbsp; <td>
                <input type="radio" id='gender' onChange={this.handleChange} /> &nbsp; <label>Other</label>
                </td>
                 </tr>
                </table>
            </div>

            <div className="input">
                <table><tr><td>
                <label htmlFor="art" className="sub-heading"> <b> Art Category </b>&nbsp;  &nbsp; &nbsp;</label>
                <select type="radio" required onChange={this.handleChange} source="[id=art]">
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
                </td> <td> 
                <select type="radio" required onChange={this.handleChange} source="[id=skill]">
                <option value={"B"}>Begginer</option>
                <option value={"I"}>Intermediate</option>
                <option value={"E"}>Expert</option>
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
                <option value={"4"}>4</option>
                <option value={"5"}>5</option>
                <option value={"6"}>6</option>
                <option value={"7"}>7</option>
                <option value={"8"}>8</option>
                <option value={"9"}>9</option>
                <option value={"10"}>10</option>
                </select></td>
                </tr></table>
            </div>

            <br />

            <div className="input">
                <label htmlFor="phone" className="sub-heading"> <b> Phone Number </b>
                <input type="phone" id='phone' placeholder="Enter Phone Number" required onChange={this.handleChange} /></label>
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
            <br /><br />
            <div className="input">
                <label className="sub-heading"> <b> Already have an account? </b> &nbsp;  &nbsp;  </label>
                <Link to='/login'><Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large'> Log In </Button></Link>
                </div>


            </form>
        </div>
        <Footer />
        </>
        )
    }
}

export default SignUp;