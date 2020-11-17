import React, { Component } from 'react';
import axios from 'axios';
import { Button } from './Buttons';
import { MenuItems } from './MenuItems';
import { Link, withRouter } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    logout = e =>{
        e.preventDefault();
        axios.post('/logout').then(response =>{
        })
        this.props.history.push("/");
    }

    render() {
        return(
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
                <Button onClick={() => this.logout}><b>Log Out</b></Button>
            </nav>
        )
    }
}

export default withRouter(Navbar);