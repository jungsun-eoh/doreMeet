import React from 'react';
import '../App.css';
import './Chat.css';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

class SideBar extends React.Component{

    //TODO: Add a const in sidebar comp so that we switch screen state within MessageList ezpz
    changeScreen(){
        console.log("hello")
    }

    render(){
        return(
            <div style={{display: "flex", width: "100%"}}>
                <div style={{display: "inline"}} className="sideBar">
                    <div className="sideBarHeader">
                    <h2>Matches</h2>
                    </div>
                    <ul>
                        {this.props.contacts.map(contacts => {
                            return(
                                <li key={contacts.id}>
                                    <div onClick={this.changeScreen} className="sideBarElement">
                                        <img className="sideBarPic" src={contacts.picture}></img>
                                        <p className="sideBarText">{contacts.userName}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div style={{width: "100%"}}>
                <MessageList messages={this.props.messages} screen={this.props.screen}/>
                <SendMessageForm/>
                </div>
                
            </div>
        )
        
    }
}

export default SideBar;