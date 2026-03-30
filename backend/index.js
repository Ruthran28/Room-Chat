const express = require('express');
const socketio = require('socket.io');
const http = require("http");



const { addUser, removeUser, getUser, getRoomUsers } = require("./entity");


const app=express()

const server=http.createServer(app)
const io=socketio(server,{cors :{origin :'*'}})

    io.on("connect",(Socket)=>{
        console.log("connected");


        Socket.on('join',({name,room},callback)=>{
            const {response,error}=addUser({id:Socket.id,name:name,room:room});
            if(error){
                if(callback) callback(error);
                return;
            }
            Socket.join(response.room)
            Socket.emit('message',{user:"admin",text:`welcome ${response.name}`});
            Socket.broadcast.to(response.room).emit('message',{user:"admin",text:` ${response.name} has been joined`})
           
        })
        Socket.on('sendmsg',(message,callback)=>{
            const res=getUser(Socket.id);
            if(res){
            io.to(res.room).emit('message',{user:res.name ,text:message})
            }else{
                if(callback) callback("user not found ");
            }
        })
        
        Socket.on('disconnect',() => {
            console.log("User disconnected");
            const user=removeUser(Socket.id);
            if(user){
                io.to(user.room).emit('message',{user:"admin",text:`${ user.name} has been left`})
            }
          })

    })

server.listen(4000,()=>{
    console.log("server start")
})
