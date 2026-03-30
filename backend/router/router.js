const express=require('express')

const rout=express.Router()

const con=require('../Controller/usercon')

rout.post('/room',con.postdata)

module.exports=rout