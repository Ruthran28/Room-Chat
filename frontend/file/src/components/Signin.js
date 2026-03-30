
import React, { useState } from 'react';

import './Siginn.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
const Signin = () =>{

   const [Username, setUsername] = useState('')
   const [roomid, setroomid] = useState('')
   const postdata=async()=>{
    await axios.post('http://localhost:4000/api/room',{
      Username,roomid
    })
   }
    return (
        <div className="login-container">
        <div className="login-form">
          <h2 className="login-heading">Chat</h2>
          <form method='post' onSubmit={postdata}>
            <label className="login-label">
              Username:
              <input type="text" className="login-input" value={Username} onChange={event=>setUsername(event.target.value)}/>
            </label>
            <label className="login-label">
              ROOM ID:
              <input type="password" className="login-input" value={roomid} onChange={event=>setroomid(event.target.value)}/>
            </label>
            <Link onClick={(e)=>(!Username || !roomid)? e.preventDefault():null} to={`/chat?username=${Username}&room=${roomid}`}>
            <button type="submit" className="login-button">
            join room
            </button>
            </Link>
          
          </form>
        </div>
      </div>
  );
  };

export default Signin