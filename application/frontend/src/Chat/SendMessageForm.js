import React from 'react';
import '../App.css';
import './Chat.css';

class SendMessageForm extends React.Component{
    render(){
        return(
            <form className="sendMessageForm">
                <input type="text" placeholder="Type your message here and hit enter"/>
            </form>
        )
    }
}

export default SendMessageForm;