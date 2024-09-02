require("dotenv").config();             // to access dotenv variables in your application anywhere
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db')
const {errorhandler} = require('./middleware/errorMiddleware');

const corsOptions= {
    origin : 'http://localhost:3000',
    methods : "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials : true
}

//Routes
const userRouter = require('./routes/userRoutes');
const goalRouter = require('./routes/goalRouter');


connectDB();

app.use(cors(corsOptions));
app.use(express.json());                       //middlewares > for fetching json object from express req 
app.use(express.urlencoded({extended:false}))  


//Api EndPoint
app.use('/api/users',userRouter);
app.use('/api/goals',goalRouter)


app.use(errorhandler);      // custom middle for handling error , overriding default error handler of node
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})