/*
**CSC 648 Team 02 DoReMeet
**File: NavbarHome.js
**Desc: The navbar that is displayed on the landing page before the user logs in. Links to company and pricing.
Also has a login button
*/

//TODO: update community page linking, right now you dont have to log in for testing purposes
import React, { Component } from 'react';
import { Button } from './Buttons';
import { MenuItemsHome } from './MenuItemsHome';
import './Navbar.css';

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
                <a href={'/'}>
                <h1 className='navbar-logo'><img src="DoReMeetLogo.png" alt="Logo" height="30px"/> DoReMeet</h1>  </a>
                <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
             
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItemsHome.map((item, index) => {
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
                    <a href={'/login'}><Button><b>Log In</b></Button></a>
                ) : (
                    <div style={{display: 'none'}} />
                )}
            </nav>
        )
    }
}

export default Navbar;