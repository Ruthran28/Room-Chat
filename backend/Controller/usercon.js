
const con=require('../Model/usermod')


const addUsers=async(socid,Username,roomid)=>{
   
    let exuser;
   try {
    exuser=await con.findOne({Username:Username})
    
   } catch (error) {

    console.log(error)
   }
   if(exuser){
    return {error :"user already exist"};
}

   let mydata;

   mydata=new con({

    Username,
    roomid,socid

  })
    try {
       await mydata.save()
        console.log('post successfully');

    } catch (error) {
    console.log(error)
    }
    

  
    return mydata;
    
    }
    
exports.addUsers=addUsers