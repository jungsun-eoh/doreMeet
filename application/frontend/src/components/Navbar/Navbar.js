import React, { Component } from 'react';
import { Button } from './Buttons';
import { MenuItems } from './MenuItems';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        return(
            <nav className='NavbarItems'>
                <a href={'/'}>
                <h1 className='navbar-logo'><img src="DoReMeetLogo.png" height="30px"/>DoReMeet</h1>
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
                <a href={'/'}><Button><b>Log Out</b></Button></a>
            </nav>
        )
    }
}

export default Navbar;