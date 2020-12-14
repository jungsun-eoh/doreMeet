import React from 'react';
import '../App.css';
import './Chat.css';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import axios from 'axios';



class SideBar extends React.Component{

    constructor() {
        super();
        this.state = {
            messageScreen: "tutorial"
        }
        this.changeScreen = this.changeScreen.bind(this);
    }


    changeScreen = (name) => {
        this.setState({messageScreen: name})
        axios.get('/getMessages', { params: { user1: this.props.user, user2: name} })
        .then(res => {
            this.setState({messageScreen: name})
            this.setState({chatLogs: res})
        })
        .catch(function (error){
            console.log("Error retrieving chat logs")
        })
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
                                    <div onClick={ () =>this.changeScreen(contacts.userName)} className="sideBarElement">
                                        <img className="sideBarPic" src={contacts.picture}></img>
                                        <p className="sideBarText">{contacts.userName}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div style={{width: "100%", height: "100vh"}}>
                <MessageList messages={this.props.messages} screen={this.state.messageScreen} user={this.props.user}/>
                </div>
                
            </div>
        )
        
    }
}

export default SideBar;