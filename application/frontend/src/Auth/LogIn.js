import React, { Component } from 'react';
import { Button } from '../components/Navbar/Buttons';
import NavbarHome from '../components/Navbar/NavbarHome';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
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
        return (
            <>
            <NavbarHome />
                <div className="container">
                    <form className="white" onSubmit={this.handleSubmit}>
                        <h1 className="heading-login">Log In</h1>

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
                            <table>
                                <tr> 
                                    <td>
                                        <label><input type="checkbox" checked="checked" name="remember" /> Remember Me </label>
                                    </td>
                                    <pre className='tab'></pre>
                                    <td>
                                        <Link to='/'><label> Forgot Password </label></Link>
                                    </td>
                            </tr>
                            </table>
                        </div>
                        <br /><br />
                        <div className="input">
                           <label className="sub-heading"> <b> Don't have an account yet? </b> &nbsp;  &nbsp;  </label>
                           <Link to='/signup'><Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large'> Sign Up! </Button></Link>
                        </div>
                    </form>
                </div>
                <Footer />
            </>
        )
    }
}
  
  export default LogIn
