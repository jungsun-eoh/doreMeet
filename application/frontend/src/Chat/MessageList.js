import React from 'react';
import '../App.css';
import './Chat.css';

class MessageList extends React.Component{
    render(){
        if(this.props.screen === "tutorial"){
            return(
                <div style={{display:"block"}} className="tutorialContainer">
                    <div style={{backgroundColor: "#8de2e2"}}>
                        <h2>Welcome to the chat page</h2>
                        <h4>On the left you can select a person to talk to and enter the message you want to send below</h4>
                    </div>
                    <br/>
                    <ul style={{listStylePosition: "inside"}}>
                        <li>Start off a conversation by introducing yourself!</li>
                        <li>Break the ice by discussing common interests.</li>
                        <li>Find a project you're both interested in and begin collaborating!</li>
                    </ul>
                </div>
            )
        }
        return(
            <div style={{display:"block"}} className="messageContainer">
                <ul className="messageList">
                    {this.props.messages.map(messages => {
                        return(
                            <li className="message" key={messages.id}>
                                <div>
                                    <p>{messages.userName}</p>
                                </div>
                                <div>
                                    {messages.text}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default MessageList;