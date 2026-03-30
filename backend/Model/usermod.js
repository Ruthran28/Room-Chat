const mongoose=require('mongoose')

const schema=mongoose.Schema

const userSchema=new schema({

    Username:{
        type:String,
       
    },
    roomid:{
        type:String,
     
    },
    socid:{
        type:String
    }
})

module.exports=mongoose.model('chat',userSchema)