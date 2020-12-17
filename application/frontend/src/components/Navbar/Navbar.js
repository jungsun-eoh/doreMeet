/*
**CSC 648 Team 02 DoReMeet
**File: Navbar.js
**Desc: The navbar that is used for users that have logged in. Contains links to the Community, Matching, Chat,
Profile, and Settings page. Also has a logout button.
*/
import React, { Component } from 'react';
import axios from 'axios';
import { Button } from './Buttons';
import { MenuItems } from './MenuItems';
import { BrowserRouter} from 'react-router-dom';
import { withRouter} from 'react-router';
import {createBrowserHistory} from 'history';

import './Navbar.css';

export const history = createBrowserHistory({forceRefresh:true})

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        clicked: false,
        isDesktop: false
        };
        this.updatePredicate = this.updatePredicate.bind(this);
    }

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

/*    logout = (e) =>{
        e.preventDefault();
        axios.post('/logout', this.state).then(response =>{
            history.push('/login');

        });
    }
*/
	    logout = (e) =>{
        e.preventDefault();
        axios.post('/logout', {params: { user: document.cookie}}).then(response =>{
            var old = document.cookie;
            // console.log(old);
            // console.log(response.data);
            // console.log(document.cookie);
            document.cookie = response.data;

            // document.cookie = "username="+document.cookie+"; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            // console.log(document.cookie);

            history.push('/login');

        });
    }
    componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
      }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 950 });
      }


    render() {
        const isDesktop = this.state.isDesktop;
        return(
            <nav className='NavbarItems'>
                <a href={'/Community'}>
                <h1 className='navbar-logo'><img src="DoReMeetLogo.png" alt="Logo" height="30px"/> DoReMeet</h1></a>
                <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                {isDesktop ? (
                    <><a href='/Settings'><i class="fas fa-cog fa-md" style={{paddingRight:10}}></i></a>      
                    <div style={{marginRight:'10px'}}><Button onClick={e=>this.logout(e)}>Log Out</Button></div></>
                ) : (
                    <div style={{display: 'none'}} />
                )} 
            </nav>         
        )
    }
}

export default withRouter(Navbar);
