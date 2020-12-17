import React, { useEffect, useState } from 'react';
import '../App.css';
import './Chat.css';
import axios from 'axios';
import io from "socket.io-client";

const socket=io.connect('http://localhost:5000')

export default function MessageList({screen}, {user}) {
const [state, setState] = useState({message: '', name: user})
const [chat, setChat] = useState([])

const getMatches = async () => {
	const formData = new FormData();
formData.append('user', document.cookie);
console.log("getmatch");
    await axios.post('/getConnected', formData).then(response => {
console.log("getCon");        
console.log(response.data);
        //const formData = new FormData();
        for (var key in response.data) {
            formData.append('connectedMatches', response.data[key]);
        }

        axios.post('/getSuccessfulMatches', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            formData.append('successfulMatches', response.data);
            axios.post('/loadSuccessfulMatches', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
                response.data.forEach(element => {
                    console.log(element);
                });
            });
        });
    });
  }

const renderChat = () =>{
    return chat.map(({name, message}, index) =>(
        <div key={index}>
            <h3>{name}: <span>{message}</span></h3>
        </div>
    ))
}

useEffect(() =>{
    socket.on('message', ({name, message}) =>{
        setChat([...chat, {name, message}])
    })
})

const onTextChange = e => {
    setState({...state, [e.target.name]: e.target.value})
}

const onMessageSubmit = (e) => {
    e.preventDefault()
    const {name, message} = state
    socket.emit('message', {name, message})
    setState({message: '', name})
}


        if(screen === 'tutorial'){
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
        <input style={{ position: "center", width: '10%', marginLeft: 'auto', marginRight: 20, marginTop: 10 }} type='button' value="Matches" onClick={getMatches} /><br />
                    </ul>
                </div>
            )
        }
        return(
            <div style={{height: "100vh"}}>
                <div style={{display:"block"}} className="messageContainer">
                    {renderChat()}
                    {/* <ul className="messageList">
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
                    </ul> */}
                </div>
                <form className="sendMessageForm" onSubmit={onMessageSubmit}>
                    <input name="message" type="text" placeholder="Type your message here!" onChange={e => onTextChange(e)} value={state.message}/>
                    <input type="submit" value="Send" style={{width:"160px",right:"0px", backgroundColor:"#C0E9E8", cursor: "pointer" }}></input>
                </form>
            </div>
        )
    
}

export default MessageList;
