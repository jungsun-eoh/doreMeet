/*
**CSC 648 Team 02 DoReMeet
**File: Terms.js
**Desc: This page contains all the terms and conditions required for usage of the site. Accessed through the footer
*/

import React, { Component } from 'react';
import NavbarHome from '../components/Navbar/NavbarHome';
import Footer from '../components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import '../App.css';

class Terms extends Component {

    render(){
        return(
        <>
         <Router>
          <NavbarHome />
          <div className='FooterBanner'>
              <h1> Terms &amp; Conditions </h1>
           </div>
           <div className="FooterContent">
           <h4>DoReMeet Terms and Conditions of Use</h4>
           <br />
           <p> Hey guys! Welcome to DoReMeet's Terms and Conditions of Use (these "Terms"). Our lawyers insist that we impose rules on users to protect all of our hard work. 
               This is a contract between you and the DoReMeer Group (as defined further below) and we want you to know yours and our rights before you use the DoReMeet. 
               Please take a few moments to read these Terms before enjoying the website, because once you access, view or use the website, you are going to be legally bound by these Terms 
               (so probably best to read them first!).</p>
            <br />
            <h5> DoReMeet RULES</h5>
            <br />
            <p>Before you can use our awesome website, you will need to register for an account ("Account"). In order to create an Account you must:
            <li> be at least 18 years old; and</li>
            <li>be legally permitted to use the website by the laws of your home country.</li></p>
            <br />
            <p>You can create an Account via manual registration. For more information about what information we use and how we use it, please check out our Privacy Policy.
            <br />
            Unfortunately, we cannot allow you to use another person's Account without permission - that just wouldn't be fair!
            You'll have great fun on DoReMeet, but if you feel the need to leave, you can delete or pause your Account at any time by going to the 'Settings' page when you are logged in and clicking on the 'Delete account' or 'Pause Account' link. 
            Your Account will be deleted immediately but it may take a little while for Your Content to be completely removed from the website. We will save your profile information in case you realise you miss us 
            and you decide to restore your Account (which you can do within 30 days of de-activating your Account). 
            If you delete your Account and try to create a new account within this time period using the same credentials, we will re-activate your Account for you. 
            If ypou pause your account, we'll simply mark your account as inactive, and ot show your profle to any of our other users. At the samae time, you will not be able to see anyone else's account.
            You can however see and chat with the people you've a;ready matched with and update your settings or 'Unpause' your account anytime.
            <br />
            We reserve the right at our sole discretion to terminate or suspend any Account, or make use of any operational, technological, legal or other means available to enforce the Terms (including without limitation blocking specific IP addresses), at any time without liability and without the need to give you prior notice.
            You may not access, tamper with, or use non-public areas of the website or our systems. Certain portions of the website may not be accessible if you have not registered for an Account.
           </p>
           <br />
           <br />

           <h4>DISCLAIMER</h4>
           <br />
           <p>Brace yourselves, this may look daunting but it is very important!
           <br />
            <br />
            THE SITE, OUR CONTENT, AND MEMBER CONTENT ARE ALL PROVIDED TO YOU "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT.
            <br /><br />
            SHOULD APPLICABLE LAW NOT PERMIT THE FOREGOING EXCLUSION OF EXPRESS OR IMPLIED WARRANTIES, THEN WE GRANT THE MINIMUM EXPRESS OR IMPLIED WARRANTY REQUIRED BY APPLICABLE LAW. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, SHALL CREATE ANY WARRANTY, REPRESENTATION OR GUARANTEE NOT EXPRESSLY STATED IN THIS SECTION.
            <br /><br />
            ADDITIONALLY, WE DO NOT MAKE ANY WARRANTIES THAT THE APP OR SITE WILL BE UNINTERRUPTED, SECURE OR ERROR FREE OR THAT YOUR USE OF THE APP OR SITE WILL MEET YOUR EXPECTATIONS, OR THAT THE APP, SITE, OUR CONTENT, ANY MEMBER CONTENT, OR ANY PORTION THEREOF, IS CORRECT, ACCURATE, OR RELIABLE. YOUR USE OF THE APP OR SITE IS AT YOUR OWN RISK. YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER MEMBERS. THE DOREMEET GROUP IS NOT RESPONSIBLE FOR THE CONDUCT OF ANY USER. DOREMEET DOES NOT CONDUCT CRIMINAL BACKGROUND CHECKS ON ITS MEMBERS.
            <br /><br />
            NEITHER US NOR ANY OWNER WILL BE LIABLE FOR ANY DAMAGES, DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE, INCLUDING, WITHOUT LIMITATION, LOSS OF DATA, INCOME, PROFIT OR GOODWILL, LOSS OF OR DAMAGE TO PROPERTY AND CLAIMS OF THIRD PARTIES ARISING OUT OF YOUR ACCESS TO OR USE OF THE APP, SITE, OUR CONTENT, OR ANY MEMBER CONTENT, HOWEVER CAUSED, WHETHER BASED ON BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), PROPRIETARY RIGHTS INFRINGEMENT, PRODUCT LIABILITY OR OTHERWISE.
            <br /><br />
            THE FOREGOING SHALL APPLY EVEN IF WE WERE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IF YOU BECOME DISSATISFIED IN ANY WAY WITH THE APP OR SITE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO STOP YOUR USE OF THE APP AND SITE.
            <br /><br />
            YOU HEREBY WAIVE ANY AND ALL CLAIMS ARISING OUT OF YOUR USE OF THE APP OR SITE. BECAUSE SOME STATES DO NOT ALLOW THE DISCLAIMER OF IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN TYPES OF DAMAGES, THESE PROVISIONS MAY NOT APPLY TO YOU. IF ANY PORTION OF THIS LIMITATION ON LIABILITY IS FOUND TO BE INVALID OR UNENFORCEABLE FOR ANY REASON, THEN OUR AGGREGATE LIABILITY SHALL NOT EXCEED ONE HUNDRED DOLLARS ($100).
            <br /><br />
            THE LIMITATION OF LIABILITY HEREIN IS A FUNDAMENTAL ELEMENT OF THE BASIS OF THE BARGAIN AND REFLECTS A FAIR ALLOCATION OF RISK. THE APP AND SITE WOULD NOT BE PROVIDED WITHOUT SUCH LIMITATIONS AND YOU AGREE THAT THE LIMITATIONS AND EXCLUSIONS OF LIABILITY, DISCLAIMERS AND EXCLUSIVE REMEDIES SPECIFIED HEREIN WILL SURVIVE EVEN IF FOUND TO HAVE FAILED IN THEIR ESSENTIAL PURPOSE.
            </p>
           </div>
          <Footer />
          </Router>
          </>
     );
}
}

export default Terms;