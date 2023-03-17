const bodyParser = require('body-parser');
const { response } = require('express');
const express =require('express');
const app=express();
const dbConnect=require("./config/dbConnect");
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const dotenv=require('dotenv').config();
const PORT=process.env.PORT||4000;
const authRouter=require("./routes/authRoute");
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/user',authRouter);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`);
})
