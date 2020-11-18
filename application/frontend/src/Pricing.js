import React, { Component } from 'react';
import NavbarHome from './components/Navbar/NavbarHome';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

class Pricing extends Component {

    render(){
        return(
        <>
         <Router>
          <NavbarHome />
          <div className='FooterBanner'>
              <h1> PRICING </h1>
           </div>
           <p style={{fontSize: 22, marginTop: 20, marginBottom: 20, marginLeft: 40, marginRight: 40, textAlign:'center'}}> 
           DoReMeet is a free service, and is open to all users.<br />
           However, for a more customized experience, we offer DoReMeet Premium, where for a small monthly cost you get access to unlimited, unrestricted services,
           so that you can really find that right match for yourself.</p>
           
           <p style={{fontSize: 22, marginTop: 20, marginBottom: 20, marginLeft: 40, marginRight: 40, textAlign:'center'}}> 
           With a Premium account you get:</p>
           <div style={{textAlign: 'left', marginLeft: 'auto', marginRight: 'auto', width: 275}}>
                <b style={{fontSize: 20}}><p>• Unlimited Likes</p>
                <p>• No Ads</p>
                <p>• Highlighted Profile</p>
                <p>• Increased Search Radius</p>
                <p>• Rewind on Potential Matches</p>
                <p>• Bigger Portfolio Size</p></b>
            </div>
            <br />
            <br />
            <p style={{ fontSize:20, textAlign:'center' , marginLeft: 40, marginRight: 40}}>
                Our pricing model is very simple and afforable, and aims to make our Premium services available to everyone. 
            </p>
            <br />
            <table style={{marginLeft: 'auto', marginRight: 'auto'}}><tr>
                <td><ul className="price"> <h2><b> $4.99 <br/><br/> for 1 Month</b></h2></ul></td>
                <td><ul className="price"> <h2><b> $49.99  <br /><br/> for 6 Months </b></h2></ul></td>
                <td><ul className="price"> <h2><b> $119.99  <br /><br/> for 1 year &nbsp;</b></h2></ul></td>
            </tr></table>
            <br />
            <h2 style={{ textAlign:'center' , marginLeft: 40, marginRight: 40}}>Upgrade your account today and increase your chances of finding the right match!</h2>
            <h4 style={{ textAlign:'center' , marginLeft: 40, marginRight: 40}}>To upgrade your acccount, log in and update your Settings</h4>
           <br />
           <br />
           <br />
          <Footer />
          </Router>
          </>
     );
}
}

export default Pricing;