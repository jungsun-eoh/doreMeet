import React, { Component } from 'react';
import { Button } from './Buttons';
import { MenuItems } from './MenuItems';
import './Navbar.css';

class Navbar extends Component {
    state = { clicked: false }
 
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        return(
            <nav className='NavbarItems active'>
                <h1 className='navbar-logo'>DoReMeet<i class="fas fa-wrench"></i> </h1>
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
                <Button><b>Log In</b></Button>
            </nav>
        )
    }
}

export default Navbar;