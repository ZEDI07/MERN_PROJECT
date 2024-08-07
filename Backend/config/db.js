const mongoose = require('mongoose');
const connectDB=async()=>{
    try {
       // const MONGO_URI = `mongodb+srv://prabhat:Shogun%40208013@cluster0.8xeqrjn.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0`
        const conn = await mongoose.connect(process.env.MONGO_URI)
        if(conn){
            console.log('Database connected');
        }
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB;