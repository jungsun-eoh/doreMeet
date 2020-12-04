import React from 'react';
import '../App.css';
import './Chat.css';

class SideBar extends React.Component{
    render(){
        return(
            <div className="sideBar">
                <div className="sideBarHeader">
                <h2>Matches</h2>
                </div>
                <ul>
                    {this.props.contacts.map(contacts => {
                        return(
                            <li key={contacts.id}>
                                <div className="sideBarElement">
                                    <img className="sideBarPic" src={contacts.picture}></img>
                                    <p className="sideBarText">{contacts.userName}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default SideBar;