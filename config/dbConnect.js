const { default: mongoose } = require("mongoose");

const dbConnect =()=>{
    try{
    const conn=mongoose.connect(process.env.MONGODB_URL);
    console.log("DATABASE CONNECTION SUCCESSFULL");
    }
    catch(error){
     console.log("DATABASE ERROR"+error);
    }
};

module.exports=dbConnect;                        