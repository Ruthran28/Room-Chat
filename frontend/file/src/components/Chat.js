import React, { useEffect,useState } from 'react'
import io from 'socket.io-client'
import './chat.css'
let socket;
const Chat = () => {
  const [Username, setUsername] = useState("")
  const [Room, setRoom] = useState("")
  const [messages, setMessages] = useState([]);
  const [Msg, setMsg] = useState("")
const backendurl="http://localhost:4000/";
  useEffect(()=>{
    const search=window.location.search;
    const params=new URLSearchParams(search)
    const name=params.get('username')
    const room=params.get('room')
    console.log(name,room)
    setUsername(name)
    setRoom(room)
    socket=io(backendurl)
    socket.emit('join',{name:name,room:room},(error)=>{

   if(error){
    alert(error)
   }
    })
    
    return ()=>{
      socket.disconnect();
      socket.off();
    }
  },[])
  useEffect(()=>{
    socket.on('message',msg=>{
      setMessages(prevMsg => [...prevMsg, msg])

    })
  },[])
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Welcome, {Username}</h2>
        <span>Room: {Room}</span>
      </div>
      <div className="chat-messages">
        {
          messages.map((m,idx)=>(
            <div key={idx} className={`message ${m.user === Username ? 'sent' : 'received'}`}>
              <span className="sender">{m.user}</span>
              <p className="text">{m.text}</p>
            </div>
          ))
        }
      </div>
      <div className="chat-input">
        <input type='text' value={Msg} 
          onChange={(e)=>setMsg(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e)=>{
            if(e.key === 'Enter' && Msg){
              socket.emit('sendmsg',Msg)
              setMsg("")
            }
          }}
        />
        <button onClick={()=>{
          if(Msg){
            socket.emit('sendmsg',Msg)
            setMsg("")
          }
        }}>Send</button>
      </div>
    </div>
  )
}

export default Chat