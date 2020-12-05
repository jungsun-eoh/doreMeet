import React from 'react';
import '../App.css';
import './Chat.css';

class MessageList extends React.Component{
    render(){
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