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
    state = { clicked: false }

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    logout = (e) =>{
        e.preventDefault();
        axios.post('/logout', this.state).then(response =>{
            history.push('/login');

        });
    }

    render() {
        return(
            <BrowserRouter>
            <nav className='NavbarItems'>
                <a href={'/'}>
                <h1 className='navbar-logo'><img src="DoReMeetLogo.png" alt="Logo" height="30px"/> DoReMeet</h1>
                <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                </a>
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
                <a href='/Settings'><i class="fas fa-cog fa-lg" style={{paddingRight:4}}></i></a>
                &nbsp; &nbsp;                
                <Button onClick={e=>this.logout(e)}>Log Out</Button>                
            </nav>
            </BrowserRouter>            
        )
    }
}

export default withRouter(Navbar);